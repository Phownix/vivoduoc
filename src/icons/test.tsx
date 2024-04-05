import * as React from "react"
import { Dimensions } from 'react-native';
import Svg, { Path } from "react-native-svg"

const { width, height } = Dimensions.get('window');
const bottomSpace = 50;

console.log(width, height)

const SvgComponent = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height + bottomSpace} {...props}>
    <Path
      fill="#184f8a"
      d="m0 51 21 5.5C42 62 84 73 125.8 75.8c41.9 2.9 83.5-2.5 125.4 3.2C293 84.7 335 101.3 377 104c42 2.7 84-8.7 125.8-17 41.9-8.3 83.5-13.7 125.4-10.8C670 79 712 90 754 87.2c42-2.9 84-19.5 125.8-25 41.9-5.5 83.5.1 125.4 5.6 41.8 5.5 83.8 10.9 125.8 13.5 42 2.7 84 2.7 126 5.5 42 2.9 84 8.5 125.8 17 41.9 8.5 83.5 19.9 125.4 14.4 41.8-5.5 83.8-27.9 125.8-33.5 42-5.7 84 5.3 125.8 2.5 41.9-2.9 83.5-19.5 125.4-16.7 41.8 2.8 83.8 25.2 125.8 30.7s84-5.9 125.8-8.7c41.9-2.8 83.5 2.8 125.4 5.7C2304 101 2346 101 2367 101h21V0H0Z"
    />
    <Path
      fill="#12467d"
      d="m0 218 21-2.8c21-2.9 63-8.5 104.8-8.5 41.9 0 83.5 5.6 125.4 19.6 41.8 14 83.8 36.4 125.8 36.4s84-22.4 125.8-25.2c41.9-2.8 83.5 13.8 125.4 27.7C670 279 712 290 754 287.2c42-2.9 84-19.5 125.8-30.5 41.9-11 83.5-16.4 125.4-16.4 41.8 0 83.8 5.4 125.8 10.9s84 11.1 126 5.6 84-22.1 125.8-11c41.9 11.2 83.5 50.2 125.4 36.4 41.8-13.9 83.8-80.5 125.8-91.7 42-11.2 84 33.2 125.8 47 41.9 13.8 83.5-2.8 125.4-14 41.8-11.2 83.8-16.8 125.8-8.5s84 30.7 125.8 47.3c41.9 16.7 83.5 27.7 125.4 11 41.8-16.6 83.8-61 104.8-83.1l21-22.2V99h-21c-21 0-63 0-104.8-2.8-41.9-2.9-83.5-8.5-125.4-5.7-41.8 2.8-83.8 14.2-125.8 8.7s-84-27.9-125.8-30.7c-41.9-2.8-83.5 13.8-125.4 16.7C1718 88 1676 77 1634 82.7c-42 5.6-84 28-125.8 33.5-41.9 5.5-83.5-5.9-125.4-14.4-41.8-8.5-83.8-14.1-125.8-17-42-2.8-84-2.8-126-5.5-42-2.6-84-8-125.8-13.5-41.9-5.5-83.5-11.1-125.4-5.6C838 65.7 796 82.3 754 85.2c-42 2.8-84-8.2-125.8-11-41.9-2.9-83.5 2.5-125.4 10.8C461 93.3 419 104.7 377 102c-42-2.7-84-19.3-125.8-25-41.9-5.7-83.5-.3-125.4-3.2C84 71 42 60 21 54.5L0 49Z"
    />
    <Path
      fill="#0c3d6f"
      d="m0 385 21-14c21-14 63-42 104.8-39.2 41.9 2.9 83.5 36.5 125.4 47.7 41.8 11.2 83.8-.2 125.8-19.7s84-47.1 125.8-36c41.9 11.2 83.5 61.2 125.4 91.7C670 446 712 457 754 440.3c42-16.6 84-61 125.8-83.1 41.9-22.2 83.5-22.2 125.4-13.9 41.8 8.4 83.8 25 125.8 38.9 42 13.8 84 24.8 126 16.5 42-8.4 84-36 125.8-33.2 41.9 2.8 83.5 36.2 125.4 27.8 41.8-8.3 83.8-58.3 125.8-75 42-16.6 84 0 125.8 16.7 41.9 16.7 83.5 33.3 125.4 25 41.8-8.3 83.8-41.7 125.8-36.2s84 49.9 125.8 77.7c41.9 27.8 83.5 39.2 125.4 25.3C2304 413 2346 374 2367 354.5l21-19.5V166l-21 22.2c-21 22.1-63 66.5-104.8 83.1-41.9 16.7-83.5 5.7-125.4-11-41.8-16.6-83.8-39-125.8-47.3-42-8.3-84-2.7-125.8 8.5-41.9 11.2-83.5 27.8-125.4 14-41.8-13.8-83.8-58.2-125.8-47-42 11.2-84 77.8-125.8 91.7-41.9 13.8-83.5-25.2-125.4-36.4-41.8-11.1-83.8 5.5-125.8 11s-84-.1-126-5.6-84-10.9-125.8-10.9c-41.9 0-83.5 5.4-125.4 16.4-41.8 11-83.8 27.6-125.8 30.5-42 2.8-84-8.2-125.8-22-41.9-13.9-83.5-30.5-125.4-27.7-41.8 2.8-83.8 25.2-125.8 25.2s-84-22.4-125.8-36.4c-41.9-14-83.5-19.6-125.4-19.6-41.8 0-83.8 5.6-104.8 8.5L0 216Z"
    />
    <Path
      fill="#063463"
      d="m0 535 21-30.7c21-30.6 63-92 104.8-103.1 41.9-11.2 83.5 27.8 125.4 53C293 479.3 335 490.7 377 474s84-61.3 125.8-55.8c41.9 5.5 83.5 61.1 125.4 86.1 41.8 25 83.8 19.4 125.8 11 42-8.3 84-19.3 125.8-27.6 41.9-8.4 83.5-14 125.4-8.5 41.8 5.5 83.8 22.1 125.8 36.1s84 25.4 126 11.5c42-13.8 84-52.8 125.8-61.1 41.9-8.4 83.5 14 125.4 8.5 41.8-5.5 83.8-38.9 125.8-58.4s84-25.1 125.8-14.1c41.9 11 83.5 38.6 125.4 44.1 41.8 5.5 83.8-11.1 125.8-2.8s84 41.7 125.8 61.2c41.9 19.5 83.5 25.1 125.4 14.1 41.8-11 83.8-38.6 104.8-52.5l21-13.8V333l-21 19.5c-21 19.5-63 58.5-104.8 72.3-41.9 13.9-83.5 2.5-125.4-25.3-41.8-27.8-83.8-72.2-125.8-77.7s-84 27.9-125.8 36.2c-41.9 8.3-83.5-8.3-125.4-25-41.8-16.7-83.8-33.3-125.8-16.7-42 16.7-84 66.7-125.8 75-41.9 8.4-83.5-25-125.4-27.8-41.8-2.8-83.8 24.8-125.8 33.2-42 8.3-84-2.7-126-16.5-42-13.9-84-30.5-125.8-38.9-41.9-8.3-83.5-8.3-125.4 13.9C838 377.3 796 421.7 754 438.3c-42 16.7-84 5.7-125.8-24.8-41.9-30.5-83.5-80.5-125.4-91.7-41.8-11.1-83.8 16.5-125.8 36s-84 30.9-125.8 19.7c-41.9-11.2-83.5-44.8-125.4-47.7C84 327 42 355 21 369L0 383Z"
    />
    <Path
      fill="#012c56"
      d="m0 652 21-41.7c21-41.6 63-125 104.8-130.5 41.9-5.5 83.5 66.9 125.4 103C293 619 335 619 377 588.3c42-30.6 84-92 125.8-86.5 41.9 5.5 83.5 77.9 125.4 111.2 41.8 33.3 83.8 27.7 125.8 8.2s84-52.9 125.8-69.5c41.9-16.7 83.5-16.7 125.4-11.2C1047 546 1089 557 1131 571s84 31 126 33.8c42 2.9 84-8.5 125.8-3 41.9 5.5 83.5 27.9 125.4 22.4 41.8-5.5 83.8-38.9 125.8-69.5 42-30.7 84-58.7 125.8-58.7 41.9 0 83.5 28 125.4 44.7 41.8 16.6 83.8 22 125.8 30.3s84 19.7 125.8 39.2c41.9 19.5 83.5 47.1 125.4 33.1 41.8-14 83.8-69.6 104.8-97.5l21-27.8v-68l-21 13.8c-21 13.9-63 41.5-104.8 52.5-41.9 11-83.5 5.4-125.4-14.1-41.8-19.5-83.8-52.9-125.8-61.2-42-8.3-84 8.3-125.8 2.8-41.9-5.5-83.5-33.1-125.4-44.1-41.8-11-83.8-5.4-125.8 14.1s-84 52.9-125.8 58.4c-41.9 5.5-83.5-16.9-125.4-8.5C1341 472 1299 511 1257 524.8c-42 13.9-84 2.5-126-11.5s-84-30.6-125.8-36.1c-41.9-5.5-83.5.1-125.4 8.5C838 494 796 505 754 513.3c-42 8.4-84 14-125.8-11-41.9-25-83.5-80.6-125.4-86.1C461 410.7 419 455.3 377 472c-42 16.7-84 5.3-125.8-19.8-41.9-25.2-83.5-64.2-125.4-53C84 410.3 42 471.7 21 502.3L0 533Z"
    />
    <Path
      fill="#002a50"
      d="m0 752 21-36.2c21-36.1 63-108.5 104.8-75.1C167.7 674 209.3 813 251.2 871.5 293 930 335 908 377 858s84-128 125.8-128c41.9 0 83.5 78 125.4 122.5C670 897 712 908 754 905.2c42-2.9 84-19.5 125.8-50.2 41.9-30.7 83.5-75.3 125.4-108.7C1047 713 1089 691 1131 705s84 64 126 72.3c42 8.4 84-25 125.8-22.1 41.9 2.8 83.5 41.8 125.4 47.3C1550 808 1592 780 1634 754.8c42-25.1 84-47.5 125.8-61.3 41.9-13.8 83.5-19.2 125.4-16.3C1927 680 1969 691 2011 710.3c42 19.4 84 47 125.8 83.2 41.9 36.2 83.5 80.8 125.4 67 41.8-13.8 83.8-86.2 104.8-122.3l21-36.2V516l-21 27.8c-21 27.9-63 83.5-104.8 97.5-41.9 14-83.5-13.6-125.4-33.1-41.8-19.5-83.8-30.9-125.8-39.2-42-8.3-84-13.7-125.8-30.3-41.9-16.7-83.5-44.7-125.4-44.7-41.8 0-83.8 28-125.8 58.7-42 30.6-84 64-125.8 69.5-41.9 5.5-83.5-16.9-125.4-22.4-41.8-5.5-83.8 5.9-125.8 3-42-2.8-84-19.8-126-33.8-42-14-84-25-125.8-30.5-41.9-5.5-83.5-5.5-125.4 11.2-41.8 16.6-83.8 50-125.8 69.5s-84 25.1-125.8-8.2c-41.9-33.3-83.5-105.7-125.4-111.2-41.8-5.5-83.8 55.9-125.8 86.5-42 30.7-84 30.7-125.8-5.5-41.9-36.1-83.5-108.5-125.4-103C84 483.3 42 566.7 21 608.3L0 650Z"
    />
    <Path
      fill="#00274b"
      d="m0 1303 21-30.7c21-30.6 63-92 104.8-117 41.9-25 83.5-13.6 125.4 8.7 41.8 22.3 83.8 55.7 125.8 55.7s84-33.4 125.8-55.7c41.9-22.3 83.5-33.7 125.4-17 41.8 16.7 83.8 61.3 125.8 92 42 30.7 84 47.3 125.8 19.5 41.9-27.8 83.5-100.2 125.4-147.5 41.8-47.3 83.8-69.7 125.8-69.7s84 22.4 126 55.7c42 33.3 84 77.7 125.8 127.7 41.9 50 83.5 105.6 125.4 130.8 41.8 25.2 83.8 19.8 125.8-49.7s84-203.1 125.8-261.6c41.9-58.5 83.5-41.9 125.4-36.4 41.8 5.5 83.8-.1 125.8 36 42 36.2 84 114.2 125.8 161.5 41.9 47.4 83.5 64 125.4 16.7 41.8-47.3 83.8-158.7 104.8-214.3l21-55.7V700l-21 36.2c-21 36.1-63 108.5-104.8 122.3-41.9 13.8-83.5-30.8-125.4-67-41.8-36.2-83.8-63.8-125.8-83.2-42-19.3-84-30.3-125.8-33.1-41.9-2.9-83.5 2.5-125.4 16.3-41.8 13.8-83.8 36.2-125.8 61.3-42 25.2-84 53.2-125.8 47.7-41.9-5.5-83.5-44.5-125.4-47.3-41.8-2.9-83.8 30.5-125.8 22.1-42-8.3-84-58.3-126-72.3s-84 8-125.8 41.3c-41.9 33.4-83.5 78-125.4 108.7C838 883.7 796 900.3 754 903.2c-42 2.8-84-8.2-125.8-52.7C586.3 806 544.7 728 502.8 728 461 728 419 806 377 856s-84 72-125.8 13.5C209.3 811 167.7 672 125.8 638.7 84 605.3 42 677.7 21 713.8L0 750Z"
    />
    <Path
      fill="#012545"
      d="M0 1503h21c21 0 63 0 104.8 8.3 41.9 8.4 83.5 25 125.4 33.4 41.8 8.3 83.8 8.3 125.8 2.8 42-5.5 84-16.5 125.8-27.7 41.9-11.1 83.5-22.5 125.4-19.8 41.8 2.7 83.8 19.3 125.8 30.5s84 16.8 125.8 11.3c41.9-5.5 83.5-22.1 125.4-33.3 41.8-11.2 83.8-16.8 125.8-14 42 2.8 84 14.2 126 19.8 42 5.7 84 5.7 125.8 11.2 41.9 5.5 83.5 16.5 125.4 24.8 41.8 8.4 83.8 14 125.8 5.7s84-30.7 125.8-33.5c41.9-2.8 83.5 13.8 125.4 19.3 41.8 5.5 83.8-.1 125.8-22.3s84-60.8 125.8-52.3c41.9 8.5 83.5 64.1 125.4 92C2304 1587 2346 1587 2367 1587h21V950l-21 55.7c-21 55.6-63 167-104.8 214.3-41.9 47.3-83.5 30.7-125.4-16.7C2095 1156 2053 1078 2011 1041.8c-42-36.1-84-30.5-125.8-36-41.9-5.5-83.5-22.1-125.4 36.4-41.8 58.5-83.8 192.1-125.8 261.6-42 69.5-84 74.9-125.8 49.7-41.9-25.2-83.5-80.8-125.4-130.8-41.8-50-83.8-94.4-125.8-127.7s-84-55.7-126-55.7-84 22.4-125.8 69.7c-41.9 47.3-83.5 119.7-125.4 147.5-41.8 27.8-83.8 11.2-125.8-19.5s-84-75.3-125.8-92c-41.9-16.7-83.5-5.3-125.4 17-41.8 22.3-83.8 55.7-125.8 55.7s-84-33.4-125.8-55.7c-41.9-22.3-83.5-33.7-125.4-8.7-41.8 25-83.8 86.4-104.8 117L0 1301Z"
    />
    <Path
      fill="#012240"
      d="M0 1670H2388v-85h-21c-21 0-63 0-104.8-27.8-41.9-27.9-83.5-83.5-125.4-92-41.8-8.5-83.8 30.1-125.8 52.3-42 22.2-84 27.8-125.8 22.3-41.9-5.5-83.5-22.1-125.4-19.3-41.8 2.8-83.8 25.2-125.8 33.5s-84 2.7-125.8-5.7c-41.9-8.3-83.5-19.3-125.4-24.8-41.8-5.5-83.8-5.5-125.8-11.2-42-5.6-84-17-126-19.8-42-2.8-84 2.8-125.8 14-41.9 11.2-83.5 27.8-125.4 33.3-41.8 5.5-83.8-.1-125.8-11.3-42-11.2-84-27.8-125.8-30.5-41.9-2.7-83.5 8.7-125.4 19.8C461 1529 419 1540 377 1545.5s-84 5.5-125.8-2.8c-41.9-8.4-83.5-25-125.4-33.4C84 1501 42 1501 21 1501H0Z"
    />
  </Svg>
)
export default SvgComponent