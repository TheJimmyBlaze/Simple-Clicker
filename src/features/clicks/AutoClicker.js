import { memo, useRef, useState, useEffect, useCallback } from 'react';
import moment from 'moment';

const convertClicksPerSecond = clicksPerSecond => 60000 / clicksPerSecond;

const AutoClicker = memo(({
    clicksPerSecond = 20,
    offsetDelay = 200,
    offset = 0,
    addClicks
}) => {

    let clickInterval = useRef(0);
    let doingClickTimeout = useRef(0);

    const [doingClick, setDoingClick] = useState(false);

    const bindClicker = useCallback(() => {
        clickInterval = setInterval(() => {

            addClicks();
            setDoingClick(moment());

            setDoingClick(true);
            doingClickTimeout = setTimeout(() => setDoingClick(false), offsetDelay);

        }, convertClicksPerSecond(clicksPerSecond));
    }, []);

    useEffect(() => {
        const bindTimeout = setTimeout(() => bindClicker(), 1000 - moment().milliseconds() + offset * offsetDelay);
        return () => clearTimeout(bindTimeout);
    }, [bindClicker]);

    useEffect(() => () => {
        clearInterval(clickInterval.current);
        clearTimeout(doingClickTimeout.current);
    }, [clickInterval]);

    return(
        <span className="badge">
            { 
                doingClick ?
                <i className="bi bi-hand-index-fill text-primary" /> :
                <i className="bi bi-hand-index text-muted" />
            }
        </span>
    );
});

export default AutoClicker;