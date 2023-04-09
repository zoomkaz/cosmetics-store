import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './css/Basket.css'

const Basket = () => {
  const [, reRender] = useState([])
  const [showOrder, setShowOrder] = useState(false)
  const [total, setTotal] = useState(0)
  const [orders, setOrders] = useState(0)

  useEffect(() => {
    let pricesList = document.querySelectorAll('.price-span')
    let tempPrices = 0
    for (let i = 0; i < pricesList.length; i++) {
      tempPrices += +pricesList[i].textContent?.split(' ')[0]!
    }
    setTotal(tempPrices)
    let ordersList = document.querySelectorAll('.item')
    let tempOrders = 0
    for (let i = 0; i < ordersList.length; i++) {
      tempOrders += 1
    }
    setOrders(tempOrders)

  }, [total, orders])

  localStorage.setItem(`info`, JSON.stringify({ orders, total }))

  let ordersHeaders = document.querySelectorAll('.basket span')
  let totalHeader = document.querySelector('.total_container .total span')

  if (ordersHeaders[0]) {
    ordersHeaders[0].textContent = orders.toString()
    ordersHeaders[1].textContent = orders.toString()
  }
  if (totalHeader) {
    totalHeader.textContent = total.toFixed(2).toString()
  }


  const deleteItem = (e: any) => {
    if (e.target.classList[0] === 'icon') {
      let temp = total - +e.target.parentElement.parentElement.children[3].textContent.split(' ')[0]
      setTotal(temp)
      localStorage.removeItem(e.target.parentElement.parentElement.parentElement.id)
    }
    else {
      let temp = total - +e.target.parentElement.children[3].textContent.split(' ')[0]
      setTotal(temp)
      localStorage.removeItem(e.target.parentElement.parentElement.id)
    }

    reRender([])
  }

  const closeCong = () => {
    setShowOrder(false)
  }


  if (localStorage.length === 1 && localStorage.getItem('info')) {
    localStorage.clear()
    if (ordersHeaders[0]) {
      ordersHeaders[0].textContent = '0'
    }
    if (totalHeader) {
      totalHeader.textContent = '0'
    }
    return <div className='empty content' data-testid='basket-empty-page'>
      Корзина пуста
      {
        showOrder ?
          <>
            <div className="back" onClick={closeCong}></div>
            <div className='cong'>
              <div className="close" onClick={closeCong}></div>
              <div className="icon_container"><div className="icon"></div></div>
              <h1>Спасибо за заказ</h1>
              <p>Наш менеджер свяжется с вами в ближайшее время</p>
            </div>
          </>
          :
          ''
      }
    </div>
  }

  const minus = (e: any, currentPrice: any) => {
    if (+e.target.parentElement.children[1].textContent === 1) {
      return
    }
    e.target.parentElement.children[1].textContent = +e.target.parentElement.children[1].textContent - 1
    e.target.parentElement.parentElement.children[3].textContent = `${(currentPrice * +e.target.parentElement.children[1].textContent).toFixed(2)} ₸`
    let pricesList = document.querySelectorAll('.price-span')
    let temp = 0
    for (let i = 0; i < pricesList.length; i++) {
      temp += +pricesList[i].textContent?.split(' ')[0]!
    }
    setTimeout(() => {
      setTotal(temp)
    }, 200);
  }
  const plus = (e: any, currentPrice: any) => {
    e.target.parentElement.children[1].textContent = +e.target.parentElement.children[1].textContent + 1
    e.target.parentElement.parentElement.children[3].textContent = `${(currentPrice * +e.target.parentElement.children[1].textContent).toFixed(2)} ₸`
    let pricesList = document.querySelectorAll('.price-span')
    let temp = 0
    for (let i = 0; i < pricesList.length; i++) {
      temp += +pricesList[i].textContent?.split(' ')[0]!
    }
    setTotal(temp)
  }

  const makeOrder = () => {
    localStorage.clear()
    setShowOrder(true)
  }


  return (
    <div className='basket content' data-testid='basket-page'>
      <div className="links">
        <div className="left">
          <Link to={'/'} className='main'>Главная</Link>
          <div className="dotted"></div>
          <p className='item-name'>Корзина</p>
        </div>
        <div className="mobile-links">
          <Link to={'/'} className='mobile-link'><div className='back'></div>Назад</Link>
        </div>
      </div>
      <h1>Корзина</h1>
      {Object.keys(localStorage).map((code: any, index: any) => {
        let elem = JSON.parse(localStorage.getItem(code)!)
        if (code !== 'info') {
          return <div className='item' key={index.toString()} id={code}>
            <div className="item-info">
              <div className="item-image" style={{ backgroundImage: `url(img/${elem.item.url})` }}></div>
              <div className="item-desc">
                <p>{elem.item.weight} {elem.item.typeWeight}</p>
                <h2>{elem.item.brand} <span>{elem.item.name}</span></h2>
                <div className="lorem">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, vestibulum sagittis iaculis iaculis.
                  Quis mattis vulputate feugiat massa vestibulum duis.
                </div>
              </div>
            </div>
            <div className="price">
              <div className="dotted"></div>
              <div className="count">
                <button className='-' onClick={(e) => minus(e, elem.currentPrice)}>-</button>
                <span>{elem.count}</span>
                <button className='+' onClick={(e) => plus(e, elem.currentPrice)}>+</button>
              </div>
              <div className="dotted"></div>
              <span className='price-span'>{elem.currentPrice * elem.count} ₸</span>
              <div className="dotted"></div>
              <button onClick={deleteItem}><div className="icon"></div></button>
            </div>
          </div>
        }
      })}
      <div className="total">
        <button className='order' onClick={makeOrder}>Оформить заказ</button>
        <div className="total-price">
          {total.toFixed(2)} ₸
        </div>
      </div>
    </div>
  )
}

export default Basket