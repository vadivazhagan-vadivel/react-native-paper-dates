import * as React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import renderer from 'react-test-renderer'
import DatePickerModalContent from '../../Date/DatePickerModalContent'

it('renders DatePickerModalContent', () => {
  const tree = renderer
    .create(
      <SafeAreaProvider>
        <DatePickerModalContent
          locale={'en'}
          mode="range"
          onDismiss={() => null}
          startDate={new Date('01/01/2022')}
          endDate={new Date('01/02/2022')}
          onConfirm={() => null}
          themeValue={{
            secondaryColor: '#fff',
            primaryColor: '#1060e0',
            accentColor: '#070707',
            backgroundColor: '#ECE9E1',
            fontFamily: 'Roboto',
          }}
        />
      </SafeAreaProvider>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
