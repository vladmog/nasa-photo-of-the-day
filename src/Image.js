import React from 'react';

function Image(props) {
    return (
        <div>
            <img className = "mainImg" src = {props.image} alt = ""/>
        </div>
    )
}

export default Image;