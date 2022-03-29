import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/home';
import Header from '@/component/Header';

import './App.less';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
