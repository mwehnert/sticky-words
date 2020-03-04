import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const poem = `Das Alter ist ein höflich' Mann:
Einmal übers andre klopft er an;
Aber nun sagt niemand: Herein!
Und vor der Türe will er nicht sein.
Da klinkt er auf, tritt ein so schnell,
Und nun heißt's, er sei ein grober Gesell.`

const words = poem.split(/[.,:;!? ]/);

const MagnetBoard = styled.main`
  width: 100vw;
  height: 100vh;
  background: peachpuff;
`

const WordMagnet = styled.span`
  color: #f0f0f0;
  background: #0c0c0c;
  position: absolute;
  font-size: 2em;
  line-height: 1.8;
  padding: 0.5em;
  box-shadow: 2px 2px 4px -1px rgba(0,0,0,0.75);
  border-radius: 2px;
`

function Word({ content, addWrapperEventListener, removeWrapperEventListener }) {

  var currentX;
  var currentY;
  var initialX;
  var initialY;
  var xOffset = 0;
  var yOffset = 0;

  const startDrag = (e) => {
    if (e.target === wordRef.current) {
      console.log(`StartDrag: ${content}`);
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
      addWrapperEventListener('mousemove', drag)
    }
  }
  const endDrag = (e) => {
    if (e.target === wordRef.current) {
      console.log(`EndDrag: ${content}`);
      initialX = currentX;
      initialY = currentY;
      removeWrapperEventListener('mousemove', drag)
    }
  }

  const drag = (e) => {
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;
    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, wordRef.current);
  }


  function setTranslate(xPos, yPos, el) {
    // el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    el.style.left = `${xPos}px`;
    el.style.top = `${yPos}px`;
  }

  const wordRef = useRef(null);

  useEffect(() => {
    addWrapperEventListener("mousedown", startDrag);
    addWrapperEventListener("mouseup", endDrag);
    return (() => {
      removeWrapperEventListener("mousedown", startDrag);
      removeWrapperEventListener("mouseup", endDrag);
    })
  })

  return (
    <WordMagnet ref={wordRef}>
      {content}
    </WordMagnet>
  )
}

function App() {

  const wrapperRef = useRef(null);

  const addWrapperEventListener = (eventType, cb) => {
    wrapperRef.current.addEventListener(eventType, cb);
  }

  const removeWrapperEventListener = (eventType, cb) => {
    wrapperRef.current.removeEventListener(eventType, cb);
  }

  return (<MagnetBoard>
    <div style={{ width: "100vw", height: "100vh" }} ref={wrapperRef}>
      {
        words.map((word, index) => <Word key={index} content={word} removeWrapperEventListener={removeWrapperEventListener} addWrapperEventListener={addWrapperEventListener} />)
      }
    </div>
  </MagnetBoard>)
}

export default App;
