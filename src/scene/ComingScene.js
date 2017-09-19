import React, {Component} from 'react';
import {Text, ListView, View, Image, StyleSheet, ActivityIndicator, RefreshControl} from 'react-native';
import color from '../common/color';
import screen from '../common/screen';
import {comingMovies} from '../common/service';
import MovieCell from './MovieCell';

export default class ComingScene extends Component {
  
  static navigationOptions = {
    headerTitle: '豆瓣电影'
  }
  
  constructor(props){
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged:(row1, row2) => row1 != row2
      }),
      loaded: false,
      pageIndex: 0,
      movieList: [],
      isHeaderRefreshing: false
    }
  }
  
  componentDidMount(){
    this.loadMovieData()
  }
  
  loadMovieData(){
    let pageIndex = this.state.pageIndex
    let tempMovies = this.state.movieList
    fetch(comingMovies('武汉', pageIndex, 10)).then((response) => response.json()).then((json) => {
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
      let movieList = (pageIndex == 0) ? movies : tempMovies.concat(movies)
      
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(movieList),
        loaded: true,
        movieList: movieList,
        isHeaderRefreshing: false
      })
    })
  }
  
  render(){
    if (!this.state.loaded) {
      return this.renderLoadingView()
    }
    return (
      <ListView
        dataSource = {this.state.dataSource}
        renderRow = {(movie) =>
          <MovieCell movie={movie}/>
        }
        refreshControl={
          <RefreshControl
            refreshing={this.state.isHeaderRefreshing}
            onRefresh={() => this.headerRefreshing()}
            tintColor='gray'
          />
        }
        style={styles.listView}
      />
    )
  }
  
  renderLoadingView(){
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator animating={true} size="small"/>
        <Text style={{ color:'#666666', paddingLeft:10 }}>努力加载中</Text>
      </View>
    )
  }
  
  headerRefreshing(){
    this.setState({
      pageIndex:0,
      isHeaderRefreshing:true
    })
    this.loadMovieData()
  }
}

var styles = StyleSheet.create({
  listView: {
    backgroundColor: '#F5FCFF',
  },
  loadingView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});