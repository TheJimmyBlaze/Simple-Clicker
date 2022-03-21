import { memo } from 'react';
import ClickCounter from './ClickCounter';

const Clicker = memo(({
    clicks,
    addClicks
}) => {
    return (
        <section className="d-flex flex-column align-items-center justify-content-center mx-4">
            <button className="btn btn-primary rounded-circle my-4"
                style={{width: '128px', height: '128px'}}
                onClick={addClicks}>
                Click
            </button>

            <ClickCounter clicks={clicks}/>
        </section>
    );
});

export default Clicker;