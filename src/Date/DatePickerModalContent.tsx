import * as React from 'react'

import Calendar, {
  BaseCalendarProps,
  CalendarDate,
  CalendarDates,
  MultiChange,
  MultiConfirm,
  RangeChange,
  SingleChange,
  ModeType,
  ValidRangeType,
} from './Calendar'

import AnimatedCrossView from './AnimatedCrossView'
// import DatePickerModalHeader from './DatePickerModalHeader'
import type { HeaderPickProps } from './DatePickerModalContentHeader'
import CalendarEdit from './CalendarEdit'
// import DatePickerModalHeaderBackground from './DatePickerModalHeaderBackground'

import type { DisableWeekDaysType } from './dateUtils'

import { themeContext } from '../Context/themeContext'

export type LocalState = {
  startDate: CalendarDate
  endDate: CalendarDate
  date: CalendarDate
  dates: CalendarDates
}

interface DatePickerModalContentBaseProps {
  inputFormat?: string
  locale: string
  onDismiss?: () => any
  disableSafeTop?: boolean
  saveLabelDisabled?: boolean
  uppercase?: boolean
  themeValue: {
    secondaryColor: string
    primaryColor: string
    accentColor: string
    backgroundColor: string
    fontFamily: string
  }
}

export interface DatePickerModalContentRangeProps
  extends HeaderPickProps,
    BaseCalendarProps,
    DatePickerModalContentBaseProps {
  mode: 'range'
  startDate: CalendarDate
  endDate: CalendarDate
  onChange?: RangeChange
  onConfirm?: RangeChange
}

export interface DatePickerModalContentSingleProps
  extends HeaderPickProps,
    BaseCalendarProps,
    DatePickerModalContentBaseProps {
  mode: 'single'
  date?: CalendarDate
  onChange?: SingleChange
  onConfirm?: SingleChange
  dateMode?: 'start' | 'end'
}

export interface DatePickerModalContentMultiProps
  extends HeaderPickProps,
    BaseCalendarProps,
    DatePickerModalContentBaseProps {
  mode: 'multiple'
  dates?: CalendarDates
  onChange?: MultiChange
  onConfirm?: MultiConfirm
}

export function DatePickerModalContent(
  props:
    | DatePickerModalContentRangeProps
    | DatePickerModalContentSingleProps
    | DatePickerModalContentMultiProps
) {
  const {
    mode,
    onChange,
    // onConfirm,
    // onDismiss,
    // disableSafeTop,
    disableWeekDays,
    locale,
    validRange,
    dateMode,
    startYear,
    endYear,
    themeValue,
  } = props
  const anyProps = props as any

  // use local state to add only onConfirm state changes
  const [state, setState] = React.useState<LocalState>({
    date: anyProps.date,
    startDate: anyProps.startDate,
    endDate: anyProps.endDate,
    dates: anyProps.dates,
  })

  // update local state if changed from outside or if modal is opened
  React.useEffect(() => {
    setState({
      date: anyProps.date,
      startDate: anyProps.startDate,
      endDate: anyProps.endDate,
      dates: anyProps.dates,
    })
  }, [anyProps.date, anyProps.startDate, anyProps.endDate, anyProps.dates])

  const [collapsed] = React.useState<boolean>(true)

  const onInnerChange = React.useCallback(
    (params: any) => {
      onChange && onChange(params)
      setState((prev) => ({ ...prev, ...params }))
    },
    [onChange, setState]
  )

  // const onInnerConfirm = React.useCallback(() => {
  //   if (mode === 'single') {
  //     ;(onConfirm as DatePickerModalContentSingleProps['onConfirm'])({
  //       date: state.date,
  //     })
  //   } else if (mode === 'range') {
  //     ;(onConfirm as DatePickerModalContentRangeProps['onConfirm'])({
  //       startDate: state.startDate,
  //       endDate: state.endDate,
  //     })
  //   } else if (mode === 'multiple') {
  //     ;(onConfirm as DatePickerModalContentMultiProps['onConfirm'])({
  //       dates: state.dates || [],
  //     })
  //   }
  // }, [state, mode, onConfirm])

  // const onToggleCollapse = React.useCallback(() => {
  //   setCollapsed((prev) => !prev)
  // }, [setCollapsed])

  const contextValue = themeValue

  return (
    <themeContext.Provider value={contextValue}>
      {/* <DatePickerModalHeaderBackground>
        <DatePickerModalHeader
          locale={locale}
          onSave={onInnerConfirm}
          onDismiss={onDismiss}
          saveLabel={props.saveLabel}
          saveLabelDisabled={props.saveLabelDisabled ?? false}
          uppercase={props.uppercase ?? true}
          disableSafeTop={disableSafeTop}
          closeIcon={props.closeIcon}
        />
        <DatePickerModalContentHeader
          state={state}
          mode={mode}
          collapsed={collapsed}
          onToggle={onToggleCollapse}
          headerSeparator={props.headerSeparator}
          emptyLabel={props.emptyLabel}
          label={props.label}
          moreLabel={props.moreLabel}
          startLabel={props.startLabel}
          endLabel={props.endLabel}
          uppercase={props.uppercase ?? true}
          locale={locale}
          editIcon={props?.editIcon}
          calendarIcon={props.calendarIcon}
        />
      </DatePickerModalHeaderBackground> */}
      <DatePickerContent
        collapsed={collapsed}
        locale={locale}
        mode={mode}
        startDate={state.startDate}
        endDate={state.endDate}
        date={state.date}
        onChange={onInnerChange}
        disableWeekDays={disableWeekDays}
        dates={state.dates}
        validRange={validRange}
        dateMode={dateMode}
        startYear={startYear}
        endYear={endYear}
        label={props.label}
        startLabel={props.startLabel}
        endLabel={props.endLabel}
      />
    </themeContext.Provider>
  )
}

interface DatePickerContentProps {
  collapsed: boolean
  locale: string
  mode: ModeType
  startDate: CalendarDate
  endDate: CalendarDate
  date: CalendarDate
  onChange: (params: any) => void
  disableWeekDays?: DisableWeekDaysType
  dates: CalendarDates
  validRange?: ValidRangeType
  dateMode?: 'start' | 'end'
  startYear?: number
  endYear?: number
  label?: string
  startLabel?: string
  endLabel?: string
}

export const DatePickerContent: React.FC<DatePickerContentProps> = (props) => {
  const {
    collapsed,
    locale,
    mode,
    startDate,
    endDate,
    date,
    onChange,
    disableWeekDays,
    dates,
    validRange,
    dateMode,
    startYear,
    endYear,
  } = props

  return (
    <AnimatedCrossView
      collapsed={collapsed}
      calendar={
        <Calendar
          locale={locale}
          mode={mode}
          startDate={startDate}
          endDate={endDate}
          date={date}
          onChange={onChange}
          disableWeekDays={disableWeekDays}
          dates={dates}
          validRange={validRange}
          dateMode={dateMode}
          startYear={startYear}
          endYear={endYear}
        />
      }
      calendarEdit={
        <CalendarEdit
          mode={mode}
          state={{
            date,
            startDate,
            endDate,
            dates,
          }}
          label={props.label}
          startLabel={props.startLabel}
          endLabel={props.endLabel}
          collapsed={collapsed}
          onChange={onChange}
          validRange={validRange}
          locale={locale}
        />
      }
    />
  )
}

export default React.memo(DatePickerModalContent)
