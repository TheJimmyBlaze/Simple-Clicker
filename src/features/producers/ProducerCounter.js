import { memo } from 'react';

const ProducerCounter = memo(({
    producer
}) => {

    return(
        <label>
            <i class={`bi ${producer.icon}`}></i> {`${producer.displayName}: ${producer.count}`}
        </label>
    );
});

export default ProducerCounter;