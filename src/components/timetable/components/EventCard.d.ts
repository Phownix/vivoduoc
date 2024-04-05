import { FC } from 'react';
import type { Event } from '../types';
declare type EventCardProps = {
    event: Event;
    backgroundColor: string;
    onPress?: (...args: any[]) => any;
};
declare const EventCard: FC<EventCardProps>;
export default EventCard;
