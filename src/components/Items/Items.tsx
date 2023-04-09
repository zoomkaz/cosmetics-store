import React from 'react'
import { NavLink } from 'react-router-dom'
import './css/Items.css'

const Items = ({ items, loading }: any) => {



  if (items.length === 0) {
    return <div>Ничего не найдено. Укажите цену, производителя и выберите категорию</div>
  }

  return (
    <div className="items_container">
      {items.map((item: any, index: any) => {
        return <div className='item' key={index.toString()}>
          <NavLink to={`/card/${item.code}`} data-testid='card-link' state={item}>
            <div className='item_image' style={{ backgroundImage: `url(img/${item?.url})`, backgroundPosition: `center`, backgroundSize: `contain` }}></div>
            <div className="weight">{item?.weight} {item?.typeWeight}</div>
            <div className="title"><span>{item?.brand}</span>{item?.name}</div>
            <div className="code">Штрихкод: <span>{item?.code}</span></div>
            <div className="manufacturer">Производитель: <span>{item?.manufacturer}</span></div>
            <div className="brand">Бренд: <span>{item?.brand}</span></div>
            <div className="price">
              <span>{item?.price} ₸</span>
              <button onClick={() => {
                localStorage.setItem(`${item.code}`, JSON.stringify({ item, 'count': 1, 'currentPrice': item.price }))
              }}>В КОРЗИНУ <div className="icon"></div>
              </button>
            </div>
          </NavLink>
        </div >
      })}
    </div >
  )
}

export default Items