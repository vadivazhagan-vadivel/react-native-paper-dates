import * as React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import renderer from 'react-test-renderer'
import DatePickerModal from '../../Date/DatePickerModal'

it('renders DatePickerModal', () => {
  const tree = renderer
    .create(
      <SafeAreaProvider>
        <DatePickerModal
          locale="en"
          mode="single"
          visible
          onDismiss={() => null}
          date={new Date('01/01/2022')}
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
