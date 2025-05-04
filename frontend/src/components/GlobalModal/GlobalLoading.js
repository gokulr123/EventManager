import React from 'react';
import './GlobalLoading.css';

function GlobalLoading({  }) {
  return (
    <div class="loader-wrapper">
      <div class="spinner"></div>
      <p class="loading-text">Loading...</p>
    </div>
  );
}

export default GlobalLoading;