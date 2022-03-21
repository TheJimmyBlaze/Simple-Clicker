import { memo } from 'react';

const ClickCounter = memo(({
    clicks
}) => {

    return (
        <h4>{clicks}</h4>
    );
});

export default ClickCounter;