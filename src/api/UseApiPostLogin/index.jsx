import { useState, useEffect } from 'react';

// Api fetch hook module
function UseApiPostLogin(
    url,
    userName,
    userEmail,
    userPassword,
    userVenueManager
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
                        venueManager: userVenueManager,
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

export default UseApiPostLogin;
