import { render, screen } from '@testing-library/react'
import Map from '.'

describe('<Map />', () => {
  it('should render without any marker', () => {
    render(<Map />)

    // screen.logTestingPlaygroundURL()
    expect(
      screen.getByRole('link', {
        name: /openstreetmap/i
      })
    ).toBeInTheDocument()
  })

  it('should render with at least one marker', () => {
    const placeOne = {
      name: 'São Paulo',
      latitude: 51.505,
      longitude: -0.09
    }

    render(<Map place={placeOne} />)

    expect(screen.getByTitle(/São Paulo/i)).toBeInTheDocument()
  })
})
