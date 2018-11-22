/*
* Imports :
* */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import more from "../icons/more.svg";
import pause from "../icons/pause.svg";
import play from "../icons/play.svg";


/*
* Pour gérer les couleur dynamiquement
* */
const colors = ["#f6bd60", "#f5cac3", "#84a59d", "#f28482"]
const colorsDarker = ["#e6b15c", "#e6beb8", "#78948e", "#e07b79"]
let currentColor = -1


/*
* Composants:
* interface d'ajout de timer
* */
class Timer extends Component{
    constructor(props) {
        super(props)

        // récupère chaine de caractères avant :
        const indexOfSeparator = props.time.indexOf(":")

        // récupère entités
        const minutes = Number(props.time.slice(0, indexOfSeparator))
        const secondes = Number(props.time.slice(-indexOfSeparator))

        // enregistre le temps total
        this.timeTotal = (minutes * 60) + secondes

        // enregistrer dans le statut
        this.state = {
            time: this.timeTotal,
            paused: false
        }

        // enregistre le label
        this.label = props.label

        // enregistre l'index
        this.index = props.index
    }

    componentDidMount() {

        // lance le timer
        this.timer = setInterval(
            this.tick.bind(this),
            1000
        );

        // récupère le container du timer
        this.$progress = ReactDOM.findDOMNode(this).querySelector(".timer-item__progress")
    }

    tick() {

        // vérifie que le timer n'est pas en pause
        if (this.state.paused) return null;

        // affichage visuel
        this.progressCSS()

        // vérifie si le timer n'est pas fini
        if (this.state.time <= 0) this.endTimer()
        else this.continueTimer()
    }

    progressCSS() {

        // augmente la progression
        const percent = ((this.timeTotal - this.state.time + 2 )* 100 ) / this.timeTotal > 100 ? 100 : ((this.timeTotal - this.state.time + 2 )* 100 ) / this.timeTotal;

        this.$progress.style.width = percent + "%";
    }

    continueTimer() {

        // change l'état
        this.setState({
            time: this.state.time - 1
        })
    }

    endTimer() {

        // arrête l'interval
        clearInterval(this.timer)
    }

    pauseTimer() {

        this.setState({
            paused: !this.state.paused
        })
    }

    render() {

        // calcule les minutes et secondes à afficher
        let minutes = Math.trunc(this.state.time / 60) > 9 ? Math.trunc(this.state.time / 60) : "0" + Math.trunc(this.state.time / 60);
        let secondes = this.state.time % 60 >= 10 ? this.state.time % 60 : "0" + this.state.time % 60;

        return (
            <li className="timer-item" style={{backgroundColor: colors[this.index]}}>

                <div className="timer-item__progress" style={{backgroundColor: colorsDarker[this.index]}}>

                </div>

                <div className="timer-item__infos">
                    <p className="timer-item__label">{this.state.time > 0 ? "à faire" : "fini"}</p>
                    <p className="timer-item__title">{this.label}</p>
                </div>

                <div className="timer-item__chrono" style={{display: this.state.time > 0 ? "flex" : "none"}} >
                    <p className="timer-item__time">{minutes} : {secondes}</p>
                    <img onClick={this.pauseTimer.bind(this)} className="timer-item__icon" src={this.state.paused ? play : pause} alt="Icone pause"/>
                </div>

            </li>
        )
    }
}


const TimerList = ({items}) => (

    <ul className="timer-app__list">

        {items.map( item => <Timer time={item.time} label={item.label} index={currentColor}/>)}

    </ul>

);

class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            items: [],
        }
    }

    submit (event) {

        // pour en pas envoyer le formulaire
        event.preventDefault();

        // récupère nos valeurs
        const time= document.getElementById("js-input-time").value.trim()
        const label= document.getElementById("js-input-label").value.trim()

        // vérifie si non vide
        if ( time.length < 1 || label.length < 1 ) return null;

        // vérifie si bien :
        if ( time.indexOf(":") < 0 ) return null;

        // créer notre nouvel objet timer
        const newTimer = { time: time, label: label}

        // ajoute timer à la liste
        this.setState({
            items: [ ...this.state.items, newTimer ],
        })

        // efface l'input
        document.getElementById("js-input-time").value = ""
        document.getElementById("js-input-label").value = ""

        // incrémente l'index pour la couleur
        currentColor = currentColor < colorsDarker.length - 1 ? currentColor + 1 : 0
    }

    watcherTimer(event) {

        // vérifie que ce n'est pas la touche effacer
        if (event.keyCode === 8 || event.keyCode === 46) return null;

        if (document.getElementById("js-input-time").value.length === 2) document.getElementById("js-input-time").value += ":"
    }

    render() {
        return (
            <main className="timer-app__container">

                <form onSubmit={this.submit.bind(this)} className="timer-app__add">

                    <input id="js-input-label" className="timer-app__input-label"  type="text" placeholder="quoi"/>
                    <input id="js-input-time" onKeyUp={this.watcherTimer.bind(this)} className="timer-app__input-timer" type="text" placeholder="00:00"/>

                    <button type="submit" className="timer-app__submit">
                        <img className="timer-app__icon" src={more} alt="Ajouter un timer"/>
                    </button>

                </form>

                <TimerList items={this.state.items}/>

            </main>
        );
    }
}

/*
* Exportation:
* pour utiliser le composant ailleurs
* */
export default Main;