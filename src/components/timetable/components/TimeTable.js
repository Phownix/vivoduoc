import React, { createContext, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import EventCard from './EventCard';
import TimeIndicator from './TimeIndicator';
import { EVENT_COLORS, THEME } from '../utils/constants';
import TimeTableTicks from './TimeTableTicks';
import WeekdayText from './WeekdayText';
import getEventsFromGroup from '../utils/getEventsFromGroup';
import TimeTableGrid from './TimeTableGrid';
import getConfigs from '../utils/getConfigs';
export const ThemeContext = createContext(null);
export const ConfigsContext = createContext(null);
const TimeTable = ({ events, eventGroups, eventOnPress, headerStyle, disableHeader, disableTicker, contentContainerStyle, eventColors = EVENT_COLORS, configs: propConfigs, theme: propTheme, }) => {
    const weekdayScrollRef = useRef(null);
    const courseHorizontalScrollRef = useRef(null);
    const courseVerticalScrollRef = useRef(null);
    const theme = Object.assign(Object.assign({}, THEME), propTheme);
    let configs = getConfigs(propConfigs);
    const onHorizontalScroll = (e) => {
        if (disableHeader)
            return;
        weekdayScrollRef.current.scrollTo({
            x: e.nativeEvent.contentOffset.x,
            animated: false,
        });
    };
    const currentDay = new Date();
    const currentWeekday = currentDay.getDay() ? currentDay.getDay() : 7;
    let weekendEvent = currentWeekday > 5; // Auto horizontal scroll if isWeekend and has weekendEvent
    let earlistGrid = configs.numOfHours; // Auto vertical scroll to earlistGrid
    // Parse eventGroups to events
    if (eventGroups) {
        const parsed = getEventsFromGroup({
            eventGroups,
            eventColors,
            configs,
        });
        events = parsed.events;
        configs = parsed.configs;
        configs.numOfHours = configs.endHour - configs.startHour + 1;
        earlistGrid = parsed.earlistGrid || earlistGrid;
        weekendEvent = weekendEvent && parsed.configs.numOfDays > 5;
    }
    const { cellWidth, cellHeight, timeTicksWidth, numOfHours } = configs;
    const styles = getStyles({ timeTicksWidth, theme });
    return (<ConfigsContext.Provider value={configs}>
      <ThemeContext.Provider value={theme}>
        <View style={contentContainerStyle}>
          {!disableHeader && (<View style={[styles.weekdayRow, headerStyle]}>
              <View style={styles.placeholder}/>
              <ScrollView scrollEnabled={false} ref={weekdayScrollRef} horizontal showsHorizontalScrollIndicator={false}>
                <WeekdayText />
              </ScrollView>
            </View>)}
          <ScrollView ref={courseVerticalScrollRef} contentContainerStyle={styles.courseContainer} showsVerticalScrollIndicator={false} onContentSizeChange={() => {
            var _a;
            if (earlistGrid !== numOfHours) {
                (_a = courseVerticalScrollRef === null || courseVerticalScrollRef === void 0 ? void 0 : courseVerticalScrollRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo({
                    y: earlistGrid * cellHeight,
                });
            }
        }}>
            <TimeTableTicks />
            <ScrollView horizontal onScroll={onHorizontalScroll} scrollEventThrottle={16} ref={courseHorizontalScrollRef} contentContainerStyle={styles.courseList} showsHorizontalScrollIndicator={false} onContentSizeChange={() => {
            var _a;
            weekendEvent &&
                ((_a = courseHorizontalScrollRef === null || courseHorizontalScrollRef === void 0 ? void 0 : courseHorizontalScrollRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo({
                    x: 2 * cellWidth,
                }));
        }}>
              <TimeTableGrid />
              {!disableTicker && <TimeIndicator />}
              {events.map((event, i) => (<EventCard key={`${event.courseId}-${i}-${event.day}`} event={Object.assign(Object.assign({}, event), { color: event.color || eventColors[i % eventColors.length] })} onPress={eventOnPress && (() => eventOnPress(event))} backgroundColor={(contentContainerStyle === null || contentContainerStyle === void 0 ? void 0 : contentContainerStyle.backgroundColor) || theme.background}/>))}
            </ScrollView>
          </ScrollView>
        </View>
      </ThemeContext.Provider>
    </ConfigsContext.Provider>);
};
const getStyles = ({ timeTicksWidth, theme }) => StyleSheet.create({
    weekdayRow: {
        flexDirection: 'row',
        height: 32,
        backgroundColor: theme.primary,
    },
    placeholder: {
        width: timeTicksWidth,
    },
    courseContainer: {
        flexDirection: 'row',
        backgroundColor: theme.background,
        width: '100%',
    },
    courseList: {
        flexDirection: 'column',
    },
});
export default TimeTable;
