import { useState, useCallback } from 'react';

const sumProducerClicks = (lastSnapshot, clicksPerSecond, count) => {
    let snapshotDelta = new Date(Date.now() - lastSnapshot).valueOf();
    let clickDelta = 1000 / clicksPerSecond;

    return Math.floor(count * (snapshotDelta / clickDelta));
};

export const useProducer = () => {

    const [ producers, setProducers ] = useState([
        { name: 'autoClicker', clicksPerSecond: 0.5, count: 0  }
    ]);

    const addProducer = useCallback(name => {
        
        setProducers(producers.map(producer => {
            if (producer.name === name)
                producer.count++;
        }));
    }, [producers, setProducers]);

    const sumClicks = useCallback(lastSnapshot => {
        
        let runningSum = 0;

        producers.forEach(producer => {
            runningSum += sumProducerClicks(lastSnapshot, producer.clicksPerSecond, producer.count);
        });

        return runningSum;
    }, [producers, sumProducerClicks]);

    return [ producers, addProducer, sumClicks];
};