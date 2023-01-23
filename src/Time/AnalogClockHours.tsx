import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { circleSize } from './timeUtils'
import { useTextColorOnPrimary } from '../utils'
import { DisplayModeContext } from './TimePicker'

import { themeContext } from '../Context/themeContext'

function AnalogClockHours({
  is24Hour,
  hours,
}: {
  is24Hour: boolean
  hours: number
}) {
  const { mode } = React.useContext(DisplayModeContext)
  const outerRange = getHourNumbers(false, circleSize, 12, 12)
  const innerRange = getHourNumbers(true, circleSize, 12, 12)
  const color = useTextColorOnPrimary()

  const LocalTheme = React.useContext(themeContext)
  const font = { fontFamily: LocalTheme.fontFamily }

  return (
    <>
      {outerRange.map((a, i) => (
        <View
          key={i}
          pointerEvents="none"
          style={[
            styles.outerHourRoot,
            {
              top: a[1] || 0,
              left: a[0] || 0,
            },
          ]}
        >
          <View style={styles.outerHourInner}>
            {/* Display 00 instead of 12 for AM hours */}
            <Text
              style={[hours === i + 1 ? { color } : null, font]}
              variant="bodyLarge"
              selectable={false}
            >
              {mode === 'AM' && is24Hour && i + 1 === 12 ? '00' : i + 1}
            </Text>
          </View>
        </View>
      ))}
      {is24Hour
        ? innerRange.map((a, i) => (
            <View
              key={i}
              pointerEvents="none"
              style={[
                styles.innerHourRoot,
                {
                  top: a[1] || 0,
                  left: a[0] || 0,
                },
              ]}
            >
              <View style={styles.innerHourInner}>
                <Text
                  selectable={false}
                  style={[
                    i + 13 === hours || (i + 13 === 24 && hours === 0)
                      ? { color }
                      : null,
                    font,
                  ]}
                  variant="bodyLarge"
                >
                  {i + 13 === 24 ? '00' : i + 13}
                </Text>
              </View>
            </View>
          ))
        : null}
    </>
  )
}

const styles = StyleSheet.create({
  outerHourRoot: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    width: 48,
    height: 48,
    marginLeft: -24,
    marginTop: -24,
    borderRadius: 24,
  },
  outerHourInner: { borderRadius: 24 },
  innerHourRoot: {
    position: 'absolute',
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    marginLeft: -24,
    marginTop: -24,
    borderRadius: 24,
  },
  innerHourInner: { borderRadius: 24 },
})

function getHourNumbers(
  is24Hour: boolean,
  size: number,
  count: number,
  arrayLength: number
) {
  let angle = 0
  let step = (2 * Math.PI) / count
  let radius = size / (is24Hour ? 4 : 2.5)

  angle = (-90 * Math.PI) / 180 + Math.PI / 6

  return Array(arrayLength)
    .fill(true)
    .map(() => {
      let x = Math.round(size / 2 + radius * Math.cos(angle))
      let y = Math.round(size / 2 + radius * Math.sin(angle))
      angle += step
      return [x, y]
    })
}

export default React.memo(AnalogClockHours)
