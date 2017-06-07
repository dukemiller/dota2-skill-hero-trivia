import React from 'react';

export let AbilityIcon = ({server, ability, imgLoaded}) => (
    <div style={{ backgroundColor: 'gray', 
                  display: 'flex', 
                  justifyContent: 'center' }}>
        <img 
             onLoad = { imgLoaded } 
             alt    = 'this is a visual game dummy' 
             style  = {{ width:'256px', height:'256px' }} 
             src    = { `${server}/${ability.icon}` } />
    </div>
);
