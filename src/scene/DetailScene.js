import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

export default class DetailScene extends Component {
  render () {
    return (
      <View>
        <Text>这是详情页面</Text>
        <Button title="返回" onPress={()=>{ this.props.navigation.goBack() }} />
      </View>
      
    )
  }
}