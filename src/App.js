import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdRefresh, MdInfoOutline, MdChevronLeft, MdChevronRight } from 'react-icons/md';

import Word from './Word';
import Info from './Info';
import usePoem from './usePoem';

function getNumberOfWeek() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

const MagnetBoard = styled.main`
    width: 100vw;
    height: 100vh;
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
        linear-gradient(40deg, #bd2d10 0, #f4502f 30%, #ff6e51 50%, #f4502f 70%, #bd2d10 100%);
    overflow: hidden;
`;

const TitleColumn = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Libre Baskerville', serif;
    color: rgba(0, 0, 0, 0.4);

    padding: 0.5em;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
`;

const SubTitle = styled.span`
    font-size: 0.9em;
    font-weight: bold;
`;

const PageTitle = styled.div`
    letter-spacing: 0.2em;
    font-weight: bold;
    line-height: 1;
    font-size: 2.5em;
`;

const ActionSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: rgba(0, 0, 0, 0.3);
    font-size: 2em;
    align-items: center;
    height: 100%;
    .hover:hover,
    .hover:focus {
        color: #bd2d10;
        cursor: pointer;
    }
`;

const Footer = styled.footer`
    font-family: 'Libre Baskerville', serif;
    color: rgba(0, 0, 0, 0.4);
    padding: 0.5em;
    font-size: 1em;
    position: absolute;
    bottom: 0;
    font-weight: bold;
    right: 0;
    a {
        color: rgba(0, 0, 0, 0.4);
        text-decoration: none;
        &:hover,
        &:focus {
            color: #bd2d10;
        }
    }
`;

function App() {
    const wrapperRef = useRef(null);

    const [poems, poemError, poemLoading, getPoemOfTheWeek, week, setWeek] = usePoem(getNumberOfWeek());

    const poem = poems ? getPoemOfTheWeek(poems) : null;

    const [words, setWords] = useState([]);
    const [showInfo, setShowInfo] = useState(true);
    const [lastReset, setLastReset] = useState(new Date());
    const [hiZ, setHiZ] = useState(1);

    useEffect(() => {
        if (poem) {
            const poemString = poem.lines.join(' ');
            const wordsArray = poemString.split(/[.,:;!?"' ]/).filter(el => {
                return el !== '';
            });
            setWords(wordsArray);
        }
    }, [poem]);

    // if (poemLoading) return <span>Loading</span>;
    // if (poemError) return <span>Error</span>;

    const toggleInfo = () => {
        setShowInfo(!showInfo);
    };

    const reset = () => {
        localStorage.clear();
        setLastReset(new Date());
    };
    const addWrapperEventListener = (eventType, cb) => {
        wrapperRef.current.addEventListener(eventType, cb);
    };

    const removeWrapperEventListener = (eventType, cb) => {
        wrapperRef.current.removeEventListener(eventType, cb);
    };

    return (
        <MagnetBoard>
            <Header>
                <TitleColumn>
                    <PageTitle>
                        sticky
                        <br />
                        words
                    </PageTitle>
                    <SubTitle>Week {week}/52 - 2020 </SubTitle>
                </TitleColumn>
                <ActionSection>
                    <MdRefresh className="hover" onClick={reset} />
                    <MdInfoOutline className="hover" onClick={toggleInfo} />
                    <span>
                        <MdChevronLeft
                            className={week < 2 ? '' : 'hover'}
                            onClick={() => {
                                if (week > 1) {
                                    setWeek(week - 1);
                                    toggleInfo();
                                }
                            }}
                        />
                        <MdChevronRight
                            className={week >= getNumberOfWeek() ? '' : 'hover'}
                            onClick={() => {
                                if (week < getNumberOfWeek()) {
                                    setWeek(week + 1);
                                    toggleInfo();
                                }
                            }}
                        />
                    </span>
                </ActionSection>
            </Header>
            {!(poemError || poemLoading) && (
                <>
                    {showInfo && poem && (
                        <Info week={week} isThisWeek={week === getNumberOfWeek()} {...poem} toggleInfo={toggleInfo} />
                    )}

                    <div style={{ width: '100vw', height: '100vh' }} ref={wrapperRef}>
                        {words.map((word, index) => {
                            return (
                                <Word
                                    key={`${lastReset}-${index}`}
                                    index={`${poem.title.replace(' ', '')}-${index}`}
                                    content={word}
                                    setHiZ={setHiZ}
                                    hiZ={hiZ}
                                    removeWrapperEventListener={removeWrapperEventListener}
                                    addWrapperEventListener={addWrapperEventListener}
                                    initX={Math.floor((0.85 * Math.random() + 0.02) * window.innerWidth)}
                                    initY={Math.floor((0.85 * Math.random() + 0.02) * window.innerHeight)}
                                />
                            );
                        })}
                    </div>
                </>
            )}
            <Footer>
                © {new Date().getFullYear()} <a href="https://matthiaswehnert.com">Matthias Wehnert</a>
            </Footer>
        </MagnetBoard>
    );
}

export default App;
