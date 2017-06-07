import React from 'react';

export let Guess = ({color, hero, onClick}) => {
    return (
        <div 
            onClick = {() => onClick(hero)} 
            style   = {{ backgroundColor: color.softColor,
                         borderLeftStyle: "solid",
                         borderLeftColor: color.hardColor,
                         padding: '1em', 
                         fontWeight: 'bold' }}>
            {hero.name}
        </div>
    )
}