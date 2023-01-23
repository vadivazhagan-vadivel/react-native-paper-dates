import { Animated, StyleSheet, SafeAreaView } from 'react-native'
import * as React from 'react'
import { themeContext } from '../Context/themeContext'

// forward style
export default function DatePickerModalHeaderBackground({
  children,
}: {
  children: any
}) {
  const LocalTheme = React.useContext(themeContext)
  const backgroundColor = LocalTheme.accentColor

  return (
    <Animated.View
      style={[
        styles.animated,
        {
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <SafeAreaView>{children}</SafeAreaView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  animated: {
    elevation: 4,
  },
})
