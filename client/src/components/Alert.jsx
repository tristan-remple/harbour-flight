import React from 'react';

export default function Alert({ message, type }) {
    // console.log(message);
    if (typeof message === "string") {
        return (
            <div className={`alert alert-${type}`}>
                {message}
            </div>
        )
    } else {
        return;
    }
}