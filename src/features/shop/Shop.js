import { memo } from 'react';
import ShopCard from './ShopCard';

const Shop = memo(({
    clicks,
    producers,
    addProducer,
    spendClicks
}) => {

    return(
        <section className="mx-4"
            style={{width: '350px'}}>
            {
                producers.map(producer => (
                    <ShopCard key={producer.name}
                        clicks={clicks}
                        producer={producer}
                        addProducer={addProducer}
                        spendClicks={spendClicks} 
                    />
                ))
            }
        </section>
    );
});

export default Shop;