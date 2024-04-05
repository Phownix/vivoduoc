import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

const LoginIcon = () => (
  <Svg
    width={26}
    height={26}
    fill="none"
    viewBox="0 0 24 24"
  >
    <G stroke="#fff" strokeLinecap="round" strokeWidth={1.5}>
      <Path d="M20 12a8 8 0 0 0-8-8m0 16a7.985 7.985 0 0 0 6.245-3" />
      <Path strokeLinejoin="round" d="M4 12h10m0 0-3-3m3 3-3 3" />
    </G>
  </Svg>
)
export default LoginIcon
