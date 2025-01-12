// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0

import {useEffect, useState} from "react";

const PokemonList = () => {
    const [data, setData]= useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${count}`);
            if (!response.ok) {
                throw new Error('Network response not OK');
            }
            const data = await response.json();
            setData((prevData) => [...prevData, ...data.results]);
            setTotal(data.count);
            setCount((prevCount) => prevCount + data.results.length);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    const handleLoadMore = () => {
        if (!loading && count < total) {
            fetchData();
        }
    };

    return (
        <div>
            <ul>
                {data.map((item) => (
                    <li key={item.name}>{item.name}</li>
                ))}
            </ul>
            <p>Displaying {count} of {total} results</p>
            {count < total && (<button onClick={handleLoadMore} disabled={loading}>Load more</button>)}
        </div>
    );

};

export default PokemonList;
