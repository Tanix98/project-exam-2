import RenderVenues from '../../components/RenderVenues';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function Search() {
    useEffect(() => {
        document.title = 'Venues - Holidaze';
    }, []);

    let { searchTerm } = useParams();

    return (
        <RenderVenues
            url={`https://api.noroff.dev/api/v1/holidaze/venues?sort=created&limit=50&_owner=true`}
            searchTerm={searchTerm}
        />
    );
}

export default Search;
