interface Event {
    courseId: string;
    day: number;
    startTime: string;
    endTime: string;
    color?: string;
    title?: string;
    location?: string;
    section?: string;
    groupIndex?: number;
}
interface Events {
    startTimes: string[];
    endTimes: string[];
    days: number[];
    locations: string[];
}
interface Sections {
    [section: string]: Events;
}
interface EventGroup {
    courseId: string;
    sections: Sections;
    title?: string;
}
interface Configs {
    startHour: number;
    endHour: number;
    numOfHours: number;
    cellWidth: number;
    cellHeight: number;
    numOfDays: number;
    numOfDaysPerPage: number;
    timeTicksWidth: number;
}
export { EventGroup, Events, Event, Configs };
