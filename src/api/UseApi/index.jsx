import { useState, useEffect } from 'react';

// Api fetch hook module
function UseApi(url) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    //const [getTags, setGetTags] = useState([]);
    //const [getReviews, setGetReviews] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsError(false);
                setIsLoading(true);
                const response = await fetch(url);
                const json = await response.json();
                setData(json);
                //setGetTags(json.tags);
                //setGetReviews(json.reviews);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [url]);

    return { data, isLoading, isError /*getTags, getReviews*/ };
}

export default UseApi;
