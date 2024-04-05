import React, { FC, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Configs } from '../types';
import { ConfigsContext } from './TimeTable';

const TimeTableTicks: FC = () => {
  const configs = useContext(ConfigsContext);
  const { startHour, endHour } = configs;
  const styles = getStyles(configs);
  return (
    <View style={styles.timeTableTicks}>
      {Array.from(
        { length: endHour - startHour + 1 },
        (_, i) => startHour + i
      ).map((hour) => (
        <View style={styles.timeLineBox} key={`timeline-${hour}`}>
          {hour !== startHour && (
            <Text style={styles.timeLineText}>{`${
              hour > 9 ? '' + hour.toFixed(0) : '0' + hour.toFixed(0)
            }:00`}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

const getStyles = (configs: Configs) =>
  StyleSheet.create({
    timeTableTicks: {
      marginTop: -12,
      width: configs.timeTicksWidth,
      minWidth: configs.timeTicksWidth,
    },
    timeLineText: {
      marginTop: 1,
      fontSize: 13,
      textAlign: 'center',
      color: 'black',
    },
    timeLineBox: {
      paddingLeft: 2,
      height: configs.cellWidth,
      backgroundColor: 'transparent',
    },
  });

export default TimeTableTicks;
