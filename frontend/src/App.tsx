import React from 'react';
import ShortenForm from './components/ShortenForm';

function App() {
  return (
    <div id="app-container" className="flex flex-col h-screen bg-slate-600">
        <header id="app-header" className="flex justify-center items-center mt-8">
            <h1 className="mb-4 text-8xl font-extralight leading-none text-blue-50">URL Shortener</h1>
        </header>
        <div id="app-body" className="flex justify-center items-center mt-10">
            <ShortenForm />
        </div>
    </div>
  );
}

export default App;
