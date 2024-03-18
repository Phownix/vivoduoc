import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = ({iconColor}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="none">
    <Path
      fill={`${iconColor}`}
      fillRule="evenodd"
      d="M21.818 20.32 15 23.96l-6.818-3.64v-4.96L15 19l6.818-3.64v4.96zM24.3 11 15 15.96 5.7 11 15 6.04 24.3 11zm5.7 0L15 3 0 11l5.454 2.907v8L15 27l9.546-5.093v-8L30 11z"
      clipRule="evenodd"
    />
    <Path
      fill={`${iconColor}`}
      fillRule="evenodd"
      d="M27.273 12.454v9.213H30V11"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
