import * as React from "react"
import Svg, { Path } from "react-native-svg"

const PadLock = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={183}
    height={183}
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      stroke="#012C56"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.182 10.703V6.595C8.182 4.745 9.709 3 12 3c2.291 0 3.818 1.746 3.818 3.595v4.108"
    />
    <Path
      fill="#012C56"
      fillRule="evenodd"
      d="M4.5 11.393V19.2C4.5 21.89 8.664 22.5 12 22.5c3.336 0 7.5-.609 7.5-3.301v-7.806a.998.998 0 0 0-1-.997h-13c-.552 0-1 .445-1 .997Zm6 4.61c0 .476.207.904.536 1.198v1.552a1 1 0 0 0 1 1h.143a1 1 0 0 0 1-1V17.2a1.607 1.607 0 1 0-2.679-1.198Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default PadLock