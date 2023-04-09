import React from 'react'
import '@testing-library/jest-dom'
import { HashRouter } from 'react-router-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import Catalog from "../Catalog/Catalog";
import userEvent from '@testing-library/user-event';

describe('Test Catalog', () => {
  test('click event', () => {
    render(<HashRouter><Catalog /></HashRouter>);
    const btn = screen.getByTestId('admin-panel-btn');
    expect(screen.queryByTestId('admin-div')).toBeNull()
    fireEvent.click(btn)
    expect(screen.queryByTestId('admin-div')).toBeInTheDocument()
    fireEvent.click(btn)
    expect(screen.queryByTestId('admin-div')).toBeNull()
  })

  test('input event', () => {
    render(<HashRouter><Catalog /></HashRouter>);
    const inputElem = screen.getByPlaceholderText(/поиск.../i);
    fireEvent.input(inputElem, {
      target: { value: 's' }
    })
    expect(screen.getByTestId('error')).toHaveStyle({ display: 'block' })
  })

  test('render manufacturers', () => {
    render(<HashRouter><Catalog /></HashRouter>);
    const manufacturers = screen.queryAllByTestId('manufacturer')
    expect(manufacturers.length).toBe(21)
  })

  test('check class of first category', () => {
    render(<HashRouter><Catalog /></HashRouter>);
    const categories: any = screen.queryAllByTestId('category')
    userEvent.click(categories[0])
    expect(categories[0].classList[1]).toEqual('active')
  })
})