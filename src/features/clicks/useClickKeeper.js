import { useState, useRef, useCallback } from 'react';

export const useClickKeeper = () => {

    let lastSnapshot = useRef(Date.now());
    
    const [clicks, setClicks] = useState(0);

    const makeSnapshot = useCallback(count => {
        lastSnapshot.current = Date.now();
        setClicks(count);
    }, [lastSnapshot, clicks]);
    
    return [ lastSnapshot.current, clicks, makeSnapshot ];
};