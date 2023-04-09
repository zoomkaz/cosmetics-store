import React from 'react'
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Catalog from '../Catalog/Catalog';
import Basket from '../Basket/Basket';
import { Header } from '../Header/Header';

describe('Test Router', () => {
  test('router test', () => {
    render(<MemoryRouter><Catalog /></MemoryRouter>);
    const mainLink: any = screen.queryByTestId('main-link')
    userEvent.click(mainLink);
    expect(screen.queryByTestId('catalog-page')).toBeInTheDocument();
  })

  test('router link basket test', () => {
    render(
      <MemoryRouter initialEntries={['/basket']}>
        <Header />
        <Routes>
          <Route path='/basket' element={<Basket />} />
        </Routes>
      </MemoryRouter>
    );
    const basketLink: any = screen.getByTestId('basket-link')
    userEvent.click(basketLink);
    expect(screen.getByTestId('basket-empty-page')).toBeInTheDocument();
  })

  test('router link to / test', () => {
    render(
      <MemoryRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Catalog />} />
        </Routes>
      </MemoryRouter>
    );
    const logo: any = screen.queryByTestId('logo')
    userEvent.click(logo)
    expect(screen.getByTestId('catalog-page')).toBeInTheDocument()
  })
})