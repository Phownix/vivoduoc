import * as React from "react"
import StyleSheet from 'react-native-media-query';
import Svg, { Path } from "react-native-svg"

const Back = () => (
  <Svg
    style={styles.main}
    stroke="#012C56"
    viewBox="-4.5 0 20 20"
  >
    <Path
      fill="#012C56"
      fillRule="evenodd"
      stroke="none"
      d="M10.634.292a1.063 1.063 0 0 0-1.464 0L.607 8.556a1.95 1.95 0 0 0 0 2.827l8.625 8.325c.4.385 1.048.39 1.454.01a.975.975 0 0 0 .01-1.425l-7.893-7.617a.975.975 0 0 1 0-1.414l7.83-7.557a.974.974 0 0 0 0-1.413"
    />
  </Svg>
)
export default Back

const {styles} = StyleSheet.create({
  main: {
    '@media (max-width: 1024px)': {
      width: 38,
      height: 38,
    },
    '@media (max-width: 412px)': {
      width: 28,
      height: 28,
    },
  }
})