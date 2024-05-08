import React from 'react';
import ShortenForm from './components/ShortenForm';

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <p>URL Shortener</p>
        </header>
        <div className="App-body">
            <ShortenForm />
        </div>
    </div>
  );
}

export default App;
