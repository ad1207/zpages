import {proxy} from 'valtio';

export const section = proxy({
    currentSection: null,
    isEdit: false,
    mode: ""
});

