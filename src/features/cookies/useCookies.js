import { useCallback } from 'react';
import moment from 'moment';
import Cookies from 'universal-cookie';

export const useCookies = saveStateName => {

    const cookies = new Cookies();

    const setSaveState = useCallback(saveState => (
        cookies.set(saveStateName, 
            JSON.stringify(saveState), 
            {
                path: '/', 
                expires: moment().add(1, 'year').toDate(),
                sameSite: 'strict'
            }
        )
    ), [cookies, saveStateName]);

    const getSaveState = useCallback(() => (
        cookies.get(saveStateName)
    ), [cookies, saveStateName]);

    return [setSaveState, getSaveState];
}