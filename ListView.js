

import React, {Component} from 'react';
import {Platform, StyleSheet, View, TouchableOpacity, Linking, Image} from 'react-native';
import {Typography, Colors, Text} from 'react-native-ui-lib';
import { Navigation } from 'react-native-navigation';

const businesses = require('./businessesData');


export default class ListView extends Component<Props> {

  constructor(props){
    super(props);

    this.state = {

    }
    // this.renderCallout = this.renderCallout.bind(this)
  }

  // renderCallout(busi) {
  //   return (
  //     <TouchableOpacity onPress={() => Linking.openURL(busi.siteUrl)}>
  //       <Text>{busi.name}</Text>
  //       {/*<Image source={{uri: `https://static.wixstatic.com/media/${busi.logoUrl}`}} style={{width: 20, height:20}}/>*/}
  //     </TouchableOpacity>
  //   )
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text>bla bla</Text>

        <TouchableOpacity
          style={{backgroundColor: '#FBB'}}
          onPress={() => {
            console.log('ON PRESS LIST VIEW', Navigation)
            // Navigation.pop(this.props.componentId);
            Navigation.push(this.props.componentId, )
          }}
        >
          <View style={{padding: 10}}>
            <Text>press me</Text>
          </View>

        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
