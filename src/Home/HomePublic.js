import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePublic() {
    return (
        <div>
            <h1>Home Public</h1>
            <Link to="/login">Login</Link>
        </div>
    );
}
