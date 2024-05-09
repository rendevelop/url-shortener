import React from "react";

type ShortenedLinkProps = {
    shortUri: string;
};

const ShortenedLink = ({ shortUri }: ShortenedLinkProps) => {
    return (
        <div id="shortened-link" className="text-2xl">
            <p className="text-green-300 ">Here is your generated link: </p>
            <a className="text-blue-200 ml-2" href={shortUri} target="_blank" rel="noreferrer">
                {shortUri}
            </a>
        </div>
    );
}

export default ShortenedLink;
