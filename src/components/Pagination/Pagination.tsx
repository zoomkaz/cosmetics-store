import React from 'react'
import { Link } from 'react-router-dom'
import './css/Pagination.css'

const Pagination = ({ itemsPerPage, totalItems, paginate }: any) => {

  const pageNumbers: number[] = []

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  const changePage = (e: any, number: any) => {
    let numbersList = document.querySelectorAll('.page-number-container')
    if (e.target.localName === 'a') {
      for (let i = 0; i < numbersList.length; i++) {
        numbersList[i].classList.remove('active')
      }
      e.target.classList.add('active')

    } else if (e.target.localName === 'li') {
      for (let i = 0; i < numbersList.length; i++) {
        numbersList[i].classList.remove('active')
      }
      e.target.parentElement.classList.add('active')
    }

    paginate(number)
  }

  return (
    <ul className='pagination'>

      <div>
        {pageNumbers.map(number => {
          return <Link to='#' className='page-number-container active' key={number} onClick={(e: any) => changePage(e, number)}>
            <li className='page-number'>{number}</li>
          </Link>
        })}
      </div>
    </ul>
  )
}

export default Pagination