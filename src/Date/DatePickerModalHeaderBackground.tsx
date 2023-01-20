import { Animated, StyleSheet } from 'react-native'
import * as React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { themeContext } from '../Context/themeContext'

// forward style
export default function DatePickerModalHeaderBackground({
  children,
}: {
  children: any
}) {
  const LocalTheme = React.useContext(themeContext)
  const backgroundColor = LocalTheme.accentColor

  const insets = useSafeAreaInsets()
  return (
    <Animated.View
      style={[
        styles.animated,
        {
          backgroundColor: backgroundColor,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  animated: {
    elevation: 4,
  },
})
