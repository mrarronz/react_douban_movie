import React, {Component} from 'react';
import {View, Text, ListView, StyleSheet, ActivityIndicator} from 'react-native';
import service, {getLocation, queryMovies} from '../common/service';
import MovieCell from './MovieCell';

export default class TheaterScene extends Component {
  
  static navigationOptions = {
    headerTitle: '豆瓣电影'
  }
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 != row2
      }),
      loaded: false
    }
  }
  
  componentDidMount() {
    fetch(queryMovies('北京', 0, 50)).then((response) => response.json()).then((json) => {
      console.log(json)
      var movies = []
      for (var idx in json.subjects) {
        var movieItem = json.subjects[idx]
        var directors = ""
        for (var index in movieItem.directors) {
          var director = movieItem.directors[index]
          if (directors == "") {
            directors = directors + director.name
          } else {
            directors = directors + " " + director.name
          }
        }
        movieItem["directorNames"] = directors
        
        var actors = ""
        for (var index in movieItem.casts) {
          var actor = movieItem.casts[index]
          if (actors == "") {
            actors = actors + actor.name
          } else {
            actors = actors + " " + actor.name
          }
        }
        movieItem["actorNames"] = actors
        movies.push(movieItem)
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(movies),
        loaded: true
      })
    })
  }
  
  /**
   * 获取当前位置经纬度，调用百度地图api获取城市，然后根据城市调用豆瓣电影接口获取对应城市的电影
   */
  getCity() {
    navigator.geolocation.getCurrentPosition((data) => {
      console.log(data)
      let url = getLocation(data.coords.latitude, data.coords.longitude)
      fetch(url).then((response) => response.json()).then((json) => {
        console.log(json)
        let city = json.result.addressComponent.city
        console.log("city: " + city)
      })
    })
  }
  
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView()
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(movie) =>
          <MovieCell movie={movie} onPress={() => {
            this.props.navigation.navigate('Detail', {movie: movie})
          }}
          />
        }
      />
    )
  }
  
  renderLoadingView() {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator animating={true} size="small"/>
        <Text style={{color: '#666666', paddingLeft: 10}}>努力加载中</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});