import { render } from '@testing-library/react'
import React from 'react'

import Home from '@/app/page'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    expect(true).toBeTruthy()
  })
})
