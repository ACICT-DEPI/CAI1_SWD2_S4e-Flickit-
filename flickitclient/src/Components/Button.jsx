import React from 'react';

function Button({ style, text, onClick }) {
    return (
        <button className={style} onClick={onClick}>
            {text}
        </button>
    );
}

export default Button;
