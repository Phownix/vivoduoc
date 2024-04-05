import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Dropdown = () => (
  <Svg
    width={26}
    height={26}
    fill="none"
    stroke="#fff"
    viewBox="0 0 24 24"
  >
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M12.707 14.707a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 1.414-1.414L12 12.586l4.293-4.293a1 1 0 1 1 1.414 1.414l-5 5Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Dropdown
