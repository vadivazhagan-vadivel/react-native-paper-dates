import * as React from 'react'
import {
  Modal,
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native'

import { Button, useTheme, Appbar } from 'react-native-paper'

import TimePicker from './TimePicker'
import {
  clockTypes,
  inputTypes,
  PossibleClockTypes,
  PossibleInputTypes,
} from './timeUtils'

import { themeContext } from '../Context/themeContext'

const supportedOrientations: (
  | 'portrait'
  | 'portrait-upside-down'
  | 'landscape'
  | 'landscape-left'
  | 'landscape-right'
)[] = [
  'portrait',
  'portrait-upside-down',
  'landscape',
  'landscape-left',
  'landscape-right',
]

export function TimePickerModal({
  visible,
  onDismiss,
  onConfirm,
  hours,
  minutes,
  uppercase = true,
  modal = true,
  animationType = 'none',
  locale,
  themeValue,
}: {
  locale?: undefined | string
  label?: string
  uppercase?: boolean
  cancelLabel?: string
  confirmLabel?: string
  hours?: number | undefined
  minutes?: number | undefined
  visible: boolean | undefined
  modal?: boolean
  onDismiss: () => any
  onConfirm: (hoursAndMinutes: { hours: number; minutes: number }) => any
  animationType?: 'slide' | 'fade' | 'none'
  keyboardIcon?: string
  clockIcon?: string
  themeValue: {
    secondaryColor: string
    primaryColor: string
    accentColor: string
    backgroundColor: string
    fontFamily: string
  }
}) {
  const theme = useTheme()

  const [inputType] = React.useState<PossibleInputTypes>(inputTypes.picker)
  const [focused, setFocused] = React.useState<PossibleClockTypes>(
    clockTypes.hours
  )
  const [localHours, setLocalHours] = React.useState<number>(getHours(hours))
  const [localMinutes, setLocalMinutes] = React.useState<number>(
    getMinutes(minutes)
  )

  React.useEffect(() => {
    setLocalHours(getHours(hours))
  }, [setLocalHours, hours])

  React.useEffect(() => {
    setLocalMinutes(getMinutes(minutes))
  }, [setLocalMinutes, minutes])

  const onFocusInput = React.useCallback(
    (type: PossibleClockTypes) => setFocused(type),
    []
  )
  const onChange = React.useCallback(
    (params: {
      focused?: PossibleClockTypes | undefined
      hours: number
      minutes: number
    }) => {
      if (params.focused) {
        setFocused(params.focused)
      }

      setLocalHours(params.hours)
      setLocalMinutes(params.minutes)
    },
    [setFocused, setLocalHours, setLocalMinutes]
  )

  const context = themeValue

  if (modal) {
    return (
      <themeContext.Provider value={context}>
        <Modal
          animationType={animationType}
          transparent={true}
          visible={visible}
          onRequestClose={onDismiss}
          presentationStyle="overFullScreen"
          supportedOrientations={supportedOrientations}
          statusBarTranslucent={true}
        >
          <>
            <TouchableWithoutFeedback onPress={onDismiss}>
              <View
                style={[
                  StyleSheet.absoluteFill,
                  styles.modalBackground,
                  { backgroundColor: theme.colors?.backdrop },
                ]}
              />
            </TouchableWithoutFeedback>
            <View
              style={[StyleSheet.absoluteFill, styles.modalRoot]}
              pointerEvents="box-none"
            >
              <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={'padding'}
              >
                <Animated.View
                  style={[
                    styles.modalContent,
                    {
                      backgroundColor: '#fff',
                      borderRadius: theme.isV3
                        ? theme.roundness * 6
                        : theme.roundness,
                    },
                  ]}
                >
                  <Appbar style={styles.appbarHeader}>
                    <Appbar.Action
                      icon={'close'}
                      onPress={onDismiss}
                      color={context.accentColor}
                      testID="react-native-paper-dates-close"
                    />
                    <Appbar.Content title={''} />
                    <Button
                      onPress={() =>
                        onConfirm({ hours: localHours, minutes: localMinutes })
                      }
                      textColor={context.accentColor}
                      uppercase={uppercase}
                    >
                      SAVE
                    </Button>
                  </Appbar>

                  <View style={styles.timePickerContainer}>
                    <TimePicker
                      locale={locale}
                      inputType={inputType}
                      focused={focused}
                      hours={localHours}
                      minutes={localMinutes}
                      onChange={onChange}
                      onFocusInput={onFocusInput}
                    />
                  </View>
                  <View style={styles.bottom} />
                </Animated.View>
              </KeyboardAvoidingView>
            </View>
          </>
        </Modal>
      </themeContext.Provider>
    )
  }

  return (
    <themeContext.Provider value={context}>
      <Animated.View
        style={[
          styles.modalContent,
          {
            backgroundColor: '#fff',
          },
        ]}
      >
        <Appbar style={styles.appbarHeader}>
          <Appbar.Action
            icon={'close'}
            onPress={onDismiss}
            color={context.accentColor}
            testID="react-native-paper-dates-close"
          />
          <Appbar.Content title={''} />
          <Button
            onPress={() =>
              onConfirm({ hours: localHours, minutes: localMinutes })
            }
            textColor={context.accentColor}
            uppercase={uppercase}
          >
            SAVE
          </Button>
        </Appbar>

        <View style={styles.timePickerContainer}>
          <TimePicker
            locale={locale}
            inputType={inputType}
            focused={focused}
            hours={localHours}
            minutes={localMinutes}
            onChange={onChange}
            onFocusInput={onFocusInput}
          />
        </View>
        <View style={styles.bottom} />
      </Animated.View>
    </themeContext.Provider>
  )
}

function getMinutes(minutes: number | undefined | null): number {
  return minutes === undefined || minutes === null
    ? new Date().getMinutes()
    : minutes
}
function getHours(hours: number | undefined | null): number {
  return hours === undefined || hours === null ? new Date().getHours() : hours
}

const styles = StyleSheet.create({
  modalRoot: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  keyboardView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalBackground: {
    flex: 1,
  },
  modalContent: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 3,
    minWidth: 287,
    paddingVertical: 8,
  },
  content: {
    minWidth: 287,
    paddingVertical: 8,
  },
  labelContainer: {
    justifyContent: 'flex-end',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
  },
  label: {
    letterSpacing: 1,
    fontSize: 13,
  },
  appbarHeader: {
    elevation: 0,
    backgroundColor: 'transparent',
  },
  timePickerContainer: {
    paddingLeft: 24,
    paddingTop: 20,
    paddingBottom: 16,
    paddingRight: 24,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  inputTypeToggle: { margin: 4 },
  fill: { flex: 1 },
})

export default React.memo(TimePickerModal)
