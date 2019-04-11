/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Linking, Image, SafeAreaView, Text} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
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
    return (
      <SafeAreaView style={styles.container}>
        <MapView
          // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={{
            latitude: this.props.business.latitude,
            longitude: this.props.business.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          >
            <Marker
              coordinate={{latitude: this.props.business.latitude, longitude:this.props.business.longitude}}
            />
        </MapView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 200
  }
});
