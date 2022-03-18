import { useClickKeeper } from './features/clicks/useClickKeeper';
import ClickCounter from './features/clicks/ClickCounter';
import Clicker from './features/clicks/Clicker';
import AutoClicker from './features/clicks/AutoClicker';

const App = () => {
 
    const [clicks, addClicks, setClicksPerClick] = useClickKeeper();
 
    return (
        <div className="d-flex flex-column vw-100 vh-100 bg-dark align-items-center justify-content-center">
            <ClickCounter clicks={clicks}/>
            <Clicker addClicks={addClicks}/>

            <section className="d-flex flex-row flex-wrap"
                    style={{width: '16em'}}>
                {
                    [...Array(60).keys()].map(index => (
                        <AutoClicker key={index} offset={index} addClicks={addClicks}/>
                    ))
                }
            </section>
        </div>
    );
};

export default App;