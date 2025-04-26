import { useSelect, useValue } from 'react-cosmos/client'

import FixtureTest from './FixtureTest'
import { StoreWrapper } from './StoreWrapper'

export default () => {
  const [bool] = useValue('bool', { defaultValue: false })

  return (
    <StoreWrapper>
      <FixtureTest bool={bool} />
    </StoreWrapper>
  )
}
