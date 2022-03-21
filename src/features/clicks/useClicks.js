import { useState, useRef, useCallback } from 'react';

export const useClicks = () => {

    let lastSnapshot = useRef(Date.now());
    
    const [clicks, setClicks] = useState(0);

    const makeSnapshot = useCallback(total => {
        lastSnapshot.current = Date.now();
        setClicks(total);
    }, [lastSnapshot, clicks]);

    const addClicks = useCallback(count => (
        makeSnapshot(clicks + count)
    ), [clicks]);

    const spendClicks = useCallback(count => (
        makeSnapshot(clicks - count)
    ), [clicks]);
    
    return [ lastSnapshot.current, clicks, addClicks, spendClicks, makeSnapshot ];
};