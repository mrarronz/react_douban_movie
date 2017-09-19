
export default {
  baiduAK: "7VENmCeC4aaAfx3CKbSjT1K3oRucOgDK"
}

export function getLocation(location) {
  return "https://api.map.baidu.com/geocoder/v2/?ak=" + this.baiduAK + "&location=" + location + "&output=json&pois=1"
}

export function queryMovies(city, start, count) {
  return "https://api.douban.com/v2/movie/in_theaters?city=" + city + "&start=" + start + "&count=" + count
}

export function comingMovies(city, start, count) {
  return "https://api.douban.com/v2/movie/coming_soon?city=" + city + "&start=" + start + "&count=" + count
}

export function movieDetail(movieId) {
  return "https://api.douban.com/v2/movie/subject/" + movieId
}