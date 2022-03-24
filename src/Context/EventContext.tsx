/* eslint-disable @typescript-eslint/no-empty-function */

import moment from "moment";
import React from "react";
import { LangString } from "src/lang";
import { getParameterByName } from "src/utils";

export type DeviceString = 'desktop'|'phone';

export interface ICounter {
    days: string,
    hours: string,
    minutes: string,
    seconds: string
}

export interface IEventContext {
    selectedLang: LangString,
    setSelectedLang: (key: LangString) => void,
    device: DeviceString,
    status: number,
    setStatus: (key: number) => void,
    counter: ICounter,
    setCounter: (key: ICounter) => void,
    end: moment.Moment,
    setEnd: (key: moment.Moment) => void,
    diff: number,
    setDiff: (key: number) => void,
    [key: string]: any
}

export const defaultEventContext: IEventContext = {
    selectedLang: getParameterByName('lang') as LangString
    || localStorage.getItem('lang') as LangString
    || 'ZH_TW',
    setSelectedLang: () => {},
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
    setEnd: () => {},
    diff: 0,
    setDiff: () => {}
};

export const EventContext = React.createContext<IEventContext>(defaultEventContext);