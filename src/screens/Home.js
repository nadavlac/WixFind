

import React, {Component} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, Alert, Dimensions, Image} from 'react-native';
import {Typography, Colors, Text, View} from 'react-native-ui-lib';
import { Navigation } from 'react-native-navigation';
import * as helpers from '../helpers'
import Slider from '@react-native-community/slider';
const screenWidth = Dimensions.get('window').width;
import { Marker, Callout } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {DISTANCE_RADIUS} from '../helpers'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import SplashScreen from 'react-native-splash-screen'

const title = 'What kind of\nservice are you\nlooking for?'

export default class Home extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: false,
      }
    };
  }

  constructor(props){
    super(props);

    this.state = {
      searchValue: '',
      searchRadius: DISTANCE_RADIUS,
      location: null,
      region: null,
      currentAddress: ''
    }

    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleValueChange = _.debounce(this.handleValueChange.bind(this), 200)
    this.handleRegionChangeComplete = this.handleRegionChangeComplete.bind(this)
    this.handleSubmitEditing = this.handleSubmitEditing.bind(this)
  }

  async componentDidMount() {
    SplashScreen.hide();
    const {coords} = await helpers.getLocation()
    this.setState({location: coords})
  }

  handleChangeText(searchValue) {
    this.setState({searchValue})
  }

  async handleSearch() {
    if (this.state.searchValue.length < 3) {
      return
    }

    const {businesses, coords} = await helpers.searchBusinesses(this.state.searchValue, this.state.searchRadius, this.state.region)

    if (businesses.length === 0) {
      Alert.alert('no businesses found')
      return
    }

    const services = await helpers.getServicesList(businesses)

    Navigation.push(this.props.componentId, {
      component: {
        name: 'ListView',
        passProps: {
          businesses,
          coords,
          query: this.state.searchValue,
          services
        }
      }
    });
  }

  handleValueChange(value) {
    this.setState({searchRadius: Math.round(value)})
  }

  getCurrentRequestedAddress = (region) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&key=AIzaSyB0bxLdlOvJKWfVjLlcuDJ81WypLKSTEy4`)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.results) {
          this.setState({
            currentAddress: responseJson.results[1] 
              ? responseJson.results[1].formatted_address 
              : responseJson.results[0] 
                ? responseJson.results[0].formatted_address 
                : ''
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleRegionChangeComplete(region) {
    this.getCurrentRequestedAddress(region)
    this.setState({region, location: {latitude: region.latitude, longitude: region.longitude}})
  }

  handleSubmitEditing() {
    this.handleSearch()
  }

  render() {
    
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: '#397df6', flex: 1, paddingTop: 75}}>
          <Image source={require('../../assets/wix_logo.png')} style={{width: 52, height: 21, marginLeft: 21}} />
          <Text style={{color: '#ffffff', fontSize: 28, fontWeight: '600', marginTop: 60, paddingLeft: 21}}>{title}</Text>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#ffffff', marginHorizontal: 20, marginTop: 60, flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={this.handleSearch}>
              <Icon name='ios-search' color='#fff' size={20}/>
            </TouchableOpacity>
            <TextInput
              onChangeText={this.handleChangeText}
              style={{paddingVertical: 10, width: '100%', color: '#fff', marginLeft: 10}}
              value={this.state.searchValue}
              placeholder='Search'
              placeholderTextColor='#fff'
              onSubmitEditing={this.handleSubmitEditing}
            />
          </View>
          <View style={{paddingLeft: 20, paddingTop: 10}}>
            <Text style={{color: '#FFF'}}>{this.state.currentAddress}</Text>
          </View>

        </View>
        {/* <EntypoIcon name='man' color='#f4c04f' size={60} style={{marginTop: 20}}/> */}
        <View flex>
          <MapView
            style={styles.map}
            region={this.state.region}
            onRegionChangeComplete={this.handleRegionChangeComplete}
          >
            {this.state.location &&
            <Marker
              coordinate={{latitude: this.state.location.latitude, longitude: this.state.location.longitude}}
              // image={require('../../assets/man.png')}
              pinColor='#f4c04f'
            />}
          </MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});

/*
 <TextInput
          onChangeText={this.handleChangeText}
          style={{backgroundColor: '#FBB', paddingVertical: 10}}
        />
        <TouchableOpacity onPress={this.handleSearch}>
          <Text>Search</Text>
        </TouchableOpacity>
        <View style={{paddingTop: 20, alignItems: 'center'}}>
          <Text>Search Radius</Text>
          <Slider
            style={{width: screenWidth - 80, height: 40}}
            minimumValue={1}
            maximumValue={6371}
            minimumTrackTintColor="#f2f9"
            maximumTrackTintColor="#e2e2e2"
            onValueChange={this.handleValueChange}
            value={this.state.searchRadius}
          />
          <Text>{this.state.searchRadius}</Text>
        </View>
*/
