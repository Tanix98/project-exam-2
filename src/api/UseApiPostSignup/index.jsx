import { useState, useEffect } from 'react';

// Api fetch hook module
function UseApiPostSignup(
    url,
    userName,
    userEmail,
    userPassword,
    userAccountType
) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: {
                        name: userName,
                        email: userEmail,
                        password: userPassword,
                        venueManager: userAccountType,
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

export default UseApiPostSignup;
