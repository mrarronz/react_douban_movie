import {
  Dimensions,
  PixelRatio,
  Platform
} from 'react-native';

export default {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  onePixel: 1 / PixelRatio.get(),
  isPlatformiOS: (Platform.OS === 'ios')
}