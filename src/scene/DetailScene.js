import React, {Component} from 'react';
import {View, Image, Text, Button, StyleSheet, ActivityIndicator, ScrollView} from 'react-native';
import {movieDetail} from "../common/service";

export default class DetailScene extends Component {
  
  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.state.params.movie.title
  })
  
  constructor(props) {
    super(props)
    this.state = {
      film: {},
      movieType: "",
      country: "",
      loaded: false
    }
  }
  
  componentDidMount() {
    this.loadMovieDetailData()
  }
  
  render () {
    if (!this.state.loaded) {
      return this.renderLoadingView()
    }
    let film = this.state.film
    let movie = this.props.navigation.state.params.movie
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topContainer}>
          <Image
            source={{uri: movie.images.large}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.year}>{movie.year}</Text>
            {
              movie.rating.average != 0 ?
                (<View style={styles.horizontalView}>
                  <Text style={styles.titleTag}>评分：</Text>
                  <Text style={styles.score}>{movie.rating.average}</Text>
                </View>) :
                (<View style={styles.horizontalView}>
                  <Text style={styles.titleTag}>暂无评分</Text>
                </View>)
            }
            <View style={styles.horizontalView}>
              <Text style={styles.titleTag}>导演：</Text>
              <Text style={styles.name}>{movie.directorNames}</Text>
            </View>
            <View style={styles.horizontalView}>
              <Text style={styles.titleTag}>主演：</Text>
              <Text style={styles.name}>{movie.actorNames}</Text>
            </View>
            <View style={styles.horizontalView}>
              <Text style={styles.titleTag}>类型：</Text>
              <Text style={styles.name}>{this.state.movieType}</Text>
            </View>
            <View style={styles.horizontalView}>
              <Text style={styles.titleTag}>国家/地区：</Text>
              <Text style={styles.name}>{this.state.country}</Text>
            </View>
          </View>
        </View>
        <View style={styles.topContainer}>
          <Text style={styles.wishLabel}>想看（{film.wish_count}）</Text>
          <Text style={styles.wishLabel}>看过（{film.collect_count}）</Text>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.title}>剧情简介</Text>
          <Text style={{ marginTop: 10, lineHeight:30, fontSize:15 }}>{film.summary}</Text>
        </View>
      </ScrollView>
      
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
  
  loadMovieDetailData() {
    var that = this
    let movieId = this.props.navigation.state.params.movie.id
    fetch(movieDetail(movieId)).then((response) => response.json()).then((json) => {
      console.log(json)
      var types = json.genres.join(" ")
      var country = json.countries.join(" ")
      that.setState({
        film:json,
        movieType:types,
        country:country,
        loaded:true
      })
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  summaryContainer: {
    marginTop: 10,
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'left',
  },
  year: {
    textAlign: 'left',
    color: '#777777',
    marginTop: 10,
  },
  thumbnail: {
    width: 150,
    height: 220,
    backgroundColor: '#f0f0f0',
  },
  horizontalView: {
    flexDirection: 'row',
    marginTop: 10
  },
  titleTag: {
    color: '#666666',
  },
  score: {
    color: '#ff8800',
    fontWeight: 'bold',
  },
  name: {
    color: '#333333',
    flex: 1
  },
  loadingView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishLabel: {
    fontSize: 16,
    color: '#444444',
    marginTop:10,
    marginBottom:10,
    marginLeft:20,
    marginRight:20
  }
})