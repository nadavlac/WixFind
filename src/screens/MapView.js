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

  constructor(props){
    super(props);

    this.state = {
      region: helpers.getRegionForFilteredBusinesses(this.props.businesses)
    }
    this.renderCallout = this.renderCallout.bind(this)
    this.handleRegionChangeComplete = this.handleRegionChangeComplete.bind(this)
  }

  renderCallout(busi) {
    return (
      <TouchableOpacity onPress={() => {
        Navigation.push(this.props.componentId, {
          component: {
            name: 'BusinessPage',
            passProps: {
              business: busi,
            }
          },
        })
      }}>
        <Text>{busi.name}</Text>
      </TouchableOpacity>
    )
  }

  handleRegionChangeComplete(region) {
    this.setState({region})
  }

  render() {
    console.log('in map screen ')
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{backgroundColor: '#FBB'}}
          onPress={() => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'ListView',
              }
            })
          }}
        >
          <View style={{padding: 10}}>
            <Text>press me</Text>
          </View>

        </TouchableOpacity>
         <MapView
          // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={this.state.region}
          onRegionChangeComplete={this.handleRegionChangeComplete}
         >
           {this.props.businesses.map((busi, i) => (
             <Marker
               key={i}
               coordinate={{latitude: busi.latitude, longitude: busi.longitude}}
             >
               <Callout>
                 {this.renderCallout(busi)}
               </Callout>
             </Marker>
           ))}
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
  }
});
