import * as React from "react"
import StyleSheet from 'react-native-media-query';
import Svg, { Path } from "react-native-svg"

const Logout = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    style={styles.main}
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      fill="#012C56"
      fillRule="evenodd"
      d="M2 6.5A4.5 4.5 0 0 1 6.5 2H12a4 4 0 0 1 4 4v1a1 1 0 1 1-2 0V6a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 6.5v11A2.5 2.5 0 0 0 6.5 20H12a2 2 0 0 0 2-2v-1a1 1 0 1 1 2 0v1a4 4 0 0 1-4 4H6.5A4.5 4.5 0 0 1 2 17.5v-11Zm16.293 1.793a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L19.586 13H11a1 1 0 1 1 0-2h8.586l-1.293-1.293a1 1 0 0 1 0-1.414Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Logout

const {styles} = StyleSheet.create({
  main: {
    '@media (max-width: 1024px)': {
      width: 48,
      height: 48,
    },
    '@media (max-width: 390px)': {
      width: 32,
      height: 32,
    },
  }
})