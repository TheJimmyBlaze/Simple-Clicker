import { useRef, useCallback } from 'react';
import moment from 'moment';
import Cookies from 'universal-cookie';

const minutesBetweenSaves = 0.5;

export const useCookies = (saveStateName) => {

    let lastUpdateTime = useRef(moment());
    const cookies = new Cookies();

    const setSaveState = useCallback(saveState => {

        const nextSaveTime = moment(lastUpdateTime.current).add(minutesBetweenSaves, 'minutes');
        console.log(moment());
        console.log(nextSaveTime);
        if (moment() < nextSaveTime) {
            return;
        }

        console.log('save');
        lastUpdateTime.current = Date.now();
        cookies.set(saveStateName, 
            JSON.stringify(saveState), 
            {
                path: '/', 
                expires: moment().add(1, 'year').toDate(),
                sameSite: 'strict'
            }
        )
    }, [cookies, lastUpdateTime, saveStateName, minutesBetweenSaves]);

    const getSaveState = useCallback(() => (
        cookies.get(saveStateName)
    ), [cookies, saveStateName]);

    return [setSaveState, getSaveState];
}