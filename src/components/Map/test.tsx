import { render } from '@testing-library/react'
import Map from '.'

describe('<Map />', () => {
  it('should render without any marker', () => {
    render(<Map />)
  })
})
