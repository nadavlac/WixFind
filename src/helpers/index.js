const businesses = require('../../assets/businessesData.json');
const DISTANCE_RADIUS = 2500;

function getLocation() {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (e) => resolve({error: e}),
      {maximumAge: 0, timeout: 20000, enableHighAccuracy: false}
    )
  })
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
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

export function searchBusinesses(searchValue) {
  return new Promise(async (resolve) => {
    const location = await getLocation()

    if (location.error) {
      return
    }

    const {coords} = location

    const filteredBusinesses = businesses.filter(business => {
      const distance = getDistanceFromLatLonInKm(coords.latitude, coords.longitude, business.latitude, business.longitude)
      if (business.latitude && business.longitude && business.name && distance < DISTANCE_RADIUS) {
        const searchWordsArray = searchValue.trim().toLowerCase().split(' ')
        let searchString = business.name
        business.offerings.forEach(o => searchString = searchString + o.name)
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

  const deltaX = (maxX - minX);
  const deltaY = (maxY - minY);

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX > 0 ? deltaX : 0.3,
    longitudeDelta: deltaY > 0 ? deltaY : 0.4
  };
}
