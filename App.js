/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, TouchableOpacity, Linking, Image, SafeAreaView, Text} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import {Typography, Colors} from 'react-native-ui-lib';
import { Navigation } from 'react-native-navigation';


const businesses = require('./businessesData');


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

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

    this.state = {

    }
    this.renderCallout = this.renderCallout.bind(this)
  }

  componentDidMount() {
    console.log('did mount')
    setTimeout(() => {
      console.log('timeout')
    }, 3000)
  }

  renderCallout(busi) {
    return (
      <TouchableOpacity onPress={() => Linking.openURL(busi.siteUrl)}>
        <Text>{busi.name}</Text>
        {/*<Image source={{uri: `https://static.wixstatic.com/media/${busi.logoUrl}`}} style={{width: 20, height:20}}/>*/}
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {/*<Text onPress={() => Navigation.push('navigation.playground.ListView')}>press me</Text>*/}
        <TouchableOpacity
          style={{backgroundColor: '#FBB'}}
          onPress={() => {
            console.log('ON PRESS', Navigation)
            Navigation.push(this.props.componentId, {
              component: {
                name: 'navigation.playground.ListView',
              }
            }).then(() => {
                console.log('success?')
            }).catch((e) => {console.log('shit happens ', e)});
          }}
        >
          <View style={{padding: 10}}>
            <Text>press me</Text>
          </View>

        </TouchableOpacity>
         {/*<MapView*/}
          {/*// provider={PROVIDER_GOOGLE} // remove if not using Google Maps*/}
          {/*style={styles.map}*/}
          {/*// region={{*/}
          {/*//   latitude: 37.78825,*/}
          {/*//   longitude: -122.4324,*/}
          {/*//   latitudeDelta: 0.015,*/}
          {/*//   longitudeDelta: 0.0121,*/}
          {/*// }}*/}
         {/*>*/}
           {/*{businesses.map((busi, i) => (*/}
             {/*<Marker*/}
               {/*key={i}*/}
               {/*coordinate={{latitude: busi.latitude, longitude: busi.longitude}}*/}
             {/*>*/}
               {/*<Callout>*/}
                 {/*{this.renderCallout(busi)}*/}
               {/*</Callout>*/}
             {/*</Marker>*/}
           {/*))}*/}
         {/*</MapView>*/}
      </View>
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
    top: 50
  }
});
