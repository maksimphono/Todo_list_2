import React, { useEffect, useMemo, useReducer, useState, useRef, useCallback } from 'react'

import style from "../styles/Calendar.module.scss"
import { createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

Array.range = (start, stop, step = 1) => {
    return Array.from((function* () {
        for (let i = start; i < stop; i += step) {
            yield i
        }
    })())
}

function fillMonth(year, month) {
    let monthAsTable = []

    const daysInMonths = new Map([
            [1, 31],
            [2, (new Date(`${year}-02-29`) != "Invalid Date")?29:28],
            [3, 31],
            [4, 30],
            [5, 31],
            [6, 30],
            [7, 31],
            [8, 31],
            [9, 30],
            [10, 31],
            [11, 30],
            [12, 31]
    ])

    const firstDay = new Date(`${year}-${month}-1`)
    const firstDayOfWeek = firstDay.getDay()
    const prevMonth = (month - 1) || 12
    const nextMonth = (month !== 12)?(month + 1):1
    const yearOfNextMonth = (nextMonth === 1)?(year + 1):year
    const yearOfPrevMonth = (prevMonth === 12)?(year - 1):year
    
    for (let day = daysInMonths.get(prevMonth) - firstDayOfWeek + 1; day <= daysInMonths.get(prevMonth); day++) {
        monthAsTable.push(new Date(`${yearOfPrevMonth}/${prevMonth}/${day} 11:59:59 PM`))
    }
    monthAsTable = [...monthAsTable, ...Array.range(1, daysInMonths.get(month) + 1).map(day => (new Date(`${year}/${month}/${day} 11:59:59 PM`)))]

    monthAsTable = [...monthAsTable, ...Array.range(1, 42 - monthAsTable.length + 1).map(day => (new Date(`${yearOfNextMonth}/${nextMonth}/${day} 11:59:59 PM`)))]

    return monthAsTable
}

function isToday(date) {
    let _date = date
    const today = new Date()
    if (!(_date instanceof Date)) {
        _date = new Date(_date)
    }
    return ([_date.getDate() === today.getDate(), _date.getMonth() === today.getMonth(), _date.getFullYear() === today.getFullYear()].every(v => !!v))
}

const monthsNames = "January February March April May June July August September October November December".split(" ")

const incMonth = Symbol("incMonth")
const decMonth = Symbol("decMonth")
const setYear = Symbol("setYear")

function dateReducer(state, action) {
    switch (action.type) {
        case incMonth:
            if (state.month === 11) 
                return {...state,
                    month : 0,
                    year : state.year + 1
                }
            else {
                return {...state,
                    month : state.month + 1
                }
            }
        case decMonth:
            if (state.month === 0) 
                return {...state,
                    month : 11,
                    year : (state.year - 1 < new Date().getFullYear())?( state.year ):( state.year - 1 )
                }
            else
                return {...state,
                    month : state.month - 1
                }
        case setYear:
            return {...state,
                year : action.payload
            }
        default:
            return {...state}
    }
}

import { selectAllTodoRecords } from '../../../Context/Redux/todoRecordsSlice'
import { selectCollectionRecordsById } from '../../../Context/Redux/todoCollectionsSlice'
import { useNavigate } from 'react-router-dom'

function useStoreState() {
    return useSelector(state => state)
}

import { switchView, setCalendar, setList } from '../homePageViewModeSlice'

export default function CalendarView() {
    const [state, dispatch] = useReducer(dateReducer, {
        __proto__ : null, 
        month : +(new Date().getMonth()),
        year : +(new Date().getFullYear())
    })

    const todoRecordsFilters = useSelector(state => state.filterTodoRecords)
    const todoRecordsSortParams = useSelector(state => state.sortTodoRecords)
    
    const sortingFunction = useCallback((a, b) => {
        if (todoRecordsSortParams.parameter == null) 
            // if sorting is disabled (not set or was reset)
            return a.id.localeCompare(b.id) // just compare ids

        let [comparableA, comparableB] = [a, b]

        if (todoRecordsSortParams.reversed) {
            comparableA = b
            comparableB = a
        }
        switch (todoRecordsSortParams.parameter) {
            case "dateEnd":
                return new Date(comparableA.dateEnd) - new Date(comparableB.dateEnd)
            case ("collection"):
                return comparableA.collection.localeCompare(comparableB.collection)
            case ("title"):
                return comparableA.title.localeCompare(comparableB.title)
        }
    }, [todoRecordsSortParams.parameter, todoRecordsSortParams.reversed])

    const todoRecords = useSelector((state) => {
        let resultList = null

        resultList = selectAllTodoRecords(state)
        //console.dir(todoRecordsFilters.filtersEnabled)
        if (todoRecordsFilters.filtersEnabled) {
            resultList = resultList
                .filter(record => [
                    record => new Date(record.dateEnd).getFullYear() === state.year && new Date(record.dateEnd).getMonth() === state.month,
                    record.title.includes(todoRecordsFilters.searchFieldValue), // todo record title contains inputted string
                    todoRecordsFilters.selectedCollectionIds[record.collection] // todo record belongs to one of selected collections
                    ].every(v => !!v)
                )
                
        }
        return resultList.sort(sortingFunction)
    })

    /*
    const todoRecords = useSelector(globalState => {
        return selectAllTodoRecords(globalState)
            .filter()

    })
    */

    const navigate = useNavigate()

    const globalDispatch = useDispatch()
    const storeState = useStoreState()
    const selectCollectionByTodoRecord = (entry) => selectCollectionRecordsById(storeState, entry.collection)

    const monthAsTable = useMemo(() => fillMonth(state.year, state.month + 1), [])

    const navigateToViewByDay = (date) => {
        globalDispatch(setList())
        navigate(`records_by_date/${date.toISOString()}`)
    }

    let dayIndex = -1

    return (
    <>
        <table className={style["calendar"]}>
            <button onClick = {() => dispatch({type : decMonth})}></button>
            <h2>{monthsNames[state.month]}</h2>
            <select name="select-year" value = {state.year} onChange={event => dispatch({type : setYear, payload : event.target.value})}>
                {Array.range(new Date().getFullYear(), 2050).map(n => 
                    <option>{n}</option>
                )}
            </select>
            <button onClick = {() => dispatch({type : incMonth})}></button>
            <thead>
                <tr>
                    {"SUN MON TUE WEN THU FRI SAT".split(" ").map(day => <th>{day}</th>)}
                </tr>
            </thead>
            <tbody>
                {Array.range(0, 6).map((key) =>
                    <tr key = {key}>
                        {Array.range(0, 7).map(key => {
                            dayIndex++
                            const dateToNavigateTo = monthAsTable[dayIndex]
                            return ( 
                            <td key = {key}
                                title = {(isToday(monthAsTable[dayIndex]))?"today":""}
                                onClick = {() => navigateToViewByDay(dateToNavigateTo)}>
                                <span className = {style["day"]}>{monthAsTable[dayIndex].getDate()}</span>
                                {todoRecords
                                    .filter(entry => (
                                        new Date(entry.dateEnd).getTime() === monthAsTable[dayIndex].getTime()
                                    )
                                    )
                                    .map(entry => (
                                        <span 
                                            className = {style["todo_record"]} 
                                            style = {{background : selectCollectionByTodoRecord(entry).color}}
                                        >
                                            {entry.title}
                                        </span>
                                    ))}
                            </td>
                            )}
                            )
                        }
                    </tr>
                )}
            </tbody>
        </table>
    </>
  )
}

/*
(new Date(entry.dateEnd).getDate() === monthAsTable[dayIndex].day) && 
                                        (new Date(entry.dateEnd).getMonth() + 1 === monthAsTable[dayIndex].month)
*/