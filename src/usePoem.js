import { useState, useEffect } from 'react';
import useFetch from './useFetch';

const sortByTitle = (a, b) => {
    if (a.title < b.title) {
        return -1;
    }
    if (a.title > b.title) {
        return 1;
    }
    return 0;
};

const usePoem = currentWeek => {
    const param1 = 3 / 51;
    const param2 = 5 - param1;
    const [week, setWeek] = useState(currentWeek);
    const lineCount = Math.floor(param1 * week + param2);

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`http://poetrydb.org/linecount/${lineCount}:abs/author,title,lines.json`);
                const json = await res.json();
                setResponse(json.sort(sortByTitle));
                setIsLoading(false);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [lineCount]);

    const [poemResponse, poemError, poemLoading] = useFetch(
        `http://poetrydb.org/linecount/${lineCount}:abs/author,title,lines.json`
    );

    const pickPoemForDay = weekNumber => {
        return poems => {
            const poemsCount = poems.length;
            return poems[Math.floor(((weekNumber % 13) / 13) * poemsCount)];
        };
    };

    return [response, error, isLoading, pickPoemForDay(week), week, setWeek];
};

export default usePoem;
