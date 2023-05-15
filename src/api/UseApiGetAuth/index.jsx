import { useState, useEffect } from 'react';

// Api fetch hook module
function UseApiGetAuth(url) {
    const [dataAuth, setDataAuth] = useState([]);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const [isErrorAuth, setIsErrorAuth] = useState(false);
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
                    setDataAuth(json);
                } catch (error) {
                    console.log(error);
                    setIsErrorAuth(true);
                } finally {
                    setIsLoadingAuth(false);
                }
            } else {
                setNoAuth(true);
            }
        }
        fetchData();
    }, [url]);

    return { dataAuth, isLoadingAuth, isErrorAuth, noAuth };
}

export default UseApiGetAuth;
