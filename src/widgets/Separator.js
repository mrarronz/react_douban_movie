import {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {color, screen} from '../common';

export default class Separator extends Component {
  render() {
    return (
      <View style={[styles.line, this.props.style]}/>
    )
  }
}

const styles = StyleSheet.create({
  line: {
    width: screen.screenWidth,
    height: screen.onePixel,
    backgroundColor: color.border
  }
})
