// SearchResult.js
import React from 'react';
import './font.css';

const SearchResult = ({ searchResults, searchTerm }) => {
  const customSortOrder = ['a', 'e', 'i', 'o', 'u', 'p', 't', 'k', 'f', 's', 'h', 'c', 'm', 'n', 'g', 'r', 'l', 'y', 'w', 'x'];
  
  // 辞書順に単語をソートする関数
  const customSort = (a, b) => {
    const aIndex = customSortOrder.indexOf(a.entry.form.charAt(0).toLowerCase());
    const bIndex = customSortOrder.indexOf(b.entry.form.charAt(0).toLowerCase());
    return aIndex - bIndex;
  };

  // 検索結果を指定した順序でソート
  const sortedResults = [...searchResults].sort(customSort);

  return (
    <div className="search-result">
      <h2>検索結果</h2>
      <div>
        {searchTerm && ( // 検索キーワードが空でない場合のみ結果を表示
          sortedResults.length === 0 ? (
            <p>該当する結果がありません</p>
          ) : (
            <ul>
              {sortedResults.map((word, index) => (
                <li key={index}>
                  <big><b className="kaei-rom">{word.entry.form}</b></big>&nbsp;<br />
                  <span style={{ color: 'gray' }}>{word.entry.form}</span>&nbsp;
                  <span style={{ color: 'gray', fontFamily: 'Times New Roman' }}>/{word.contents.find((item) => item.title === "Pronunciation")?.text}/</span><br />
                  [{word.translations[0]?.title}]&nbsp;
                  {word.translations[0]?.forms.map((form, index) => (
                      <React.Fragment key={index}>
                          {form}
                          {index < word.translations[0]?.forms.length - 1 && "、"}
                      </React.Fragment>
                  ))}<br />
                  [{word.translations[1]?.title}]&nbsp;
                  {word.translations[1]?.forms.map((form, index) => (
                      <React.Fragment key={index}>
                          {form}
                          {index < word.translations[1]?.forms.length - 1 && "、"}
                      </React.Fragment>
                  ))}<br />
                  【解説】{word.contents.find((item) => item.title === "解説")?.text}<br />
                  【用法】{word.contents.find((item) => item.title === "用法")?.text}<br />
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
};

export default SearchResult;
