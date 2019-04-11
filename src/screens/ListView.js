import React, {Component} from 'react';
import {StyleSheet, Alert, FlatList, TouchableOpacity, Image, Linking} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {AnimatableManager, ThemeManager, Colors, BorderRadiuses, ListItem, Text, View, Button} from 'react-native-ui-lib'; //eslint-disable-line
import MapScreen from './MapView';
const mapIcon = require('../../assets/mapIcon.png');
const listIcon = require('../../assets/listIcon.png');
import moment from 'moment';

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
    const statusColor = /*row.inventory.status === 'Paid' ? Colors.green30 : */Colors.red30;
    const animationProps = AnimatableManager.presets.fadeInRight;
    const imageAnimationProps = AnimatableManager.getRandomDelay();

    return (
      <Animatable.View {...animationProps}>
            <ListItem
              activeBackgroundColor={Colors.dark60}
              activeOpacity={0.3}
              height={77.5}
              onPress={() => Alert.alert(`pressed on order #${id + 1}`)}
            >
              <ListItem.Part left>
               <Text dark10 text70>{moment(row.nextAvailableSlot).format('ddd h:mm DD/MM')}</Text>
              </ListItem.Part>
              <ListItem.Part middle column containerStyle={[styles.border, {paddingRight: 17}]}>
                <Text dark10 text70 style={{flex: 1, marginRight: 10,}} numberOfLines={1}>{row.name}</Text>
                <Text dark10 text50 style={{flex: 1, marginRight: 10}} numberOfLines={2}>{row.business.name}</Text>
                <Text dark10 text90 style={{flex: 1, marginRight: 10}} numberOfLines={2}>{`${row.distanceFromUser.toFixed(2)} KM`}</Text>

      
              </ListItem.Part>
              <ListItem.Part right>
                <Button label={'Book'}
                        labelStyle={{fontWeight: '100'}}
                        size='small'
                        text90
                        style={{marginBottom: 20}}
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
        <Text  color={Colors.red10} text50 middle style={{marginTop: 10, marginLeft: 65}}>{`you're looking for ${query}`}</Text>
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
