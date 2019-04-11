import React, {Component} from 'react';
import {StyleSheet, Alert, FlatList, TouchableOpacity, Image, Linking} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {AnimatableManager, ThemeManager, Colors, BorderRadiuses, ListItem, Text, View, Button} from 'react-native-ui-lib'; //eslint-disable-line
import MapScreen from './MapView';
const mapIcon = require('../../assets/mapIcon.png');
const listIcon = require('../../assets/listIcon.png');
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {Navigation} from 'react-native-navigation';

export default class ListView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      onEdit: false,
      updating: false,
      mode: 'MAP'
    };
  }

  keyExtractor = (item,index) => index;

  renderRow(row, id) {
    const animationProps = AnimatableManager.presets.fadeInRight;

    return (
      <Animatable.View {...animationProps}>
            <ListItem
              activeBackgroundColor={Colors.dark60}
              activeOpacity={0.3}
              height={100}
              onPress={() => {
                Navigation.push(this.props.componentId, {
                  component: {
                    name: 'BusinessPage',
                    passProps: {
                      service: row,
                      business: row.business
                    }
                  },
                })
              }}
            >
              <ListItem.Part left column containerStyle={[styles.border, {paddingRight: 17, paddingLeft: 10}]}>
                <Text dark10 text100 numberOfLines={1} style={{ marginBottom: 3}}>{moment(row.nextAvailableSlot).format('DD/MM')}</Text>
                <Text dark10 text100 numberOfLines={1} style={{ marginBottom: 3}}>{moment(row.nextAvailableSlot).format('ddd')}</Text>
                <Text dark10 text100 numberOfLines={1}>{moment(row.nextAvailableSlot).format('h:mm')}</Text>
              </ListItem.Part>
              <ListItem.Part middle containerStyle={[styles.border, {paddingRight: 17}]}>
                <ListItem.Part containerStyle={{marginBottom: 3}}>
                  <Image source={{uri: row.imageUrl ? `https://static.wixstatic.com/media/${row.imageUrl}` : `https://static.wixstatic.com/media/${row.business.logoUrl}`}}
                         style={{width: 30, height:30, borderRadius: 15}}/>
                </ListItem.Part>
                <ListItem.Part column containerStyle={[styles.border, {paddingRight: 17, paddingLeft: 17, marginTop:10}]}>
                  <Text color={'black'} text90 style={{flex: 1, marginRight: 10}} numberOfLines={1}>{row.name}</Text>
                  <Text dark10 text60 style={{flex: 1, marginRight: 10, fontWeight: '500'}} numberOfLines={1}>{row.business.name}</Text>
                  <Text dark10 text90 style={{flex: 1, marginRight: 10}} numberOfLines={1}>{row.business.addressString}</Text>
                  <Text dark10 text90 style={{flex: 1, marginRight: 10}} numberOfLines={1}>{`${row.distanceFromUser.toFixed(2)} KM`}</Text>
                </ListItem.Part>
              </ListItem.Part>
              <ListItem.Part right>
                <Button label={'Book'}
                        labelStyle={{fontWeight: '100'}}
                        size='small'
                        text90
                        style={{marginBottom: 20, marginRight: 20}}
                        onPress={() => Linking.openURL(row.url)}
                />
              </ListItem.Part>
            </ListItem>
        </Animatable.View>

    );
  }

  renderList() {
    const {services, query} = this.props;
    return (
      <View>
        <View style={{backgroundColor: Colors.blue10}}>
          {/*<Icon name="search" color="#4F8EF7" />*/}
          <Text color={'white'} text50 style={{margin:50}}>{`${query}`}</Text>
        </View>
        <FlatList
          data={services}
          renderItem={({item, index}) => this.renderRow(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }

  renderMap() {
    return (
        <MapScreen {...this.props}/>
    )
  }

  render() {

  const imageSrc = this.state.mode === 'MAP' ? listIcon : mapIcon;

    return (
      <View flex>
        {this.state.mode === 'MAP' ? this.renderMap() : this.renderList()}
        <View style={{position:'absolute', bottom:20, right:20}}>
          <TouchableOpacity onPress={()=> {this.setState({mode: this.state.mode==='MAP' ? 'LIST': 'MAP'})}}>
            <Image source={imageSrc} style={{height:30, width:30}}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
});
