import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import usePersitedState from './usePersistedState';

export const WordMagnet = styled.span`
    color: #f0f0f0;
    background: #0c0c0c;
    position: ${({ isDraggable }) => {
        return isDraggable ? 'absolute' : 'static';
    }};
    cursor: ${({ isDraggable }) => {
        return isDraggable ? 'pointer' : 'default';
    }};
    font-size: 1.5em;
    line-height: 1.8;
    padding: 0.5em;
    box-shadow: 2px 2px 4px -1px rgba(0, 0, 0, 0.75);
    border-radius: 2px;
    user-select: none;
`;

function Word({
    index,
    content,
    addWrapperEventListener,
    removeWrapperEventListener,
    initX = 0,
    initY = 0,
    hiZ,
    setHiZ,
}) {
    const [X, setX] = usePersitedState(`${index}X`, initX);
    const [Y, setY] = usePersitedState(`${index}Y`, initY);
    const [Z, setZ] = usePersitedState(`${index}Z`, hiZ);
    const transX = 0;
    const transY = 0;
    let initialX;
    let initialY;

    const wordRef = useRef(null);

    const setTranslate = (xPos, yPos, el) => {
        el.setAttribute('X', X + xPos);
        el.setAttribute('Y', Y + yPos);
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        el.style.zIndex = 9999999;
    };

    const drag = e => {
        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
        const newX = clientX - initialX;
        const newY = clientY - initialY;
        setTranslate(newX, newY, wordRef.current);
    };

    const startDrag = e => {
        if (e.target === wordRef.current) {
            const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
            initialX = clientX - transX;
            initialY = clientY - transY;
            wordRef.current.style.boxShadow = '5px 5px 4px -1px rgba(0, 0, 0, 0.75)';
            addWrapperEventListener('mousemove', drag);
            addWrapperEventListener('touchmove', drag);
        }
    };
    const endDrag = e => {
        if (e.target === wordRef.current) {
            setX(parseInt(wordRef.current.getAttribute('X')));
            setY(parseInt(wordRef.current.getAttribute('Y')));
            wordRef.current.style.transform = '';
            wordRef.current.style.zIndex = `${hiZ + 1}`;
            wordRef.current.style.boxShadow = '';
            setZ(hiZ + 1);
            setHiZ(hiZ + 1);

            removeWrapperEventListener('mousemove', drag);
            removeWrapperEventListener('touchmove', drag);
        }
    };

    useEffect(() => {
        wordRef.current.style.left = `${X}px`;
        wordRef.current.style.top = `${Y}px`;
        wordRef.current.style.zIndex = `${Z}`;
    }, [X, Y, Z]);

    useEffect(() => {
        addWrapperEventListener('mousedown', startDrag, false);
        addWrapperEventListener('mouseup', endDrag, false);
        addWrapperEventListener('touchstart', startDrag, false);
        addWrapperEventListener('touchend', endDrag, false);
        return () => {
            removeWrapperEventListener('mousedown', startDrag, false);
            removeWrapperEventListener('mouseup', endDrag, false);
            removeWrapperEventListener('touchstart', startDrag, false);
            removeWrapperEventListener('touchend', endDrag, false);
        };
    });

    return (
        <WordMagnet isDraggable ref={wordRef}>
            {content}
        </WordMagnet>
    );
}

export default Word;
