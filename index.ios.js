/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import RootScene from './src/scene/RootScene';

export default class react_douban_movie extends Component {
  render() {
    return (
      <RootScene/>
    );
  }
}

AppRegistry.registerComponent('react_douban_movie', () => react_douban_movie);
