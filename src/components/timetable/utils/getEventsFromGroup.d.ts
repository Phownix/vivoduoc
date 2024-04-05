import type { EventGroup, Event, Configs } from '../types';
declare type GroupToEventsProps = {
    eventGroups: EventGroup[];
    eventColors: string[];
    configs: Configs;
};
declare type GroupToEventsReturns = {
    events: Event[];
    configs: Configs;
    earlistGrid: number;
};
declare const groupToEvents: ({ eventGroups, eventColors, configs, }: GroupToEventsProps) => GroupToEventsReturns;
export default groupToEvents;
