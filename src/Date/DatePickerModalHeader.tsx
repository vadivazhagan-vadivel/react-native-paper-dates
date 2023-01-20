import * as React from 'react'
import { Animated, StyleSheet } from 'react-native'
import { Appbar, Button } from 'react-native-paper'
import { themeContext } from '../Context/themeContext'
import { getTranslation } from '../translations/utils'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export interface DatePickerModalHeaderProps {
  disableSafeTop?: boolean
  saveLabel?: string
  saveLabelDisabled?: boolean
  uppercase?: boolean
  onDismiss: () => void
  onSave: () => void
  locale: string | undefined
  closeIcon?: string
}

export default function DatePickerModalHeader(
  props: DatePickerModalHeaderProps
) {
  const { disableSafeTop, locale, closeIcon = 'close' } = props
  const saveLabel = props.saveLabel || getTranslation(locale, 'save')
  const LocalTheme = React.useContext(themeContext)

  const color = LocalTheme.secondaryColor
  const insets = useSafeAreaInsets()

  return (
    <Animated.View
      style={[
        styles.animated,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          paddingTop: disableSafeTop ? 0 : insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <Appbar style={styles.appbarHeader}>
        <Appbar.Action
          icon={closeIcon}
          accessibilityLabel={getTranslation(locale, 'close')}
          onPress={props.onDismiss}
          color={color}
          testID="react-native-paper-dates-close"
        />
        <Appbar.Content title={''} />
        <Button
          color={color}
          textColor={color}
          onPress={props.onSave}
          disabled={props.saveLabelDisabled ?? false}
          uppercase={props.uppercase ?? true}
          testID="react-native-paper-dates-save"
        >
          {saveLabel}
        </Button>
      </Appbar>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  animated: {
    elevation: 4,
  },

  header: {
    height: 75,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 12,
  },
  headerContentContainer: { marginTop: 5, flexDirection: 'row' },
  label: { color: '#fff', letterSpacing: 1, fontSize: 13 },
  singleHeaderText: { color: '#fff', fontSize: 25 },
  rangeHeaderText: { color: '#fff', fontSize: 25 },
  headerTextFilled: { color: 'rgba(255,255,255,1)' },
  headerTextEmpty: { color: 'rgba(255,255,255,0.5)' },
  headerSeparator: {
    color: 'rgba(255,255,255,1)',
    fontSize: 25,
    paddingLeft: 6,
    paddingRight: 6,
  },
  appbarHeader: {
    elevation: 0,
    backgroundColor: 'transparent',
  },
})
