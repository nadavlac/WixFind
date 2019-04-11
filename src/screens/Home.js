

import React, {Component} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Alert, Dimensions} from 'react-native';
import {Typography, Colors, Text} from 'react-native-ui-lib';
import { Navigation } from 'react-native-navigation';
import * as helpers from '../helpers'
import Slider from '@react-native-community/slider';
const screenWidth = Dimensions.get('window').width;
import {DISTANCE_RADIUS} from '../helpers'
import _ from 'lodash'

export default class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      searchValue: '',
      searchRadius: DISTANCE_RADIUS
    }

    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleValueChange = _.debounce(this.handleValueChange.bind(this), 200)
  }

  handleChangeText(searchValue) {
    this.setState({searchValue})
  }

  async handleSearch() {
    if (this.state.searchValue.length < 3) {
      return
    } 
    
    const {businesses, coords} = await helpers.searchBusinesses(this.state.searchValue, this.state.searchRadius)

    if (businesses.length === 0) {
      Alert.alert('no businesses found')
      return
    }

    const services = helpers.getServicesList(businesses)
    
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ListView',
        passProps: {
          businesses,
          coords,
          query: this.state.searchValue,
          services
        },
        options: {
          topBar: {
            title: {
              text: 'List View'
            }
          }
        }
      }
    });
  }

  handleValueChange(value) {
    this.setState({searchRadius: Math.round(value)})
    console.log('valiue', value)
  }

  render() {
    return (
      <View style={styles.container}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
