import { useState, useRef, useCallback } from 'react';

export const useClickKeeper = () => {

    let clicksPerClick = useRef(1);
    const [clicks, setClicks] = useState(0);

    const addClicks = useCallback(() => (
        setClicks(prev => prev + clicksPerClick.current)
    ), [clicks, clicksPerClick]);

    const setClicksPerClick = useCallback(count => (
        clicksPerClick.current = count
    ), [clicksPerClick]);
        
    return [ clicks, addClicks, setClicksPerClick ];
};