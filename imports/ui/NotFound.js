import React from 'react';
import {Link} from 'react-router';

export default () => {
    return (
    <div className="boxed-view">
        <div className="boxed-view__box">
            <h1>404 - Page Not Found</h1>
            <p>Hmmm, we're unable to find that page.</p>
            <Link to="/" className="button button--link">Home</Link>
        </div>
    </div>
    )
};