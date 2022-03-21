import { useState, useRef, useCallback } from 'react';
import { useCookies } from '../cookies/useCookies';

export const useClicks = () => {

    const [setSaveState, getSaveState] = useCookies('clicks');    
    const [clicks, setClicks] = useState(0);

    let lastSnapshot = useRef(Date.now());

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

    const createSaveState = useCallback(() => {
        setSaveState({
            clicks,
            lastSnapshot: lastSnapshot.current
        });
    }, [clicks, lastSnapshot, setSaveState]);

    const loadFromSaveState = useCallback(() => {
        const saveState = getSaveState();

        if (saveState) {
            lastSnapshot.current = saveState.lastSnapshot;
            setClicks(saveState.clicks);
        }
    }, [clicks, lastSnapshot, getSaveState]);
    
    return [ lastSnapshot.current, clicks, addClicks, spendClicks, makeSnapshot, createSaveState, loadFromSaveState ];
};