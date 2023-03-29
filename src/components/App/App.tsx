
import React from 'react'
import { Header } from '../Header/Header'
import './css/App.css'
import { Routes, Route } from 'react-router-dom'
import Catalog from '../Catalog/Catalog'
import Footer from '../Footer/Footer'
import Card from '../Card/Card'
import Basket from '../Basket/Basket'

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Catalog />} />
        <Route path='/card/:id' element={<Card />} />
        <Route path='/basket' element={<Basket />} />
      </Routes>
      <Footer />
    </div>
  )
}


export default App


