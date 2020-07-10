import React, { useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import NewsList from './components/NewsList'
import Categories from './components/Categories'
import { Route } from 'react-router-dom'
import NewsPage from './pages/NewsPage'


const App = () => {

  const [category, setCategory] = useState('all')
  
  const onSelect = useCallback(category => {
    console.log('클릭 App.js ' + category)
    setCategory(category)}, []) 

  return (
      <Route path="/:category?" component={NewsPage}></Route>
  )
}

export default App;
