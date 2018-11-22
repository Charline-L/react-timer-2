/*
* Imports :
* */
import React, {Component} from 'react'
import more from '../icons/more.svg'

/*
 * Composant :
 * Bas de page pour noter les crédits
  * */
class Add extends Component {

    static submit(event) {
        // pour en pas envoyer le formulaire
        event.preventDefault();

        // récupère les valeurs
        const $inputTime = document.getElementById("js-input-time");
        const time = $inputTime.value.trim();

        const $inputLabel = document.getElementById("js-input-label");
        const label = $inputLabel.value.trim();
    }

    render() {

        return (
            <form onSubmit={Add.submit.bind(this)} className="timer-app__add">

                <input id="js-input-timer" type="text" placeholder="00:00"/>
                <input id="js-input-label" type="text" placeholder="nom"/>

                <button type="submit">
                    <img src={more} alt="Ajouter un timer"/>
                </button>

            </form>
        );
    }
}

/*
* Exportation:
* pour utiliser le composant ailleurs
* */
export default Add;
