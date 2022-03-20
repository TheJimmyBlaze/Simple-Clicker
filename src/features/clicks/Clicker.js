import { memo } from 'react';

const Clicker = memo(({
    addClicks
}) => {
    return (
        <button className="btn btn-primary rounded-circle"
                style={{width: '128px', height: '128px'}}
                onClick={addClicks}>
            Click
        </button>
    );
});

export default Clicker;