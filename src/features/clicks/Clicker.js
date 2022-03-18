import { memo } from 'react';

const Clicker = memo(({
    addClicks
}) => {

    const doClick = () => addClicks();

    return (
        <button className="btn btn-primary"
                onClick={doClick}>
            Click
        </button>
    );
});

export default Clicker;