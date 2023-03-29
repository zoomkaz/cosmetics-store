import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './css/Card.css'

const Card = () => {
  const [count, setCount] = useState(1)

  let { state } = useLocation()
  let item = state

  let currentPrice = (item.price * count).toFixed(2)

  const minus = () => {
    let countVal = count
    if (countVal === 1) {
      setCount(countVal)
      return
    }
    countVal--;
    setCount(countVal)
  }
  const plus = () => {
    let countVal = count
    countVal++;
    setCount(countVal)
  }

  const showDesc = (e: any) => {
    let div = e.target.nextSibling
    let arrow = e.target.children[0]

    try {
      if ((div as HTMLElement).style.display !== 'block' && (arrow as HTMLElement).style.transform !== 'rotate(180deg)') {
        (div as HTMLElement).style.display = 'block';
        (arrow as HTMLElement).style.transform = `rotate(180deg)`;
      } else {
        (div as HTMLElement).style.display = 'none';
        (arrow as HTMLElement).style.transform = `rotate(0deg)`;
      }
    } catch (error) {
    }
  }

  const toBasket = () => {
    localStorage.setItem(`${item.code}`, JSON.stringify({ item, count, 'currentPrice': +currentPrice / count }))
    let ordersHeaders = document.querySelectorAll('.basket span')
    let totalHeader = document.querySelector('.total_container .total span')
    let currentCount = 0;
    let currentTotal = 0;

    Object.keys(localStorage).forEach((code: any) => {
      let elem = JSON.parse(localStorage.getItem(code)!)
      if (code !== 'info') {
        currentCount += 1
        currentTotal += elem.currentPrice * elem.count
      }
    })
    if (ordersHeaders) {
      ordersHeaders.forEach(item => {
        item.textContent = currentCount.toString()
      })
    }
    if (totalHeader) {
      totalHeader.textContent = (+currentTotal).toFixed(2).toString()
    }
  }


  return (
    <div className="item_container content">
      <div className="links">
        <div className="left">
          <Link to={'/'} className='main'>Главная</Link>
          <div className="dotted"></div>
          <Link to={'/'} className='cosmetic'>Косметика и гигиена</Link>
          <div className="dotted"></div>
          <p className='item-name'>{item.name}</p>
        </div>
        <div className="mobile-links">
          <Link to={'/'} className='mobile-link'><div className='back'></div>Назад</Link>
        </div>
      </div>
      <div className='item'>
        <div className='item_image' style={{ backgroundImage: `url(img/${item.url})`, backgroundSize: `contain` }}></div>
        <div className="info">
          <p className='stoke'>В наличии</p>
          <div className="title"><span>{item.brand}</span>{item.name}</div>
          <div className="weight">{item.weight} {item.typeWeight}</div>
          <div className="price">
            <span>{currentPrice} ₸</span>
            <div className="count">
              <button className='-' onClick={minus}>-</button>
              <span>{count}</span>
              <button className='+' onClick={plus}>+</button>
            </div>
            <button className='to-basket' onClick={toBasket}>В КОРЗИНУ <div className="icon"></div></button>
          </div>
          <div className="some-info">
            <div className="share">
              <div className="icon"></div>
            </div>
            <div className="bonus">
              <p>При покупке от <span>10 000 ₸</span> бесплатная доставка по Кокчетаву и области</p>
            </div>
            <div className="price-list">
              <p>Прайс-лист</p>
              <div className="icon"></div>
            </div>
          </div>
          <div className="manufacturer">Производитель: <span>{item.manufacturer}</span></div>
          <div className="brand">Бренд: <span>{item.brand}</span></div>
          <div className="articul">Артикул: <span>460404</span></div>
          <div className="code">Штрихкод: <span>{item.code}</span></div>
          <div className="desc">
            <h2 onClick={showDesc}>Описание <div className='icon'></div></h2>
            <div className='show'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nullam interdum ut justo, vestibulum sagittis iaculis iaculis.
              Quis mattis vulputate feugiat massa vestibulum duis.
              Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis.
              Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.</div>
          </div>
          <div className="dotted"></div>
          <div className="skills">
            <h2 onClick={showDesc}>Характеристики <div className='icon'></div></h2>
            <div className='show'>
              <p>Назначение: <span>{item.brand}</span></p>
              <p>Тип: <span>{item.brand}</span></p>
              <p>Производитель: <span>{item.manufacturer}</span></p>
              <p>Бренд: <span>{item.brand}</span></p>
              <p>Артикул: <span>460404</span></p>
              <p>Штрихкод: <span>{item.code}</span></p>
              <p>Вес: <span>{item.weight}</span></p>
              <p>Объём: <span>{item.weight} {item.typeWeight}</span></p>
              <p>Кол-во в коробке: <span>{item.weight} {item.typeWeight}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card