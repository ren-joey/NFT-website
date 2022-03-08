/* eslint-disable @typescript-eslint/no-empty-function */

import moment from "moment";
import React from "react";

export type DeviceString = 'desktop'|'phone';

export interface ICounter {
    days: string,
    hours: string,
    minutes: string,
    seconds: string
}

export interface IEventContext {
    device: DeviceString,
    status: number,
    setStatus: (key: number) => void,
    counter: ICounter,
    setCounter: (key: ICounter) => void,
    end: moment.Moment,
    setEnd: (key: moment.Moment) => void
}

export const defaultEventContext: IEventContext = {
    device: 'desktop',
    status: -1,
    setStatus: () => {},
    counter: {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    },
    setCounter: () => {},
    end: moment(),
    setEnd: () => {}
};

export const EventContext = React.createContext<IEventContext>(defaultEventContext);