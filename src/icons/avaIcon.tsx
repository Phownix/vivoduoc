import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = () => (
  <Svg
   width={43}
   height={35}
   fill="none">
    <Path d="M3 3h37v29H3z" fill="white"/>
    <Path
      fill="#012C56"
      d="M15.216 19.315h-2.51l-.442 1.122H10L12.886 14h2.188l2.886 6.437h-2.3l-.444-1.122zm-.614-1.563-.64-1.619-.642 1.619h1.282zM24.992 14l-2.791 6.437h-2.188L17.22 14h2.395l1.576 3.76L22.803 14h2.188zm4.481 5.315h-2.509l-.443 1.122h-2.263L27.144 14h2.188l2.886 6.437h-2.302l-.443-1.122zm-.613-1.563-.641-1.619-.642 1.619h1.283z"
    />
  </Svg>
)
export default SvgComponent
