import { memo } from 'react';

const ClickCounter = memo(({
    clicks
}) => {

    return (
        <h4 className="text-muted">
            { clicks }
        </h4>
    );
});

export default ClickCounter;