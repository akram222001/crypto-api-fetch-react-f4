import React, { useState, useEffect } from 'react';
import axios from 'axios';

  const MarketingData = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const fetchDataWithThen = () => {
    const url = 'https://api.coingecko.com/api/v3/coins/markets';
    axios.get(url, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false
      }
    })
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  };

  useEffect(() => {
    fetchDataWithThen();
  }, []);

  const handleSearch = () => {
    const filteredData = data.filter(coin =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setData(filteredData);
  };

  const handleSort = (key) => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
    setData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={() => handleSort('market_cap')}>Sort by Market Cap</button>
      <button onClick={() => handleSort('price_change_percentage_24h')}>Sort by 24h % Change</button>
      <table className='tab_content'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Symbol</th>
            <th>Name</th>
            <th>Current Price</th>
            <th>Total Volume</th>
          </tr>
        </thead>
        <tbody>
          {data.map(coin => (
            <tr key={coin.id}>
              <td><img src={coin.image} alt={coin.name} width="30" /></td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>{coin.name}</td>
              
              <td>${coin.current_price}</td>
              <td>{coin.total_volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketingData;