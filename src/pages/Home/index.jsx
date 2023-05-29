import RenderVenues from '../../components/RenderVenues';
import usePrefersReducedMotion from '../../components/PrefersReducedMotion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    useEffect(() => {
        document.title = 'Venues - Holidaze';
    }, []);

    usePrefersReducedMotion();

    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get('page');
    const navigate = useNavigate();
    /*useEffect(() => {
        if (!page) {
            navigate('/?page=1');
            window.location.reload(false);
        }
    });*/
    useEffect(() => {
        if (Number(page) < 1) {
            navigate('/?page=1');
        }
    });
    if (Number(page) === 1) {
        return (
            <RenderVenues
                url={
                    'https://api.noroff.dev/api/v1/holidaze/venues?sort=created&limit=50&_owner=true'
                }
            />
        );
    }
    if (Number(page) > 1) {
        const offsetNumber = page * 50;
        return (
            <RenderVenues
                url={`https://api.noroff.dev/api/v1/holidaze/venues?sort=created&limit=50&offset=${offsetNumber}&_owner=true`}
            />
        );
    }

    return (
        <RenderVenues
            url={
                'https://api.noroff.dev/api/v1/holidaze/venues?sort=created&limit=50&_owner=true'
            }
        />
    );
}

export default Home;
