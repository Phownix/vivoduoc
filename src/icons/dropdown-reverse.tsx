import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const DropdownReverse = () => (
  <Svg
    width={26}
    height={26}
    fill="none"
    stroke="#fff"
    viewBox="0 0 24 24"
  >
    <G clipPath="url(#a)">
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M16 16V8H8"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default DropdownReverse
