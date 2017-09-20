import React, {Component} from 'react';
import {Text, ListView, View, Image, StyleSheet, ActivityIndicator, RefreshControl} from 'react-native';
import color from '../common/color';
import screen from '../common/screen';
import {comingMovies} from '../common/service';
import MovieCell from './MovieCell';
import RefreshState from '../common/RefreshState';

export default class ComingScene extends Component {
  
  static navigationOptions = {
    headerTitle: '豆瓣电影'
  }
  
  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 != row2
      }),
      loaded: false,
      pageIndex: 0,
      movieList: [],
      isHeaderRefreshing: false,
      footerRefreshState: RefreshState.Idle
    }
  }
  
  componentDidMount() {
    this.loadMovieData()
  }
  
  /**
   * 加载电影数据
   */
  loadMovieData() {
    var that = this
    let pageIndex = this.state.pageIndex
    fetch(comingMovies('武汉', pageIndex, 20)).then((response) => response.json()).then((json) => {
      console.log(json)
      if (json == null) {
        that.setState({
          loaded: true,
          isHeaderRefreshing: false,
          footerRefreshState: RefreshState.Failure
        })
        return
      }
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
      let movieList = that.state.movieList.concat(movies)
      let refreshState = (movies.length == 0) ? RefreshState.NoMoreData : RefreshState.Idle
      let start = pageIndex + json.subjects.length
      
      that.setState({
        dataSource: that.state.dataSource.cloneWithRows(movieList),
        loaded: true,
        pageIndex: start,
        movieList: movieList,
        isHeaderRefreshing: false,
        footerRefreshState: refreshState
      })
    })
      .catch((error) => {
        that.setState({
          loaded: true,
          isHeaderRefreshing: false,
          footerRefreshState: RefreshState.Failure
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
          <MovieCell movie={movie}/>
        }
        renderFooter={() => this.renderFooter()}
        onEndReachedThreshold={20}
        onEndReached={() => this.footerRefreshing()}
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
  
  renderLoadingView() {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator animating={true} size="small"/>
        <Text style={{color: '#666666', paddingLeft: 10}}>努力加载中</Text>
      </View>
    )
  }
  
  renderFooter() {
    let footer = null
    
    switch (this.state.footerRefreshState) {
      case RefreshState.Idle:
        break;
      case RefreshState.Refreshing:
        footer =
          <View style={styles.loadingView}>
            <ActivityIndicator size="small" />
            <Text style={{color: '#666666', paddingLeft: 10}}>努力加载中</Text>
          </View>
        break;
      case RefreshState.NoMoreData:
        footer =
          <View style={styles.loadingView}>
            <Text style={{color: '#666666'}}>没有更多数据了</Text>
          </View>
        break;
      case RefreshState.Failure:
        footer =
          <View style={styles.loadingView}>
            <Text style={{color: '#666666'}}>加载失败，请稍后重试</Text>
          </View>
        break;
    }
    return footer;
  }
  
  headerRefreshing() {
    this.setState({
      isHeaderRefreshing: true
    })
    this.loadMovieData()
  }
  
  footerRefreshing() {
    // 如果正在刷新或者没有更多数据，就不再拉取数据
    if (this.state.footerRefreshState == RefreshState.refreshing ||
      this.state.footerRefreshState == RefreshState.NoMoreData ||
      this.state.isHeaderRefreshing) {
      return
    }
    this.setState({
      footerRefreshState:RefreshState.Refreshing
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
    padding:10
  }
});