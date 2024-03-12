// App.js
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import dictionaryData from './lex.json';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState(dictionaryData.words);
  const [searchOption, setSearchOption] = useState('partial'); // デフォルトの検索オプションは部分一致
  const [searchTerm, setSearchTerm] = useState(''); // 検索キーワードを保持するステート変数

  // 検索キーワードと検索オプションに応じて結果をフィルタリングする関数
  const handleSearch = (newSearchTerm) => {
    setSearchTerm(newSearchTerm); // 検索キーワードを更新

    if (!newSearchTerm) {
      setSearchResults(dictionaryData.words);
    } else {
      const filteredResults = dictionaryData.words.filter((word) => {
        const searchTermLower = newSearchTerm.toLowerCase();
        const entryFormLower = word.entry.form.toLowerCase();

        // すべての翻訳のフォームを結合して検索対象とする
        const translationsForms = word.translations.flatMap((translation) => translation.forms);
        const translationLower = translationsForms.map(form => form.toLowerCase()).join(', ');

        if (searchOption === 'partial') {
          return entryFormLower.includes(searchTermLower) || translationLower.includes(searchTermLower);
        } else if (searchOption === 'startsWith') {
          return entryFormLower.startsWith(searchTermLower) || translationLower.startsWith(searchTermLower);
        } else if (searchOption === 'exact') {
          return entryFormLower === searchTermLower || translationLower === searchTermLower;
        }

        return false;
      });

      setSearchResults(filteredResults);
    }
  };

  const handleOptionChange = (newOption) => {
    setSearchOption(newOption);
    handleSearch(searchTerm); // 検索オプションが変更されたら再検索
  };

  return (
    <div className="container">
      <h1>辞書検索</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="radio-buttons">
        <label>
          <input
            type="radio"
            value="partial"
            checked={searchOption === 'partial'}
            onChange={() => handleOptionChange('partial')}
          />
          <span className="radio-button-custom"></span>部分一致
        </label>
        <label>
          <input
            type="radio"
            value="startsWith"
            checked={searchOption === 'startsWith'}
            onChange={() => handleOptionChange('startsWith')}
          />
          <span className="radio-button-custom"></span>前方一致
        </label>
        <label>
          <input
            type="radio"
            value="exact"
            checked={searchOption === 'exact'}
            onChange={() => handleOptionChange('exact')}
          />
          <span className="radio-button-custom"></span>完全一致
        </label>
      </div>
      <SearchResult searchResults={searchResults} searchTerm={searchTerm} />
    </div>
  );
}

export default App;
