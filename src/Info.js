import React from 'react';
import styled from 'styled-components';

import Word, { WordMagnet } from './Word';

const InfoWrapper = styled.section`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    overflow-y: auto;
    filter: blue(2px);
    h1,
    h2,
    h3,
    h4 {
        font-family: 'Libre Baskerville', serif;
        color: #0f0f0f;
        text-shadow: 1px 3px 5px #aba8a8;
    }
    h4 {
        margin: 0;
    }
    div {
        padding: 2em;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto;
        max-width: calc(100vw - 4em);
        margin-top: 2em;
        box-sizing: border-box;
        background-size: 4px 4px, 4px 4px, 4px 4px, 4px 4px, 4px 4px, 100% 100%;
        background-image: radial-gradient(
                ellipse farthest-corner,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0) 35%,
                #ffffff 30%,
                #ffffff 40%,
                rgba(0, 0, 0, 0) 90%
            ),
            radial-gradient(
                ellipse farthest-corner at 0px 0px,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0) 20%,
                #ffffff 15%,
                #ffffff 20%,
                rgba(0, 0, 0, 0) 50%
            ),
            radial-gradient(
                ellipse farthest-corner at 8px 8px,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0) 20%,
                #ffffff 15%,
                #ffffff 20%,
                rgba(0, 0, 0, 0) 50%
            ),
            radial-gradient(
                ellipse farthest-corner at 0px 8px,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0) 20%,
                #ffffff 15%,
                #ffffff 20%,
                rgba(0, 0, 0, 0) 40%
            ),
            radial-gradient(
                ellipse farthest-corner at 8px 0px,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0) 20%,
                #ffffff 15%,
                #ffffff 20%,
                rgba(0, 0, 0, 0) 50%
            ),
            linear-gradient(40deg, #484848 0, #959595 30%, #acacac 50%, #959595 70%, #484848 100%);
        box-shadow: 2px 2px 4px -1px rgba(255, 239, 213, 0.2);
        position: relative;
        border-radius: 3px;
        button {
            border-radius: 5px;
            background: #f4502f;
            color: papayawhip;
            box-shadow: 2px 2px 4px -1px rgba(0, 0, 0, 0.2);
            border: none;
            line-height: 2em;
            font-size: 1.5em;
            padding: 0 1em;
            margin-top: 2em;
            cursor: pointer;
            &:hover {
                box-shadow: 3px 3px 4px -1px rgba(0, 0, 0, 0.2);
                background: #bd2d10;
            }
        }
    }
    ${WordMagnet} {
        margin: 0 0.1em;
        display: inline-block;
        font-size: 1.5em;
    }
`;

function Info({ lines = [], title = '', author = '', toggleInfo, week, isThisWeek }) {
    return (
        <InfoWrapper>
            <div>
                <h1>{isThisWeek ? 'This Week' : `Week ${week}`}'s Poem</h1>
                <h4>Week {week}/52</h4>
                <h2>{title}</h2>
                <h3>by {author}</h3>
                {lines.map(line => {
                    return (
                        <p>
                            {line.split(/[ ]/).map(word => {
                                return (
                                    <WordMagnet
                                        style={{
                                            transform: `rotate(${Math.floor(
                                                -2 + Math.random() * 4
                                            )}deg) translateY(${Math.floor(-5 + Math.random() * 10)}px)`,
                                        }}
                                    >
                                        {word}
                                    </WordMagnet>
                                );
                            })}
                        </p>
                    );
                })}
                <button onClick={toggleInfo} type="button">
                    Mix it up!
                </button>
            </div>
        </InfoWrapper>
    );
}

export default Info;
