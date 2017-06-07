import React from 'react';
import { Guess } from './'
import { ColorPair } from '../models'

export let GuessView = ({ heroes, ability, onClick, displayAnswer }) => 
    <div style={style}>
        { createGuesses(heroes, ability, onClick, displayAnswer) }
    </div>;

// 

function getColor(displayAnswer, ability, hero) {
    if (displayAnswer === true) { 
        if (ability.hero === hero.name)
            return new ColorPair("lightgreen", "lime");
        else
            return new ColorPair('gray', 'black');
    }

    else {
        return new ColorPair('lightblue', 'blue');
    }
}

function createGuesses(heroes, ability, onClick, displayAnswer) {
    let i = 0;
    return heroes.map(hero => {
        let color = getColor(displayAnswer, ability, hero);
        return <Guess color   = { color } 
                      hero    = { hero } 
                      key     = { i++ } 
                      onClick = { onClick } />
    });
}


let style = { 
    marginLeft: '1em',       display: 'flex', 
    alignItems: 'stretch',   width: '50em', 
    flexDirection: 'column', justifyContent: 'space-around'
};
