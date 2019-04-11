/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Linking, Image, SafeAreaView} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker} from 'react-native-maps';
import {Text} from 'react-native-ui-lib';
import { Navigation } from 'react-native-navigation';
import * as helpers from '../helpers'

export default class MapScreen extends Component {

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Screen 2'
        },
      }
    };
  }

  constructor(props){
    super(props);
  }

  render() {
    console.log('in map screen ')
    const {business} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <MapView
          // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={{
            latitude: business.latitude,
            longitude: business.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          >
            <Marker
              coordinate={{latitude: business.latitude, longitude:business.longitude}}
            />
        </MapView>
        <View column>
          <Text dark10 text50 style={{marginLeft: 10, marginRight: 10, marginBottom: 6, marginTop: 10, fontWeight: '500'}} numberOfLines={1}>{business.name}</Text>
          <Text dark10 text90 style={{marginLeft: 10, marginRight: 10,  marginBottom: 6}} numberOfLines={1}>{business.addressString}</Text>
          <Text dark10 text90 style={{marginLeft: 10, marginRight: 10,  marginBottom: 6}} numberOfLines={1}>{`${this.props.service.distanceFromUser.toFixed(2)} KM`}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  map: {
    width: '100%',
    height: 200
  }
});
