import React, {Component} from 'react';
import {
  StyleSheet, 
  Alert, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Linking, 
  SectionList
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {AnimatableManager, ThemeManager, Colors, BorderRadiuses, ListItem, Text, View, Button} from 'react-native-ui-lib'; //eslint-disable-line
import MapScreen from './MapView';
const mapIcon = require('../../assets/mapIcon.png');
const listIcon = require('../../assets/listIcon.png');
import moment from 'moment';
import {Navigation} from 'react-native-navigation';
import _ from 'lodash'
import Icon from 'react-native-vector-icons/Ionicons';

export const mainColor = '#397df6';

const FILTERS = {
  all: {
    id: 'all',
    label: 'All'
  }, 
  today: {
    id: 'today',
    label: 'Today'
  }, 
  tomorrow: {
    id: 'tomorrow',
    label: 'Tomorrow'
  }, 
  later: {
    id: 'later',
    label: 'Later'
  }
}

const initialSections = [
  {title: 'Today', data: []},
  {title: 'Tomorrow', data: []},
  {title: 'Later', data: []}
]

export default class ListView extends Component {
  static options(passProps) {
    return {
      topBar: {
        visible: true,
        background: {
          color: mainColor
        },
        backButton: {
          // icon: require('icon.png'),
          visible: true,
          color: '#FFF'
        },
        noBorder: true
      }
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      onEdit: false,
      updating: false,
      mode: 'LIST',
      filter: FILTERS.all.id,
      sections: this.getSections() || initialSections
    };

    this.getSections = this.getSections.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
    this.renderFilterButton = this.renderFilterButton.bind(this)
    this.renderFlatList = this.renderFlatList.bind(this)
  }

  keyExtractor = (item,index) => index;

  getSections() {
    let sections = _.cloneDeep(initialSections)

    this.props.services.forEach(s => {
      if (moment(s.nextAvailableSlot).format('l') === moment().format('l')) {
        sections[0].data.push(s)
      } else if (moment(s.nextAvailableSlot).format('l') === moment().add(1, 'days').format('l')) {
        sections[1].data.push(s)
      } else {
        sections[2].data.push(s)
      }
    })

    return sections
  }

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
                      business: row.business,
                    }
                  },
                })
              }}
            >
              <ListItem.Part left column containerStyle={[styles.border, {paddingRight: 17, paddingLeft: 10}]}>
                <Text dark10 text100 numberOfLines={1} style={{ marginBottom: 3}}>{moment(row.nextAvailableSlot).format('DD/MM')}</Text>
                {/*<Text dark10 text100 numberOfLines={1} style={{ marginBottom: 3}}>{moment(row.nextAvailableSlot).format('ddd')}</Text>*/}
                <Text dark10 text100 numberOfLines={1}>{`${moment(row.nextAvailableSlot).format('h:mm')} PM`}</Text>
              </ListItem.Part>
              <ListItem.Part middle containerStyle={[styles.border, {paddingRight: 17}]}>
                <ListItem.Part containerStyle={{marginBottom: 3}}>
                  <Image source={{uri: row.imageUrl ? `https://static.wixstatic.com/media/${row.imageUrl}` : `https://static.wixstatic.com/media/${row.business.logoUrl}`}}
                         style={{width: 30, height:30, borderRadius: 15}}/>
                </ListItem.Part>
                <ListItem.Part column containerStyle={[styles.border, {paddingRight: 17, paddingLeft: 17, marginTop:10, flex: 1} ]}>
                  <Text color={'black'} text90 style={{flex: 1, marginRight: 10, marginBottom: -7}} numberOfLines={1}>{row.business.name}</Text>
                  <Text dark10 text60 style={{flex: 1, marginRight: 10, fontWeight: '500'}} numberOfLines={1}>{row.name}</Text>
                  <Text dark10 text90 style={{flex: 1, marginRight: 10}} numberOfLines={1}>{row.business.addressString}</Text>
                  <Text dark10 text90 style={{flex: 1, marginRight: 10, marginTop: -5}} numberOfLines={1}>{`${row.distanceFromUser.toFixed(2)} km`}</Text>
                </ListItem.Part>
              </ListItem.Part>
              <ListItem.Part right>
                <TouchableOpacity style={{marginBottom: 20, marginRight: 20, marginTop: 20}}>
                  <Icon name='ios-arrow-forward' size={20}/>
                </TouchableOpacity>
              </ListItem.Part>
            </ListItem>
        </Animatable.View>

    );
  }

  renderSectionHeader({section: {title}}) {
    return (
      <View style={{backgroundColor: '#f0f4f7', height: 23, justifyContent: 'center', paddingLeft: 20}}>
        <Text style={{fontSize: 12}}>{title}</Text>
      </View>
    )
  }

  renderSectionList() {
    const {services, query} = this.props;
    return (
      <SectionList
        // data={services}
        sections={this.state.sections}
        renderItem={({item, index}) => this.renderRow(item, index)}
        keyExtractor={(item, index) => index.toString()}
        renderSectionHeader={this.renderSectionHeader}
      />
    )
  }

  renderFlatList() {
    return (
      <FlatList
        data={this.state.sections[_.keys(FILTERS).indexOf(this.state.filter) -1].data}
        renderItem={({item, index}) => this.renderRow(item, index)}
        keyExtractor={(item, index) => index.toString()}
      />
    )
  }

  setFilter = (filter) => {
    this.setState({filter: FILTERS[filter].id})
  }

  renderFilterButton(filter, index) {
    return (
      <TouchableOpacity 
        key={filter}
        style={{
          borderColor: '#FFF', 
          borderWidth: 1, 
          padding: 5, 
          borderRadius: 15, 
          paddingVertical: 6, 
          paddingHorizontal: 10,
          marginRight: _.values(FILTERS)[index + 1] ? 10 : 0,
          backgroundColor: filter === this.state.filter ? '#fff' : undefined,
        }}
        onPress={() => this.setFilter(filter)}
      >
        <Text 
          style={{color: filter === this.state.filter ? '#000' : '#fff'}}
        >
          {FILTERS[filter].label}
        </Text>
      </TouchableOpacity>
    )
  }

  renderSearchSection() {
    const {query} = this.props;
    return (
      <View style={{backgroundColor: mainColor, paddingBottom: 20}}>
        <View 
          style={{
            borderBottomWidth: 1, 
            borderBottomColor: '#ffffff', 
            marginHorizontal: 20, 
            marginTop: 20, 
            flexDirection: 'row', 
            alignItems: 'center',
            marginBottom: 25
          }}
        >
          <View>
            <Icon name='ios-search' color='#fff' size={20}/>
          </View>
          <Text style={{paddingVertical: 10, width: '100%', color: '#fff', marginLeft: 10}}>
            {query}
          </Text>
        </View>
        <View row style={{paddingLeft: 20}}>
          {_.keys(FILTERS).map(this.renderFilterButton)}
        </View>
      </View>
    )
  }

  renderList() {
    return (
      <View>

        {this.renderSearchSection()}

        {this.state.filter === FILTERS.all.id
          ? this.renderSectionList()
          : this.renderFlatList()
        }
      </View>
    )
  }

  renderMap() {
    return (
      <View flex>
        {this.renderSearchSection()}
        <MapScreen {...this.props}/>
      </View>
    )
  }

  render() {
    const imageSrc = this.state.mode === 'MAP' ? listIcon : mapIcon;

    return (
      <View flex>
        {this.state.mode === 'MAP' ? this.renderMap() : this.renderList()}
        <View style={{position:'absolute', bottom:20, right:20}}>
          <TouchableOpacity onPress={()=> {this.setState({mode: this.state.mode==='MAP' ? 'LIST': 'MAP'})}}>
            <View style={{backgroundColor: mainColor, borderRadius: 30}}>
              <Image source={imageSrc} style={{height:60, width:60}}/>
            </View>
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
