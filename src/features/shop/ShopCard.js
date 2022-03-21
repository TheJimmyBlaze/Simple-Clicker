import { memo } from 'react';
import ProducerCounter from '../producers/ProducerCounter';

const ShopCard = memo(({
    clicks,
    producer,
    addProducer,
    spendClicks
}) => {

    const buyProducer = () => {
        spendClicks(producer.price);
        addProducer(producer.name);
    };

    const canBuyProducer = () => (
        clicks >= producer.price
    );

    return(
        <article className="d-flex align-items-center w-100 p-1">
            <ProducerCounter producer={producer} />
            <button className="btn btn-primary ms-auto"
                style={{width: '100px'}}
                disabled={!canBuyProducer()}
                onClick={buyProducer}>
                {producer.price}
            </button>
        </article>
    )
});

export default ShopCard;