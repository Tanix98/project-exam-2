import { useState, useEffect } from 'react';

// Api fetch hook module
function UseApiGetAuth(url) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url, {
                    headers: {
                        Authorization:
                            'Bearer ' +
                            localStorage
                                .getItem('userToken')
                                .replace(/['"]+/g, ''),
                    },
                });
                const json = await response.json();
                setData(json);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [url]);

    return { data, isLoading, isError };
}

export default UseApiGetAuth;
