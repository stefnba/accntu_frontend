import React from 'react';

export default function PublicLayout({
    component: Component,
    ...rest
}) {
    return (
        <Component {...rest} />
    );
}
