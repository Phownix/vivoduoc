import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface IColor {
  iconColor: string;
}

const Assistance = ({iconColor}: IColor) => (
  <Svg
    width={28}
    height={28}
    fill="none"
  >
    <Path
      fill={`${iconColor}`}
      fillRule="evenodd"
      d="m13.62 17.16-.007-.007a9.568 9.568 0 0 0-.517-.432 14.328 14.328 0 0 0-1.773-1.173 14.66 14.66 0 0 0-3.584-1.44v7.3c1.005.28 2.07.68 3.106 1.155a24.71 24.71 0 0 1 4.658 2.786 25.553 25.553 0 0 1 4.676-2.83 20.171 20.171 0 0 1 3.082-1.161v-7.29a14.452 14.452 0 0 0-3.432 1.402 16.27 16.27 0 0 0-1.89 1.238 11.852 11.852 0 0 0-.586.478l-.016.014-1.878 1.749-1.838-1.789zm9.64-5.964c-4.562.951-7.76 3.928-7.76 3.928s-2.964-2.884-7.76-3.886a15.942 15.942 0 0 0-2.74-.33v12.858c2.059 0 7.041 1.861 10.5 5.234 3.268-3.15 7.854-5.104 10.067-5.234.157-.009.301-.009.433 0V10.908c-.954 0-1.871.107-2.74.288z"
      clipRule="evenodd"
    />
    <Path
      fill={`${iconColor}`}
      fillRule="evenodd"
      d="M15.294 9.252c1.718 0 3.115-1.427 3.115-3.193s-1.397-3.192-3.115-3.192c-1.718 0-3.115 1.426-3.115 3.192 0 1.766 1.397 3.193 3.115 3.193zm0 1.866c2.729 0 4.941-2.265 4.941-5.059S18.023 1 15.295 1c-2.73 0-4.942 2.265-4.942 5.06 0 2.793 2.212 5.058 4.941 5.058z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Assistance;
