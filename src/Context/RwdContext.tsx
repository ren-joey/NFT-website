/* eslint-disable @typescript-eslint/no-empty-function */

import React from "react";

export type DeviceString = 'desktop'|'phone';

interface IRwdContext {
    device: DeviceString
}

const device = window.innerWidth >= 992 ? 'desktop' : 'phone';

export const RwdContext = React.createContext<IRwdContext>({device});