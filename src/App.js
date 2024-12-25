import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BeerCard from './components/BeerCard';
import './App.css';

const App = () => {
    const [beers, setBeers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch data from the API when the app loads
    useEffect(() => {
        const fetchBeers = async () => {
            const response = await axios.get('https://api.sampleapis.com/beers/ale');
            setBeers(response.data);
        };
        fetchBeers();
    }, []);

    // Filter beers by search term
    const filteredBeers = beers.filter(beer =>
        beer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="App">
            <h1>Beer List</h1>
            <input
                type="text"
                placeholder="Search for a beer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="beer-list">
                {filteredBeers.map(beer => (
                    <BeerCard key={beer.id} beer={beer} />
                ))}
            </div>
        </div>
    );
};

export default App;
