import React from 'react'
import '@testing-library/jest-dom'
import { HashRouter } from 'react-router-dom';
import { render, screen } from "@testing-library/react";
import { Header } from "../Header/Header";

describe('Test Header', () => {
  test('renders header elements', () => {
    render(<HashRouter><Header /></HashRouter>);
    const btnElems = screen.getAllByRole('button');
    const inputElem = screen.getByPlaceholderText(/поиск.../i);
    const topText = screen.getAllByText(/о компании/i);
    expect(btnElems[0]).toBeInTheDocument()
    expect(inputElem).toBeInTheDocument()
    expect(topText[0]).toMatchSnapshot()
  })

  test('renders header elements', async () => {
    render(<HashRouter><Header /></HashRouter>);
    const someElem = await screen.findByText(/на связи в любое время/i)
    expect(someElem).toBeInTheDocument()
  })

  test('check btn color', () => {
    render(<HashRouter><Header /></HashRouter>);
    const btnElem = screen.getAllByRole('button')
    expect(btnElem[0]).toHaveStyle({ background: `rgb(255, 200, 94);` })
  })
})