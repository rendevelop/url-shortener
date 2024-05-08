import React from "react";

type ShortenedLinkProps = {
    shortUri: string;
};

const ShortenedLink = ({ shortUri }: ShortenedLinkProps) => {
    return (
        <div className="shortened-link">
            <p>Here is your generated link: </p>
            <a href={shortUri} target="_blank" rel="noreferrer">
                {shortUri}
            </a>
        </div>
    );
}

export default ShortenedLink;
