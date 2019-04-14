/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Linking, Image, SafeAreaView, FlatList} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker} from 'react-native-maps';
import {Text, View, ListItem, ThemeManager, Colors, Button, BorderRadiuses} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
const businessMap = require ('../../assets/businessMap.json');
import {mainColor} from './ListView';

export default class MapScreen extends Component {

  constructor(props){
    super(props);
  }

  businessData = businessMap[this.props.business.msId];

  renderRow(row, id) {
    return (
      <View flex>
        <ListItem
          activeBackgroundColor={Colors.dark60}
          activeOpacity={0.3}
          height={70}
          containerStyle={{flex: 1}}
        >
          <ListItem.Part left column containerStyle={[styles.border, {paddingLeft: 17}]}>
            <Image source={{uri: row.imageUrl ? `https://static.wixstatic.com/media/${row.imageUrl}` : `https://static.wixstatic.com/media/${this.businessData.logoUrl}`}}
                   style={{width: 40, height:40, borderRadius: 20}}/>
          </ListItem.Part>
          <ListItem.Part middle column containerStyle={[styles.border, {padding: 17}]}>
            <Text dark10 text80 style={{flex: 1, marginRight: 10, fontWeight: '500'}} numberOfLines={1}>{row.name}</Text>
            <Text dark10 text80 style={{flex: 1, marginRight: 10}} numberOfLines={1}>{row.price}</Text>
          </ListItem.Part>
          <ListItem.Part right>
            <Button label={'Book'}
                    labelStyle={{fontWeight: '100'}}
                    size='small'
                    text90
                    style={{marginBottom: 20, marginRight: 20, marginTop: 20, backgroundColor: mainColor}}
                    onPress={() => row.url ? Linking.openURL(row.url) : Linking.openURL(this.businessData.siteUrl)}
            />
          </ListItem.Part>
        </ListItem>
      </View>

    );
  }


  render() {
    const {business} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <MapView
          // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={{
            latitude: business.latitude,
            longitude: business.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          >
            <Marker
              coordinate={{latitude: business.latitude, longitude:business.longitude}}
            />
        </MapView>
        <View style={{marginLeft: 20}}>
          <View column >

            <Text dark10 text50 style={{marginLeft: 10, marginRight: 10, marginBottom: 6, marginTop: 20, fontWeight: '500'}} numberOfLines={1}>{business.name}</Text>
            <Text dark10 text90 style={{marginLeft: 10, marginRight: 10}} numberOfLines={1}>{business.addressString}</Text>
            <Text dark10 text90 style={{marginLeft: 10, marginRight: 10,  marginBottom: 15}} numberOfLines={1}>{`${business.distanceFromUser.toFixed(2)} KM`}</Text>
          </View>

          <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            <Icon name='ios-call' size={30} style={{marginLeft: 10, marginRight: 40}}/>
            <Icon name='ios-navigate' size={30} style={{marginRight: 40}}/>
            <TouchableOpacity onPress={() => {Linking.openURL(business.siteUrl)}}>
              <Icon name='ios-globe' size={30} style={{marginRight: 40}}/>
            </TouchableOpacity>
            <Icon name='ios-share' size={30} style={{marginRight: 40}}/>
          </View>
        <View>
          <View style={{ borderBottomWidth:styles.border.borderBottomWidth, borderBottomColor: styles.border.borderColor}}>
            <Text dark10 text70 style={{marginLeft: 10, marginRight: 10, marginBottom: 25, marginTop: 40, fontWeight: '500'}}>All Services</Text>
          </View>
            <FlatList
            data={this.businessData.offerings}
            renderItem={({item, index}) => this.renderRow(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: '100%',
    height: 200
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
});
