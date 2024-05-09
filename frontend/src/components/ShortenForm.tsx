import React, { useState } from 'react';
import Cookies from 'js-cookie';

import ShortenedLink from './ShortenedLink';

const ShortenForm = () => {

    const [prevInputUrl, setPrevInputUrl] = useState<string|null>(null);
    const [shortenedUri, setShortenedUri] = useState<string|null>(null);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const input = form.querySelector('input') as HTMLInputElement;
        const url = input.value;
        const csrfToken = Cookies.get('csrftoken') || '';

        if (prevInputUrl === url) {
            return;
        }

        setPrevInputUrl(url);
        setShortenedUri(null);

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
                <input type="url" placeholder="Enter URL" className="flex-1 mb-2 text-3xl bg-slate-500 rounded-lg px-4 text-white font-extralight float-left"/>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 ml-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">Shorten</button>
            </form>
            {shortenedUri && <ShortenedLink shortUri={shortenedUri} />}
        </div>
    );
}

export default ShortenForm;
