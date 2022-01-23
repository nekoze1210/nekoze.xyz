import { render, screen } from '@testing-library/react'
import React from 'react'
import Home from '@/pages/index'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    expect(screen.getAllByRole('list')).toBeTruthy()
  })
})
