import React from 'react';

// alert is the "flash message" that displays when a user signs in, registers, or fails to do one of those things
export default function Alert({ message, type }) {

    // it's always called, but only returns jsx if the message type is a string
    // it can show as a bootstrap alert-warning or alert-success depending on what's needed
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