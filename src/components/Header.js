/*
* Imports :
* */
import React, {Component} from 'react';


/*
 * Composant :
 * Haut de page / menu
  * */
class Header extends Component {
    render() {
        return (
            <header className="timer-app__header">
                <h1>Timer react 2.0</h1>
            </header>
        );
    }
}

/*
* Exportation:
* pour utiliser le composant ailleurs
* */
export default Header;