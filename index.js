/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Navigation } from "react-native-navigation";
import ListView from './ListView';

AppRegistry.registerComponent(appName, () => App);

export function registerScreens() {
  Navigation.registerComponent(`MapView`, () => App);
  Navigation.registerComponent(`ListView`, () => ListView);
}

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: {
                  name: "MapView",
                }
              }
            ]
          }
        }
    });
  });
