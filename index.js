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
                }
              }
            ]
          }
        }
    });
  });
