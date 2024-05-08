import React, { useState } from 'react';
import Cookies from 'js-cookie';

import ShortenedLink from './ShortenedLink';

const ShortenForm = () => {

    const [shortenedUri, setShortenedUri] = useState<string|null>(null);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setShortenedUri(null);

        const form = e.target as HTMLFormElement;
        const input = form.querySelector('input') as HTMLInputElement;
        const url = input.value;
        const csrfToken = Cookies.get('csrftoken') || '';

        fetch('http://localhost:8000/create', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({ dest_uri: url }),
        })
            .then((response) => response.json())
            .then((data) => {
                setShortenedUri(data.short_uri);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="shorten-form">
            <form onSubmit={onSubmit}>
                <input type="url" placeholder="Enter URL" />
                <button>Shorten</button>
            </form>
            {shortenedUri && <ShortenedLink shortUri={shortenedUri} />}
        </div>
    );
}

export default ShortenForm;
