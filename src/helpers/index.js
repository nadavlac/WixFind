import moment from 'moment';

const businesses = require('../../assets/businessesData.json');
export const DISTANCE_RADIUS = 2100
const SEARCH_PADDING = 0.22

export function getLocation() {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (e) => {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (e) => resolve({error: e}),
          {maximumAge: 0, timeout: 20000, enableHighAccuracy: false}
        )
      },
      {maximumAge: 0, timeout: 20000, enableHighAccuracy: true}
    )
  })
}

export function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2-lat1);  // deg2rad below
  const dLon = deg2rad(lon2-lon1);
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

export async function getServicesList(businesses) {
  let addTodayCounter = 0
  let addTomorrowCounter = 0
  function getNextAvailableSlot() {
    if (addTodayCounter < 2) {
      addTodayCounter++
      return moment().add((Math.floor(Math.random() * 720) + 5), 'minutes')
    } if (addTomorrowCounter < 2) {
      addTomorrowCounter++
      return moment().add((Math.floor(Math.random() * 1420) + 5), 'minutes')
    } else {
      return moment().add((Math.floor(Math.random() * 100000) + 5), 'minutes')
    }
  }
  const {coords} = await getLocation();
  let services = []

  businesses.forEach(business => {
    const distanceFromUser = getDistanceFromLatLonInKm(coords.latitude, coords.longitude, business.latitude, business.longitude);
    business.offerings.forEach(offer => {
      services.push({
        ...offer,
        nextAvailableSlot: getNextAvailableSlot() ,
        distanceFromUser: getDistanceFromLatLonInKm(coords.latitude, coords.longitude, business.latitude, business.longitude),
        business: {logoUrl: business.logoUrl, siteUrl: business.siteUrl, name: business.name, addressString: business.addressString, longitude: business.longitude,
          latitude: business.latitude, distanceFromUser, msId: business.msId}})
    })
  })

  return services.sort((a,b) => (a.nextAvailableSlot - b.nextAvailableSlot) || (a.distanceFromUser - b.distanceFromUser) )
}

export function searchBusinesses(searchValue, distanceRadius = DISTANCE_RADIUS, region) {
  return new Promise(async (resolve) => {
    let longitude
    let latitude
    let coords = {}
    
    if (region) {
      longitude = region.longitude
      latitude = region.latitude
    } else {
      const location = await getLocation()
      if (location.error) {
        return
      }

      longitude = location.coords.longitude
      latitude = location.coords.latitude
    }
    coords = {longitude, latitude}

    const filteredBusinesses = businesses.filter(business => {
      const distance = getDistanceFromLatLonInKm(latitude, longitude, business.latitude, business.longitude)
      business['distanceFromUser'] = distance;
      if (business.latitude && business.longitude && business.name && distance < distanceRadius) {
        const searchWordsArray = searchValue.trim().toLowerCase().split(' ')
        let searchString = business.name.toLowerCase()
        business.offerings.forEach(o => searchString = searchString + o.name.toLowerCase())
        return searchWordsArray.some(word => {
          return searchString.trim().toLowerCase().includes(word)
        })
      } else {
        return false
      }
    })

    resolve({businesses: filteredBusinesses, coords})
  })
}

export function getRegionForFilteredBusinesses(businesses) {
  let minX, maxX, minY, maxY;

  // init first business
  ((business) => {
    minX = business.latitude;
    maxX = business.latitude;
    minY = business.longitude;
    maxY = business.longitude;
  })(businesses[0]);

  // calculate rect
  businesses.map((business) => {
    minX = Math.min(minX, business.latitude);
    maxX = Math.max(maxX, business.latitude);
    minY = Math.min(minY, business.longitude);
    maxY = Math.max(maxY, business.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  // const midbusiness = [midX, midY];

  const deltaX = (maxX - minX) + SEARCH_PADDING;
  const deltaY = (maxY - minY) + SEARCH_PADDING;

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX > 0 ? deltaX : 0.3,
    longitudeDelta: deltaY > 0 ? deltaY : 0.4
  };
}
