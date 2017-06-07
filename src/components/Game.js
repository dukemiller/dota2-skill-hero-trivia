import React from 'react';
import { GuessView, AbilityIcon } from './';
import { Hero, Ability } from '../models';

const server = "https://dota2-skill-hero-api.herokuapp.com";

export class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            correct: 0,
            total: 0,
            imgLoaded: () => {}
        }
    }

    componentDidMount() {
        this.setupGame();
    }

    setupGame() {
        fetch(`${server}/random_ability`)
            .then(ability => ability.json())
            .then(ability => fetch(`${server}/heroes/${ability.hero}`)
                .then(heroes => heroes.json())
                .then(heroes => {
                    heroes.push(new Hero(ability.hero));
                    heroes = shuffle(heroes);
                    this.setState({
                        ability: ability,
                        displayAnswer: false,
                        imgLoaded: () => {
                            this.setState({
                                heroes: heroes,
                                response: "",
                            });
                        }
                    })
                }));
    }

    reveal(selectedHero) {
        if (this.state.response.length === 0) {
            let correct = selectedHero.name === this.state.ability.hero;

            if (correct)
                this.setState({
                    correct: this.state.correct + 1
                });

            let response = correct ? "Correct." : "Wrong.";

            this.setState({ 
                displayAnswer : true,
                response: response,
                total: this.state.total + 1
            }, () => {
                setTimeout(() => {
                    this.setupGame();
                }, 
            1000);
            });
        }
    }

    loadingView() {
        return (
                <div>
                    Loading ... 
                </div>
            );
    }

    bottomView() {
        if (this.state.total > 0) {
            return (
                <div>
                    <p> { `${this.state.correct}/${this.state.total}` } </p>
                    <p> {this.state.response} </p>
                </div>
            );
        }

        else
            return (
                <div />
            );
    }

    mainView() {
        return (
                <div>
                    <div style={ style }>
                        <AbilityIcon 
                            imgLoaded = { this.state.imgLoaded }
                            server    = { server }
                            ability   = { this.state.ability } />
                        <GuessView 
                                displayAnswer = { this.state.displayAnswer }
                                ability       = { this.state.ability }
                                onClick       = { this.reveal.bind(this) } 
                                heroes        = { this.state.heroes } 
                        />
                    </div>

                    { this.bottomView() }
                    
                </div>
            );
    }

    render() {
        if (this.state.ability == null)
            { return this.loadingView(); }
        else
            { return this.mainView(); }
    }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

let style = { 
    flexDirection: 'row', display:'flex', flex:'1',             
    justifyContent:'center', height: '256px', margin: '1em', 
    padding: '1em' 
};