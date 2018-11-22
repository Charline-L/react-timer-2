// react
import React, {Component} from 'react';

// css
import '../css/timer-app.css';
import '../css/timer-item.css';

// composants
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';


/* Composant principal contenant la page*/
class App extends Component {
    render() {
        return (
            <div className="timer-app__wrapper">
                <Header/>
                <Main/>
                <Footer/>
            </div>
        );
    }
}

export default App;
