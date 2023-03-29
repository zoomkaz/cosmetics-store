import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './css/Header.css'
import burgerS from '../../img/burger-showed.svg'
import burgerH from '../../img/burger-hidden.svg'

export const Header = () => {
  const [total, setTotal] = useState(0)
  const [orders, setOrders] = useState(0)
  const [showHeader, setShowHeader] = useState(false)

  useEffect(() => {
    let total = JSON.parse(localStorage.getItem('info')!)?.total
    setTotal(total ? total.toFixed(2) : 0)
    let orders = JSON.parse(localStorage.getItem('info')!)?.orders
    setOrders(orders ? orders : 0)

    let burger = document.querySelector('.burger .icon');
    if (showHeader) {
      (burger as HTMLElement).style.background = `url(${burgerS}) no-repeat center center`;
    } else if (!showHeader) {
      (burger as HTMLElement).style.background = `url(${burgerH}) no-repeat center center`;
    }
  }, [total, orders, showHeader])


  const showHeaderMobile = (e: any) => {
    showHeader ? setShowHeader(false) : setShowHeader(true);
  }


  return (
    <>
      <header>
        <div className="top content">
          <div className="info">
            <div className="location">
              <div className="icon geo"></div>
              <div className="text">
                <h3>г. Кокчетав, ул. Ж. Ташенова 129Б</h3>
                <p>(Рынок Восточный)</p>
              </div>
            </div>
            <div className="dotted"></div>
            <div className="email">
              <div className="icon mail"></div>
              <div className="text">
                <h3>opt.sultan@mail.ru</h3>
                <p>На связи в любое время</p>
              </div>
            </div>
          </div>
          <nav>
            <ul>
              <li>О компании</li>
              <div className="dotted"></div>
              <li>Доставка и оплата</li>
              <div className="dotted"></div>
              <li>Возврат</li>
              <div className="dotted"></div>
              <li>Контакты</li>
            </ul>
          </nav>
        </div>
        <div className="line"></div>
        <div className="bottom content">
          <Link to='/' onClick={() => localStorage.clear()}><div className="logo"></div></Link>
          <Link to='/'><button className='catalog-btn'>
            Каталог
            <div className="icon"></div>
          </button></Link>
          <div className="search">
            <input type="text" placeholder='Поиск...' />
            <button><div className="icon"></div></button>
          </div>
          <div className="info">
            <div className="info-left">
              <h3>+7 (777) 490-00-91</h3>
              <h4>время работы: 9:00-20:00</h4>
              <p>Заказать звонок</p>
            </div>
            <div className="info-right"></div>
          </div>
          <button className='price-btn'>
            Прайс-лист
            <div className="icon"></div>
          </button>
          <div className="basket_container">
            <Link to='/basket'><div className="basket"><span>{orders}</span></div></Link>
            <div className="total_container">
              <h3>Корзина</h3>
              <h2 className='total'><span>{total}</span> ₸</h2>
            </div>
          </div>
        </div>
        <div className="line"></div>
      </header>
      <div className="header-for-mobile">
        <div className="header-top">
          <div className="burger" onClick={showHeaderMobile}>
            <div className="icon"></div>
          </div>
          <a href='/'><div className="logo"></div></a>
          <div className="basket_container">
            <Link to='/basket'><div className="basket"><span>{orders}</span></div></Link>
          </div>
        </div>
        <div className="line"></div>
        <div className="header-bottom">
          <div className="header-bottom-catalog">
            <Link className='link' to='/'>
              <div className="icon"></div>
              <h2>Каталог</h2>
            </Link>
          </div>
          <div className="dotted"></div>
          <div className="header-bottom-search">
            <div className="icon"></div>
            <h2>Поиск</h2>
          </div>
        </div>
        <div className="line"></div>
        {showHeader ?
          <div className="show-header">
            <div className="header-mobile-info">
              <div className="location">
                <div className="icon geo"></div>
                <div className="text">
                  <h3>г. Кокчетав, ул. Ж. Ташенова 129Б</h3>
                  <p>(Рынок Восточный)</p>
                </div>
              </div>
              <div className="email">
                <div className="icon mail"></div>
                <div className="text">
                  <h3>opt.sultan@mail.ru</h3>
                  <p>На связи в любое время</p>
                </div>
              </div>
              <div className="sell">
                <div className="icon sell"></div>
                <div className="text">
                  <h3>Отдел продаж</h3>
                  <p>+7 (777) 490-00-91</p>
                  <p>время работы: 9:00-20:00</p>
                </div>
              </div>
              <div className="order-call">
                <div className="call">
                  <div className="icon"></div>
                </div>
                <h2>Заказать звонок</h2>
              </div>
            </div>
            <div className="dotted"></div>
            <div className="nav">
              <h2>Меню сайта:</h2>
              <nav>
                <ul>
                  <li>О компании</li>
                  <li>Доставка и оплата</li>
                  <li>Возврат</li>
                  <li>Контакты</li>
                </ul>
              </nav>
              <button className='price-btn'>
                Прайс-лист
                <div className="icon"></div>
              </button>
            </div>
          </div>
          :
          <></>}
      </div>
    </>
  )
}
