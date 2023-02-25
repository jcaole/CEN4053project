import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './pages/HomePage';

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route /*, Link */} from 'react-router-dom';

// const HomePage = lazy(()=> import('./pages/HomePage'));

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Suspense fallback={<h1>Loading WebPage...</h1>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage/>}/>

          <Route path="*" element={<h1> PAGE NOT FOUND</h1>} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
  
}
