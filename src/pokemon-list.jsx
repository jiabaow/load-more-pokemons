// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0

import {useEffect, useState} from "react";

const PokemonList = () => {
    const [pokemons, setPokemons]= useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        setLoading(true);
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${count}`)
            .then((res) => res.json())
            .then((data) => {
                setPokemons([...pokemons, ...data.results]);
                setTotal(data.count);
                setLoading(false);
            })
    }, [count]);

    // const fetchData = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${count}`);
    //         if (!response.ok) {
    //             throw new Error('Network response not OK');
    //         }
    //         const data = await response.json();
    //         setData((prevData) => [...prevData, ...data.results]);
    //         setTotal(data.count);
    //         setCount((prevCount) => prevCount + data.results.length);
    //     } catch (err) {
    //         setError(err.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const hasLoadedAllData = pokemons.length === total;


    return (
        <div>
            {loading && <span>Loading...</span>}
            <ul>
                {pokemons.map((item) => (
                    <li key={item.name}>{item.name}</li>
                ))}
            </ul>
            <p>Displaying {pokemons.length} of {total} results</p>
            {!hasLoadedAllData && (<button onClick={() => setCount(count + 5)}>Load more</button>)}
        </div>
    );

};

export default PokemonList;
