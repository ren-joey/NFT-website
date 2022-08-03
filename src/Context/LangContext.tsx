import React from 'react';
import { Lang } from 'src/lang';
import ZH_TW from 'src/lang/ZH_TW';

export const LangContext = React.createContext<Lang>({...ZH_TW});