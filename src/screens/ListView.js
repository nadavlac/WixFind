import React, {Component} from 'react';
import {StyleSheet, Alert, FlatList, TouchableOpacity, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {AnimatableManager, ThemeManager, Colors, BorderRadiuses, ListItem, Text, View} from 'react-native-ui-lib'; //eslint-disable-line
import MapScreen from './MapView';
const mapIcon = require('../../assets/mapIcon.png');
const listIcon = require('../../assets/listIcon.png');

export default class ListView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      onEdit: false,
      updating: false,
      mode: 'MAP'
    };
  }

  keyExtractor = item => item.msId;

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
            <Animatable.Image
              source={{uri: `https://static.wixstatic.com/media/${row.logoUrl}`}}
              style={styles.image}
              {...imageAnimationProps}
            />
          </ListItem.Part>
          <ListItem.Part middle column containerStyle={[styles.border, {paddingRight: 17}]}>
            <ListItem.Part containerStyle={{marginBottom: 3}}>
              <Text dark10 text70 style={{flex: 1, marginRight: 10}} numberOfLines={1}>{row.name}</Text>
              <Text dark10 text70 style={{marginTop: 2}}>{row.email}</Text>
            </ListItem.Part>
            <ListItem.Part>
              <Text style={{flex: 1, marginRight: 10}} text90 dark40 numberOfLines={1}>{`${row.shortDescription} item`}</Text>
              <Text text90 color={statusColor} numberOfLines={1}>{row.phone}</Text>
            </ListItem.Part>
          </ListItem.Part>
        </ListItem>
      </Animatable.View>
    );
  }

  renderList() {
    const {businesses, query} = this.props;
    return (
      <View>
        <Text  color={Colors.red10} text50 middle style={{marginTop: 10, marginLeft: 65}}>{`you're looking for ${query}`}</Text>
        <FlatList
          data={businesses}
          renderItem={({item, index}) => this.renderRow(item, index)}
          keyExtractor={this.keyExtractor}
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
