import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

const Profile = ({iconColor}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    viewBox="0 0 24 24"
  >
    <G fill={`${iconColor}`} fillRule="evenodd" clipRule="evenodd">
      <Path d="M6.75 6.5a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0ZM4.25 18.571a5.321 5.321 0 0 1 5.321-5.321h4.858a5.321 5.321 0 0 1 5.321 5.321 4.179 4.179 0 0 1-4.179 4.179H8.43a4.179 4.179 0 0 1-4.179-4.179Z" />
    </G>
  </Svg>
)
export default Profile