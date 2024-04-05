import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

const HelpIcon = () => (
  <Svg
    width={28}
    height={28}
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 10a3 3 0 1 1 3 3v1m9-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
    <Circle cx={12} cy={17} r={1} fill="#000" />
  </Svg>
)
export default HelpIcon
