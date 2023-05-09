import { useState, useEffect } from 'react';

// Api fetch hook module
function UseApiGetAuth(url) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [noAuth, setNoAuth] = useState();

    useEffect(() => {
        async function fetchData() {
            if (localStorage.getItem('userToken')) {
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
                    setNoAuth(false);
                    setData(json);
                } catch (error) {
                    console.log(error);
                    setIsError(true);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setNoAuth(true);
            }
        }
        fetchData();
    }, [url]);

    return { data, isLoading, isError, noAuth };
}

export default UseApiGetAuth;
