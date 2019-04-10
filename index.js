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
  Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App);
  Navigation.registerComponent(`navigation.playground.ListView`, () => ListView);
}

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: {
                  name: "navigation.playground.WelcomeScreen",
                }
              },
              {
                component: {
                  name: "navigation.playground.ListView",
                }
              }
            ]
          }
        }
    });
  });
