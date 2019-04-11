

import React, {Component} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import {Typography, Colors, Text} from 'react-native-ui-lib';
import { Navigation } from 'react-native-navigation';
import * as helpers from '../helpers'

export default class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      searchValue: ''
    }

    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleChangeText(searchValue) {
    this.setState({searchValue})
  }

  async handleSearch() {
    if (this.state.searchValue.length <= 3) {
      return
    } 
    const {businesses, coords} = await helpers.searchBusinesses(this.state.searchValue)
    Navigation.push(this.props.componentId, {
      component: {
        name: 'MapView',
        passProps: {
          businesses,
          coords
        },
        options: {
          topBar: {
            title: {
              text: 'Map View'
            }
          }
        }
      }
    });
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
