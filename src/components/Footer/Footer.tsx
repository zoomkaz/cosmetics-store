import React from 'react'
import './css/Footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="footer_container content">
        <div className="about">
          <div className="footer-logo"></div>
          <h3>Компания «Султан» — снабжаем розничные магазины товарами
            "под ключ" в Кокчетаве и Акмолинской области</h3>
          <p>Подпишись на скидки и акции</p>
          <div className="send-mail">
            <input type="text" placeholder='Введите ваш E-mail' />
            <button><div className="icon"></div></button>
          </div>
        </div>
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
        </div>
        <div className="categ">
          <h2>Категории:</h2>
          <ul>
            <li>Бытовая химия</li>
            <li>Косметика и гигиена</li>
            <li>Товары для дома</li>
            <li>Товары для детей и мам</li>
            <li>Посуда</li>
          </ul>
        </div>
        <div className="price-list">
          <h2>Скачать прайс-лист:</h2>
          <button className='price-btn'>
            Прайс-лист
            <div className="icon"></div>
          </button>
          <p>Связь в мессенджерах:</p>
          <div className="social">
            <div className="whatsapp"></div>
            <div className="telegram"></div>
          </div>
        </div>
        <div className="contacts">
          <h2>Контакты:</h2>
          <div className="tel">
            <h2>+7 (777) 490-00-91</h2>
            <h3>время работы: 9:00-20:00</h3>
            <p>Заказать звонок</p>
          </div>
          <div className="mail">
            <h3>opt.sultan@mail.ru</h3>
            <p>На связи в любое время</p>
          </div>
          <div className="cards">
            <div className="visa"></div>
            <div className="mastercard"></div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer