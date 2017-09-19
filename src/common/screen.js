import {
  Dimensions,
  Platform,
  PixelRatio
} from 'react-native';

export default {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  onePixel: 1/PixelRatio.get(),
  statusBarHeight: (Platform.OS == 'iOS' ? 20 : 0)
  
}