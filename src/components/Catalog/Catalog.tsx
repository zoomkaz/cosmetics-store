import React, { FC, useState, useEffect } from 'react'
import './css/Catalog.css'
import { Link } from 'react-router-dom'
import { ICatalog } from '../../types/types'
import dataJSON from '../../data.json'
import Items from '../Items/Items'
import Pagination from '../Pagination/Pagination'
import { MdOutlineModeEdit, MdOutlineDeleteOutline, MdOutlineDone } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'



const Catalog: FC = () => {
  const [categoryList, setCategoryList] = useState<string[]>([`Все`, `Уход за телом`, 'Уход за руками', 'Уход за ногами', 'Уход за лицом', 'Уход за волосами',
    'Средства для загара', 'Средства для бритья', 'Подарочные наборы', 'Гигиеническая продукция', 'Гигиена полости рта', 'Бумажная продукция'])
  const [items, setItems] = useState<ICatalog[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(9)
  const [show, setShow] = useState<boolean>(false)
  const [params, setParams] = useState(false)

  const [currentItems, setCurrentItems] = useState<ICatalog[]>(items)
  const [manufacturerItems, setManufacturerItems] = useState(items)
  const [maxPriceItem, setMaxPriceItem] = useState(0)
  const [maxPriceInputValue, setMaxPriceInputValue] = useState(maxPriceItem)
  const [minPriceInputValue, setMinPriceInputValue] = useState(0)

  useEffect(() => {
    setLoading(true)
    setItems(dataJSON)
    setManufacturerItems(dataJSON)

    let paramsBtn = document.querySelector('.params .icon')
    let manufacturerDiv = document.querySelector('.manufacturer')

    if (params) {
      (paramsBtn as HTMLElement).style.transform = `rotate(-90deg)`;
      (manufacturerDiv?.children[0] as HTMLElement).style.display = `block`;
      (manufacturerDiv?.children[1] as HTMLElement).style.display = `block`;
      (manufacturerDiv?.children[2] as HTMLElement).style.display = `block`;
      (manufacturerDiv?.children[3] as HTMLElement).style.display = `block`;
      (manufacturerDiv?.children[4].children[0] as HTMLElement).style.display = `flex`;

    } else if (!params) {
      (paramsBtn as HTMLElement).style.transform = `rotate(90deg)`;
      (manufacturerDiv?.children[0] as HTMLElement).style.display = `none`;
      (manufacturerDiv?.children[1] as HTMLElement).style.display = `none`;
      (manufacturerDiv?.children[2] as HTMLElement).style.display = `none`;
      (manufacturerDiv?.children[3] as HTMLElement).style.display = `none`;
      (manufacturerDiv?.children[4].children[0] as HTMLElement).style.display = `none`;
    }

    for (let i = 0; i < dataJSON.length; i++) {
      if (+dataJSON[i].price > maxPriceItem) {
        setMaxPriceItem(Number(dataJSON[i].price))
      }
    }

    setCurrentItems(items)

    let topCategoryList = document.querySelectorAll('.category_container .category')
    let leftCategoryList = document.querySelectorAll('.category_container-left .category')
    topCategoryList[0]?.classList.add('active')
    leftCategoryList[0]?.classList.add('active')
    let manufacturerList = document.querySelectorAll('.manufacturer-item')
    for (let i = 0; i < manufacturerList.length; i++) {
      if (+manufacturerList[i].children[0].id > 2) {
        (manufacturerList[i] as HTMLElement).style.display = 'none'
      }
    }

    if (window.screen.availWidth >= 768) {
      setParams(true)
    }

    setLoading(false)
  }, [maxPriceItem, items, params])

  const lastItemIndex = currentPage * itemsPerPage
  const firstItemIndex = lastItemIndex - itemsPerPage
  const currentItem = currentItems.slice(firstItemIndex, lastItemIndex)


  const paginate = (pageNumber: any) => setCurrentPage(pageNumber)

  const nextPage = () => {
    setCurrentPage(prev => prev === Math.ceil(currentItems.length / itemsPerPage) ? prev : prev + 1)
    let elem = document.querySelector('.page-number-container.active')
    if (Number(elem?.children[0].textContent) < Math.ceil(currentItems.length / itemsPerPage)) {
      elem?.classList.remove('active');
      (elem?.attributes[1].ownerElement?.nextSibling as HTMLElement).classList.add('active')
    }
  }
  const prevPage = () => {
    setCurrentPage(prev => prev === 1 ? prev : prev - 1)
    let elem = document.querySelector('.page-number-container.active')
    if (Number(elem?.children[0].textContent) > 1) {
      elem?.classList.remove('active');
      (elem?.attributes[1].ownerElement?.previousSibling as HTMLElement).classList.add('active')
    }
  }

  let res: any = {}

  let showHandler = (e: any) => {
    let manufacturerList = document.querySelectorAll('.manufacturer-item')
    if (show && e.target.localName === 'span') {
      for (let i = 0; i < manufacturerList.length; i++) {
        if (+manufacturerList[i].children[0].id > 2) {
          (manufacturerList[i] as HTMLElement).style.display = 'none'
        }
      }
      e.target.innerHTML = 'Показать все <div class="icon"></div>';
      setShow(false)
    } else if (!show && e.target.localName === 'span') {
      for (let i = 0; i < manufacturerList.length; i++) {
        (manufacturerList[i] as HTMLElement).style.display = 'flex'
      }
      e.target.innerHTML = 'Скрыть <div class="icon-reverse"></div>';
      setShow(true)
    }
  }



  const [checkedManufacturers, setCheckedManufacturers] = useState<string[]>([])
  const [someCheck, setSomeCheck] = useState(false)

  const chooseManufacturer = (e: any) => {
    setCurrentItems(items)

    let topCategoryList = document.querySelectorAll('.category_container .category')
    let leftCategoryList = document.querySelectorAll('.category_container-left .category')

    if (e.target.parentElement.className === 'category_container') {
      topCategoryList.forEach(elem => {
        elem.classList.remove('active')
      })

      e.target.classList.add('active')

      leftCategoryList.forEach(elem => {
        elem.classList.remove('active')
      })

      for (let i = 0; i < leftCategoryList.length; i++) {
        if (e.target.textContent === leftCategoryList[i].textContent) {
          (leftCategoryList[i] as HTMLElement).classList.add('active')
        }
      }
    } else if (e.target.parentElement.className === 'category_container-left') {
      leftCategoryList.forEach(elem => {
        elem.classList.remove('active')
      })

      e.target.classList.add('active')

      topCategoryList.forEach(elem => {
        elem.classList.remove('active')
      })

      for (let i = 0; i < topCategoryList.length; i++) {
        if (e.target.textContent === topCategoryList[i].textContent) {
          (topCategoryList[i] as HTMLElement).classList.add('active')
        }
      }
    }


    let manufacturerList = document.querySelectorAll('.manufacturer-list')[0].children
    let currentCategory: any = ''
    let categoriesList: any = document.querySelector('.category_container')

    for (let i = 0; i < categoriesList.children.length; i++) {
      for (let j = 0; j < categoriesList.children[i].classList.length; j++) {
        if (categoriesList.children[i].classList[j] === 'active') {
          currentCategory = categoriesList.children[i].textContent
        }
      }
    }

    if (someCheck) {
      for (let i = 0; i < manufacturerList.length; i++) {
        let manufacturerName: any = ''
        if (manufacturerList[i].textContent?.indexOf(' ') !== manufacturerList[i].textContent?.lastIndexOf(' ')) {
          manufacturerName = `${manufacturerList[i].textContent?.split(' ')[0]} ${manufacturerList[i].textContent?.split(' ')[1]}`
        } else {
          manufacturerName = manufacturerList[i].textContent?.split(' ')[0]
        }

        let temp: any[] = checkedManufacturers

        if ((manufacturerList[i].children[0] as HTMLInputElement).checked) {
          temp.push(manufacturerName)
          setCheckedManufacturers(temp)
          setCurrentItems(items.filter((item) => checkedManufacturers.includes(item.manufacturer) && +item.price <= maxPriceInputValue && +item.price >= minPriceInputValue && item.category.indexOf(currentCategory) !== -1))
        } else if (!(manufacturerList[i].children[0] as HTMLInputElement).checked) {
          let i = -1
          while ((i = temp.indexOf(manufacturerName, i + 1)) !== -1) {
            delete temp[i]
          }
          setCheckedManufacturers(temp)
          setCurrentItems(items.filter((item) => checkedManufacturers.includes(item.manufacturer) && +item.price <= maxPriceInputValue && +item.price >= minPriceInputValue && item.category.indexOf(currentCategory) !== -1))
        }
      }
    } else if (currentCategory === 'Все') {
      setCurrentItems(items)
    } else {
      setCurrentItems(items.filter((item) => item.category.indexOf(currentCategory) !== -1))
    }

  }


  const checkCheck = () => {
    let manufacturerList = document.querySelectorAll('.manufacturer-list')[0].children
    for (let i = 0; i < manufacturerList.length; i++) {
      if ((manufacturerList[i].children[0] as HTMLInputElement).checked) {
        setSomeCheck(true)
        return
      } else {
        setSomeCheck(false)
      }
    }
  }

  const clearChoose = () => {
    let manufacturerList = document.querySelectorAll('.manufacturer-list')[0].children

    for (let i = 0; i < manufacturerList.length; i++) {
      (manufacturerList[i].children[0] as HTMLInputElement).checked = false
    }

    let topCategoryList = document.querySelectorAll('.category_container .category')
    let leftCategoryList = document.querySelectorAll('.category_container-left .category')

    topCategoryList.forEach(elem => {
      elem.classList.remove('active')
    })
    leftCategoryList.forEach(elem => {
      elem.classList.remove('active')
    })

    topCategoryList[0].classList.add('active')
    leftCategoryList[0].classList.add('active')

    let inputs: any = document.querySelector('.inputs')
    inputs.children[0].value = ''
    inputs.children[1].value = ''


    setMaxPriceInputValue(maxPriceItem)
    setMinPriceInputValue(0)
    setSomeCheck(false)
    setCurrentItems(items)
  }

  const checkFloorInput = (e: any) => {
    if (!Number.isFinite(+e.target.value)) {
      e.target.value = ''
    } else if (+e.target.value > maxPriceItem) {
      e.target.value = maxPriceItem
    }
    setMinPriceInputValue(+e.target.value ? +e.target.value : 0)
  }

  const checkUpInput = (e: any) => {
    if (!Number.isFinite(+e.target.value)) {
      e.target.value = ''
    } else if (+e.target.value > maxPriceItem) {
      e.target.value = maxPriceItem
    }
    setMaxPriceInputValue(+e.target.value ? +e.target.value : maxPriceItem)
  }


  const [, setReload] = useState<any>('')

  const sortTypes: any = {
    "price": (a: any, b: any) => +a.price - +b.price,
    "name": (a: any, b: any) => (a.name).localeCompare(b.name),
    "up": (a: any, b: any) => a.id - b.id,
    "down": (a: any, b: any) => b.id - a.id,
  }

  const handleSelect = (e: any) => {
    setReload(e.target.value)
    currentItems.sort(sortTypes[e.target.value])
  }

  const clearInputStyle = (e: any) => {
    e.target.style.border = '';
    e.target.style.background = '#ededed';
    (document.querySelector('.search-error') as HTMLElement).style.display = 'none';
  }

  const changeInputManufacturer = (e: any) => {
    if (!e.target.value) {
      setManufacturerItems(items)
    }
  }

  const searchManufacturer = (e: any) => {
    let temp = []
    if (e.target.tagName === 'DIV') {
      let input = e.target.parentElement.previousSibling
      if (input.value.trim()) {
        temp = items.filter(item => item.manufacturer === input.value)
        setManufacturerItems(temp);
      } else {
        input.style.border = `1px solid red`;
        input.style.background = `rgb(252, 187, 187)`;
      }
    } else if (e.target.tagName === 'BUTTON') {
      let input = e.target.previousSibling
      if (input.value.trim()) {
        temp = items.filter(item => item.manufacturer === input.value)
        setManufacturerItems(temp);
      } else {
        input.style.border = `1px solid red`;
        input.style.background = `rgb(252, 187, 187)`;
      }
    }

    if (temp.length === 0) {
      (document.querySelector('.search-error') as HTMLElement).style.display = 'block';
    }
  }

  // =============================admin==================================

  const [showAdmin, setShowAdmin] = useState(false)

  const showAdminPanel = () => {
    showAdmin ? setShowAdmin(false) : setShowAdmin(true)
  }

  const closeAdminPanel = () => {
    setShowAdmin(false)
  }

  const showAdminEdit = (e: any) => {
    let edit: any = ''
    if (e.target.localName === 'path') {
      edit = e.target.parentElement.parentElement.parentElement.children[0].children[1]
      if (e.target.parentElement.classList[1] !== 'active') {
        e.target.parentElement.classList.add('active')
        edit.style.display = 'flex'
      } else {
        e.target.parentElement.classList.remove('active')
        edit.style.display = 'none'
      }
    } else {
      edit = e.target.parentElement.parentElement.children[0].children[1]
      if (e.target.classList[1] !== 'active') {
        e.target.classList.add('active')
        edit.style.display = 'flex'
      } else {
        e.target.classList.remove('active')
        edit.style.display = 'none'
      }
    }
  }

  let adminItems: any = currentItems

  const deleteAdminItem = (e: any) => {
    if (e.target.id !== '' || e.target.parentElement.id !== '') {
      for (let i = 0; i < adminItems.length; i++) {
        if (adminItems[i].id === e.target.id) {
          adminItems.splice(adminItems.indexOf(adminItems[i]), 1)
          setCurrentItems(adminItems)
        }
      }
      setShowAdmin(false)
      setTimeout(() => {
        setShowAdmin(true)
      }, 5);
    }
  }

  const saveItemChange = (e: any) => {
    let elemID = e.target.parentElement.parentElement.parentElement.id

    let brand = e.target.parentElement.children[0].children[0].value
    let code = e.target.parentElement.children[1].children[0].value
    let desc = e.target.parentElement.children[2].children[0].value
    let manufacturer = e.target.parentElement.children[3].children[0].value
    let name = e.target.parentElement.children[4].children[0].value
    let price = e.target.parentElement.children[5].children[0].value
    let weight = e.target.parentElement.children[6].children[0].value
    let typeWeight = e.target.parentElement.children[7].children[0].value
    let url = e.target.parentElement.children[8].children[0].value
    let categories = e.target.parentElement.children[9].children[0].value

    adminItems.map((element: any) => {
      if (element.id === elemID) {
        element.brand = brand.trim() ? brand : element.brand
        element.code = code.trim() ? code : element.code
        element.desc = desc.trim() ? desc : element.desc
        element.manufacturer = manufacturer.trim() ? manufacturer : element.manufacturer
        element.name = name.trim() ? name : element.name
        element.price = price.trim() ? price : element.price
        element.weight = weight.trim() ? weight : element.weight
        element.typeWeight = typeWeight.trim() ? typeWeight : element.typeWeight
        element.url = url.trim() ? url : element.url
        element.category = categories.trim() ? categories : element.category
      }
    });

    setCurrentItems(adminItems)
    setShowAdmin(false)
    setTimeout(() => {
      setShowAdmin(true)
    }, 5);
  }

  const deleteAdminCategory = (e: any) => {
    let categories = categoryList
    delete categories[e.target.id]
    setCategoryList(categories)
    setShowAdmin(false)
    setTimeout(() => {
      setShowAdmin(true)
    }, 5);
  }

  const saveCategoryEdit = (e: any) => {
    let categories = categoryList
    let editCategory = e.target.parentElement.children[0].children[0].value

    categories[e.target.id] = editCategory.trim() ? editCategory : categories[e.target.id]

    setCategoryList(categories)
    setShowAdmin(false)
    setTimeout(() => {
      setShowAdmin(true)
    }, 5);
  }


  const showAddAdminCategory = (e: any) => {
    let show = e.target.parentElement.parentElement.children[1]
    if (show.style.display === 'flex' && show.tagName === 'LABEL') {
      show.style.display = 'none'
      e.target.parentElement.style.color = ''
      e.target.parentElement.style.transform = 'scale(1)'
    } else if (show.style.display !== 'flex' && show.tagName === 'LABEL') {
      show.style.display = 'flex'
      e.target.parentElement.style.color = '#ffc85e'
      e.target.parentElement.style.transform = 'scale(1.3)'
    }
  }

  const adminDone = () => {
    let categories = categoryList;
    let input = document.querySelector('.admin-input-category input');

    let newCategory = (input as HTMLInputElement).value.trim() ? (input as HTMLInputElement).value.trim() : '';

    if (newCategory) {
      categories.push(newCategory)
      setCategoryList(categories)
      setShowAdmin(false)
      setTimeout(() => {
        setShowAdmin(true)
      }, 5);
    }
  }


  let adminDiv = showAdmin ?
    <div className='admin-div' data-testid='admin-div'>
      <div className="admin-top">
        <h2 className='admin-title'>Admin Panel</h2>
        <div className="admin-close" onClick={closeAdminPanel}></div>
      </div>
      <div className="admin-main-container">
        <div className="admin-items-list">
          <h3>Список товаров:</h3>
          {currentItems.map((item: any, index: any) => {
            return <div className='admin-item' id={item.id} key={index.toString()}>
              <div className='admin-item-left'>
                <h2>ID: {item.id}. <span>{item.brand}</span> {item.name}</h2>
                <div className="admin-item-edit">
                  <label htmlFor="1">Бренд:<input type="text" id="1" placeholder={item.brand} /></label>
                  <label htmlFor="2">Штрихкод:<input type="text" id="2" placeholder={item.code} /></label>
                  <label htmlFor="3">Описание:<input type="text" id="3" placeholder={item.desc} /></label>
                  <label htmlFor="4">Производитель:<input type="text" id="4" placeholder={item.manufacturer} /></label>
                  <label htmlFor="5">Название:<input type="text" id="5" placeholder={item.name} /></label>
                  <label htmlFor="6">Цена:<input type="text" id="6" placeholder={item.price} /></label>
                  <label htmlFor="7">Вес:<input type="text" id="7" placeholder={item.weight} /></label>
                  <label htmlFor="8">Тип веса:<input type="text" id="8" placeholder={item.typeWeight} /></label>
                  <label htmlFor="9">URL изображения:<input type="text" id="9" placeholder={item.url} /></label>
                  <label htmlFor="10">Категории:<input type="text" id="10" placeholder={item.category} /></label>
                  <button className='admin-item-edit-save' onClick={saveItemChange}>Save</button>
                </div>
              </div>
              <div className="admin-icons">
                <MdOutlineModeEdit className='admin-icon' onClick={showAdminEdit} />
                <MdOutlineDeleteOutline className='admin-icon' id={item.id} onClick={deleteAdminItem} />
              </div>
            </div>
          })}
        </div>
        <div className="admin-categories-list">
          <div className="admin-categories-list-top">
            <h3>Список Категорий:</h3>
            <label className='admin-input-category' htmlFor="1">Введите название новой категории: <input type="text" id='1' /> <MdOutlineDone className='admin-done' onClick={adminDone} /></label>
            <FaPlus className='admin-category-add' onClick={showAddAdminCategory} />
          </div>
          {categoryList.map((item, index) => {
            return <div className='admin-category' key={index.toString()}>
              <div className="admin-category-left">
                <h2>ID: {index.toString()}. {item}</h2>
                <div className="admin-category-edit">
                  <label htmlFor="1">Новое значение категории: <input type="text" id='1' placeholder={item} /></label>
                  <button className='admin-category-edit-save' id={index.toString()} onClick={saveCategoryEdit}>SAVE</button>
                </div>
              </div>
              <div className="admin-icons">
                <MdOutlineModeEdit className='admin-icon' onClick={showAdminEdit} />
                <MdOutlineDeleteOutline className='admin-icon' id={index.toString()} onClick={deleteAdminCategory} />
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
    :
    null

  // =============================admin==================================


  const showParams = (e: any) => {
    params ? setParams(false) : setParams(true)
  }


  return (
    <div className='catalog content' data-testid='catalog-page'>
      {adminDiv}
      <div className="links">
        <div className="left">
          <Link to={'/'} className='main' data-testid='main-link'>Главная</Link>
          <div className="dotted"></div>
          <p className='cosmetic'>Косметика и гигиена</p>
        </div>
        <div className="mobile-links">
          <Link to={'/'} className='mobile-link'><div className='back'></div>Назад</Link>
        </div>
        <div className="admin" onClick={showAdminPanel} data-testid='admin-panel-btn'>Admin Panel</div>
      </div>
      <div className="title">
        <h1>Косметика и гигиена</h1>
        <div className="title-sort">
          Сортировка:
          <select name="" id="" onChange={handleSelect} >
            <option value="name">по названию</option>
            <option value="price">по цене</option>
            <option value="up">по возрастанию</option>
            <option value="down">по убыванию</option>
          </select>
        </div>
      </div>
      <div className="category_container">
        {categoryList.map((item, index) => {
          return <div onClick={chooseManufacturer} className='category' key={index.toString()}>{item}</div>
        })}
      </div>
      <div className="main_container">
        <div className="params">
          <h2>ПОДБОР ПО ПАРАМЕТРАМ <div className="icon" onClick={showParams}></div></h2>
          {
            params ?
              <div className="price">
                <h3>Цена <span>₸</span></h3>
                <div className="inputs">
                  <input type="text" placeholder='0' onChange={checkFloorInput} />
                  -
                  <input type="text" placeholder={String(maxPriceItem)} onChange={checkUpInput} />
                </div>
              </div>
              :
              <></>
          }
          <div className="manufacturer">
            <h3>Производитель</h3>
            <div className="search">
              <div>
                <input type="text" placeholder='Поиск...' onClick={clearInputStyle} onChange={changeInputManufacturer} />
                <button onClick={searchManufacturer}><div className="icon"></div></button>
              </div>
              <p className='search-error' data-testid='error'>Ничего не найдено. Измените запрос</p>
            </div>
            <div className="manufacturer-list">
              {manufacturerItems.map((item) => {
                if (!(item.manufacturer in res)) {
                  res[item.manufacturer] = 1
                } else if (item.manufacturer in res) {
                  res[item.manufacturer] = res[item.manufacturer] + 1
                }
                return null
              })}
              {Object.keys(res).map((key, index) => {
                return <label className='manufacturer-item' data-testid='manufacturer' key={index.toString()} htmlFor={index.toString()} onChange={checkCheck}>
                  <input type="checkbox" id={index.toString()} />{key} <span>({res[key]})</span>
                </label>
              })}
            </div>
            <div className="show-all"><span onClick={showHandler}>Показать все <div className="icon"></div></span></div>
            <div className="use-container">
              <div className="use-delete">
                <button className='use' onClick={chooseManufacturer}>Применить</button>
                <button className='delete' onClick={clearChoose}></button>
              </div>
              <div className="category_container-left">
                {categoryList.map((item, index) => {
                  return <div onClick={chooseManufacturer} className='category' data-testid='category' key={index.toString()}>{item}</div>
                })}
              </div>
            </div>
          </div>
        </div>
        <div className='right-side'>
          <div className="title-sort">
            Сортировка:
            <select name="" id="" onChange={handleSelect} >
              <option value="name">по названию</option>
              <option value="price">по цене</option>
              <option value="up">по возрастанию</option>
              <option value="down">по убыванию</option>
            </select>
          </div>
          <Items items={currentItem} loading={loading} />
          <div className='paginstion_container'>
            <div className="arrow-left" onClick={prevPage}></div>
            <Pagination itemsPerPage={itemsPerPage} totalItems={currentItems.length} paginate={paginate} />
            <div className="arrow-right" onClick={nextPage}></div>
          </div>
          <div className="desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, vestibulum sagittis iaculis iaculis.
            Quis mattis vulputate feugiat massa vestibulum duis.
            Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis.
            Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.
          </div>
        </div>
      </div>
    </div >
  )
}

export default Catalog;