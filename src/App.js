import { useEffect } from 'react';
import { useClicks } from './features/clicks/useClicks';
import { useProducer } from './features/producers/useProducer';
import Clicker from './features/clicks/Clicker';
import Shop from './features/shop/Shop';

const refreshPerSecond = 10;

const App = () => {
 
    const [lastSnapshot, clicks, addClicks, spendClicks, makeSnapshot, saveClicks, loadClicks] = useClicks();
    const [producers, addProducer, sumClicks, saveProducers, loadProducers] = useProducer();

    useEffect(() => {
        loadClicks();
        loadProducers();
    }, [])

    useEffect(() => {
        saveClicks();
    }, [saveClicks])

    useEffect(() => {
        saveProducers();
    }, [saveProducers])

    useEffect(() => {
        const refreshInterval = setInterval(() => {
            makeSnapshot(sumClicks(lastSnapshot) + clicks);
        }, 1000 / refreshPerSecond);

        return () => clearInterval(refreshInterval);
    }, [refreshPerSecond, clicks, lastSnapshot]);
 
    return (
        <div className="d-flex vw-100 vh-100 bg-dark text-muted align-items-center justify-content-center">

            <div className="d-flex">
                <Clicker clicks={clicks}
                    addClicks={() => addClicks(1)}
                />
                <div className="vr" />
                <Shop clicks={clicks}
                    producers={producers}
                    addProducer={addProducer}
                    spendClicks={spendClicks}
                />
            </div>
        </div>
    );
};

export default App;