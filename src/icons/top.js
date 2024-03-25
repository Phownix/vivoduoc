import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { vw, vh } from 'react-native-expo-viewport-units';

const SvgComponent = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={vw(200)} height={vh(20)}>
    <Path
      fill="#012C56"
      d="m0 113 20-7.2c20-7.1 60-21.5 100-17.6 40 3.8 80 25.8 120 27.5 40 1.6 80-17 120-33s80-29.4 120-35.4 80-4.6 120 12.2c40 16.8 80 49.2 120 49.7s80-30.9 120-31.7c40-.8 80 28.8 120 33.5 40 4.7 80-15.7 120-18.2s80 12.9 100 20.5l20 7.7V0H0Z"
    />
  </Svg>
)
export default SvgComponent
