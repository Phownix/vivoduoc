import React, { FC } from 'react';
import { ViewStyle } from 'react-native';
import { THEME } from '../utils/constants';
import type { Configs, EventGroup, Event } from '../types';
declare type TimeTableProps = {
    events?: Event[];
    eventGroups?: EventGroup[];
    eventOnPress?: (...args: any[]) => any;
    eventColors?: string[];
    configs?: Partial<Configs>;
    headerStyle?: ViewStyle;
    disableHeader?: boolean;
    disableTicker?: boolean;
    contentContainerStyle?: ViewStyle;
    theme?: Partial<typeof THEME>;
};
export declare const ThemeContext: React.Context<{
    primary: string;
    accent: string;
    background: string;
    text: string;
}>;
export declare const ConfigsContext: React.Context<Configs>;
declare const TimeTable: FC<TimeTableProps>;
export default TimeTable;
