/* eslint-disable @typescript-eslint/no-empty-function */

import React from "react";

interface IRwdContext {
    device: string
}

const device = window.innerWidth >= 992 ? 'desktop' : 'phone';

export const RwdContext = React.createContext<IRwdContext>({device});