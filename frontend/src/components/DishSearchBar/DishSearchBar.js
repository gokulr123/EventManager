import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ value, onChange }) => (
  <div className="top-bar">
    <FaSearch />
    <input
      type="text"
      placeholder="Search dishes..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    <style jsx>{`
      .top-bar {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 8px 10px;
      }
      .top-bar input {
        flex-grow: 1;
        border-radius: 5px;
        padding: 8px;
        font-size: 14px;
        border: none;
        outline: none;
      }
    `}</style>
  </div>
);

export default SearchBar;
