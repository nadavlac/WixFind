import React, {Component} from 'react';
import {StyleSheet, Alert, FlatList} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {AnimatableManager, ThemeManager, Colors, BorderRadiuses, ListItem, Text, View} from 'react-native-ui-lib'; //eslint-disable-line

export default class ListView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      onEdit: false,
      updating: false,
    };
  }

  query = 'photography';

  results = [
    {
      "name": "THE SHOP EXPERT",
      "siteUrl": "https://repairsxcarmichael.wixsite.com/theshop",
      "msId": "e00fe2a5-8e03-4eab-a48a-faee7f0cc1ff",
      "email": "repairsxcarmichael@gmail.com",
      "instanceId": "f4155a9a-eac3-4e56-a710-37ff673b4911",
      "templateTitle": "Start in ADI",
      "shortDescription": "We offer iPhone and iPad repairs at fair reasonable prices! ",
      "phone": "(912) 977-6248",
      "logoUrl": "cacb57_e15433ae8e2f4512a882aa76af509617~mv2.png",
      "latitude": 32.9305786,
      "longitude": -80.00318329999999
    },
    {
      "name": "ZZZzzzz - Blissful whole-family sleep",
      "siteUrl": "http://evawalther.wixsite.com/zzzleep",
      "msId": "dce1e56b-1402-45d1-9448-cf9ced7af6d7",
      "email": "eva@zleepblissfully.com",
      "instanceId": "d6e6b50e-63a5-4ff2-8dfd-879906ea44e8",
      "templateTitle": "Lactation Consultant",
      "shortDescription": "I support and guide sleep deprived working moms with easy to follow and simple steps to a blissful whole-family sleep - no cry it out involved.",
      "phone": null,
      "logoUrl": "398131_1eb4472633e94797af0164f948c31e62~mv2.jpg",
      "latitude": 56.26392000000001,
      "longitude": 9.501785000000002
    },
    {
      "name": "SHIFFFF",
      "siteUrl": "http://evawalther.wixsite.com/zzzleep",
      "msId": "dce1e56b-1402-45d1-9448-cf9ced7af657",
      "email": "eva@zleepblissfully.com",
      "instanceId": "d6e6b50e-63a5-4ff2-8dfd-879906ea44e8",
      "templateTitle": "Lactation Consultant",
      "shortDescription": "I support and guide sleep deprived working moms with easy to follow and simple steps to a blissful whole-family sleep - no cry it out involved.",
      "phone": null,
      "logoUrl": "398131_1eb4472633e94797af0164f948c31e62~mv2.jpg",
      "latitude": 56.26392000000001,
      "longitude": 9.501785000000002
    },
  ];

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

  render() {
    return (
      <View>
        <Text  color={Colors.red10} text50 middle style={{marginTop: 10, marginLeft: 65}}>{`you're looking for ${this.query}`}</Text>
        <FlatList
          data={this.results}
          renderItem={({item, index}) => this.renderRow(item, index)}
          keyExtractor={this.keyExtractor}
        />
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
