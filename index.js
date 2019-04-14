/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/screens/MapView';
import {name as appName} from './app.json';
import { Navigation } from "react-native-navigation";
import ListView from './src/screens/ListView';
import BusinessPage from './src/screens/BusinessPage';
import Home from './src/screens/Home';

AppRegistry.registerComponent(appName, () => App);

export function registerScreens() {
  Navigation.registerComponent(`MapView`, () => App);
  Navigation.registerComponent(`ListView`, () => ListView);
  Navigation.registerComponent(`Home`, () => Home);
  Navigation.registerComponent(`BusinessPage`, () => BusinessPage);
}

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: {
                  name: "Home",
                  // passProps: {"componentId":"Component4","rootTag":441,"businesses":[{"name":"Bhairavi Yoga","siteUrl":"https://daianaradulescu3.wixsite.com/bhairaviyoga","msId":"0808fbd8-4484-420f-a4c8-d43ce3b32909","email":"relax@bhairaviyoga.ro","instanceId":"3cce8128-87e4-442e-93dc-9e1ffdfc60ac","templateTitle":"Yoga Instructor","shortDescription":"We offer a unique system of Traditional Yoga, where RELAXATION is the beginning point of your HAPPINESS and BALANCE. Relax Your Whole Self!","phone":"004073 462 44 58","addressString":"Con Sabor, Strada Ionel Perlea 8, Bucharest, Romania","logoUrl":"7f64fe_67769fdbeea2492a9c58445897f3ee14~mv2.png","latitude":44.43548149999999,"longitude":26.08746240000005,"offerings":[{"name":"1 Sesiune Yoga Tradițională","url":"https://www.bhairaviyoga.ro/book-online-yoga-sector-3/1-sesiune-yoga-tradi%C8%9Bional%C4%83","imageUrl":"edb82519f9e544e69878d13967732f31.jpg","price":"60.0 RON"},{"name":"Test","url":null,"imageUrl":null,"price":"1.0 RON"},{"name":"Private Yoga Class","url":"https://www.bhairaviyoga.ro/book-online-yoga-sector-3/private-yoga-class","imageUrl":"5ffe2b22628447469a39701a06d4692e.jpg","price":"95.0 EUR"}]},{"name":"Yogangela Yoga Stüdyosu","siteUrl":"https://aysuitirkaracam.wixsite.com/mysite","msId":"b6eb0304-70c0-4459-bc17-5fabd14045da","email":"yogangelastudyo@gmail.com","instanceId":"5f40185f-9f5d-4b50-be64-57d5add59189","templateTitle":"Yoga Center","shortDescription":null,"phone":null,"addressString":"Ataşehir Atatürk Mahallesi, Ata Plaza 3-3, Ataşehir/Istanbul, Turkey","logoUrl":"fc5b8d_75c5af063a5249f4b5d677006d95ad1b~mv2_d_1600_1200_s_2.png","latitude":40.9923991,"longitude":29.122204399999987,"offerings":[{"name":"heyyo","url":"https://www.yogangela.org/yoga/heyyo","imageUrl":null,"price":"65.0 USD"},{"name":"Vinyasa","url":"https://www.yogangela.org/yoga/vinyasa","imageUrl":null,"price":"50.0 TRY"}]}],"coords":{"speed":-1,"longitude":34.853432,"latitude":31.271541,"accuracy":5,"heading":-1,"altitude":0,"altitudeAccuracy":-1},"query":"Yoga","services":[{"name":"Test","url":null,"imageUrl":null,"price":"1.0 RON","nextAvailableSlot":"2019-04-14T10:08:56.226Z","distanceFromUser":1651.4078179568348,"business":{"logoUrl":"7f64fe_67769fdbeea2492a9c58445897f3ee14~mv2.png","siteUrl":"https://daianaradulescu3.wixsite.com/bhairaviyoga","name":"Bhairavi Yoga","addressString":"Con Sabor, Strada Ionel Perlea 8, Bucharest, Romania","longitude":26.08746240000005,"latitude":44.43548149999999}},{"name":"1 Sesiune Yoga Tradițională","url":"https://www.bhairaviyoga.ro/book-online-yoga-sector-3/1-sesiune-yoga-tradi%C8%9Bional%C4%83","imageUrl":"edb82519f9e544e69878d13967732f31.jpg","price":"60.0 RON","nextAvailableSlot":"2019-04-14T10:51:56.224Z","distanceFromUser":1651.4078179568348,"business":{"logoUrl":"7f64fe_67769fdbeea2492a9c58445897f3ee14~mv2.png","siteUrl":"https://daianaradulescu3.wixsite.com/bhairaviyoga","name":"Bhairavi Yoga","addressString":"Con Sabor, Strada Ionel Perlea 8, Bucharest, Romania","longitude":26.08746240000005,"latitude":44.43548149999999}},{"name":"heyyo","url":"https://www.yogangela.org/yoga/heyyo","imageUrl":null,"price":"65.0 USD","nextAvailableSlot":"2019-04-17T14:05:56.226Z","distanceFromUser":1196.4784233028147,"business":{"logoUrl":"fc5b8d_75c5af063a5249f4b5d677006d95ad1b~mv2_d_1600_1200_s_2.png","siteUrl":"https://aysuitirkaracam.wixsite.com/mysite","name":"Yogangela Yoga Stüdyosu","addressString":"Ataşehir Atatürk Mahallesi, Ata Plaza 3-3, Ataşehir/Istanbul, Turkey","longitude":29.122204399999987,"latitude":40.9923991}},{"name":"Private Yoga Class","url":"https://www.bhairaviyoga.ro/book-online-yoga-sector-3/private-yoga-class","imageUrl":"5ffe2b22628447469a39701a06d4692e.jpg","price":"95.0 EUR","nextAvailableSlot":"2019-05-14T09:41:56.226Z","distanceFromUser":1651.4078179568348,"business":{"logoUrl":"7f64fe_67769fdbeea2492a9c58445897f3ee14~mv2.png","siteUrl":"https://daianaradulescu3.wixsite.com/bhairaviyoga","name":"Bhairavi Yoga","addressString":"Con Sabor, Strada Ionel Perlea 8, Bucharest, Romania","longitude":26.08746240000005,"latitude":44.43548149999999}},{"name":"Vinyasa","url":"https://www.yogangela.org/yoga/vinyasa","imageUrl":null,"price":"50.0 TRY","nextAvailableSlot":"2019-06-13T11:55:56.226Z","distanceFromUser":1196.4784233028147,"business":{"logoUrl":"fc5b8d_75c5af063a5249f4b5d677006d95ad1b~mv2_d_1600_1200_s_2.png","siteUrl":"https://aysuitirkaracam.wixsite.com/mysite","name":"Yogangela Yoga Stüdyosu","addressString":"Ataşehir Atatürk Mahallesi, Ata Plaza 3-3, Ataşehir/Istanbul, Turkey","longitude":29.122204399999987,"latitude":40.9923991}}]}
                }
              }
            ]
          }
        }
    });
  });
