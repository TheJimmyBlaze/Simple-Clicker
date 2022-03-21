import { useState, useCallback } from 'react';
import { useCookies } from '../cookies/useCookies';

const priceMultiplier = 0.05;

const createProducer = (name, displayName, icon, clicksPerSecond, basePrice) => {

    return {
        name,
        displayName,
        icon,
        clicksPerSecond,
        count: 0,
        basePrice,
        price: basePrice
    };
}

const calculateProducerCost = (count, basePrice) => {
    const exponent = 1 + count * priceMultiplier;
    return Math.floor(Math.pow(basePrice, exponent));
};

const sumProducerClicks = (lastSnapshot, clicksPerSecond, count) => {
    let snapshotDelta = new Date(Date.now() - lastSnapshot).valueOf();
    let clickDelta = 1000 / clicksPerSecond;

    return Math.floor(count * (snapshotDelta / clickDelta));
};

export const useProducer = () => {

    const [setSaveState, getSaveState] = useCookies('producers');   

    const [ producers, setProducers ] = useState([
        createProducer('autoClicker', 'Auto Clicker', 'bi-cursor', 0.5, 100),
        createProducer('mouse', 'Mouse', 'bi-mouse', 5, 1000),
        createProducer('macro', 'Macro', 'bi-code', 10, 12000)
    ]);

    const addProducer = useCallback(name => {
        
        setProducers(producers.map(producer => {

            if (producer.name === name) {
                let newProducer = {...producer};
                newProducer.count ++;
                newProducer.price = calculateProducerCost(newProducer.count, producer.basePrice);
                return newProducer;
            }

            return producer;
        }));
    }, [producers, setProducers]);

    const sumClicks = useCallback(lastSnapshot => {
        
        let runningSum = 0;

        producers.forEach(producer => {
            runningSum += sumProducerClicks(lastSnapshot, producer.clicksPerSecond, producer.count);
        });

        return runningSum;
    }, [producers, sumProducerClicks]);

    const createSaveState = useCallback(() => {
        setSaveState(producers);
    }, [producers, setSaveState]);

    const loadFromSaveState = useCallback(() => {
        const saveState = getSaveState();

        if (saveState) {
            setProducers(saveState);
        }
    }, [producers, getSaveState]);

    return [ producers, addProducer, sumClicks, createSaveState, loadFromSaveState];
};