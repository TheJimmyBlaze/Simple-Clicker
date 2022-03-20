import { useRef, useEffect } from 'react';
import { useClickKeeper } from './features/clicks/useClickKeeper';
import { useProducer } from './features/producers/useProducer';
import ClickCounter from './features/clicks/ClickCounter';
import Clicker from './features/clicks/Clicker';

const refreshPerSecond = 10;

const App = () => {
 
    const [lastSnapshot, clicks, makeSnapshot] = useClickKeeper();
    const [producers, addProducer, sumClicks] = useProducer();

    useEffect(() => {
        const refreshInterval = setInterval(() => {
            makeSnapshot(sumClicks(lastSnapshot) + clicks);
        }, 1000 / refreshPerSecond);

        return () => clearInterval(refreshInterval);
    }, [clicks, lastSnapshot, refreshPerSecond]);
 
    return (
        <div className="d-flex flex-column vw-100 vh-100 bg-dark align-items-center justify-content-center">
            <Clicker addClicks={() => makeSnapshot(clicks + 1)}/>
            <ClickCounter clicks={clicks}/>
        </div>
    );
};

export default App;