// SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="検索キーワードを入力してください"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
