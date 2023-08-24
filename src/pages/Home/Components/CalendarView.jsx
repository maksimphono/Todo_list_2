import React, { useEffect, useMemo, useReducer, useState, useRef, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { selectCollectionRecordsById } from '../../../Context/Redux/todoCollectionsSlice'

import { useNavigate } from 'react-router-dom'

import useReduxStoreState from '../../../hooks/useReduxStoreState'
import { switchView, setCalendar, setList } from '../homePageViewModeSlice'
import useFilteredSortedRecords from '../hooks/useFilteredSortedRecords'
import useFillMonth from '../hooks/useFillMonth'

// style
import style from "../styles/Calendar.module.scss"

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

export default function CalendarView() {
    const [state, dispatch] = useReducer(dateReducer, {
        __proto__ : null, 
        month : +(new Date().getMonth()),
        year : +(new Date().getFullYear())
    })

    const navigate = useNavigate()
    const globalDispatch = useDispatch()
    const storeState = useReduxStoreState()
    
    const todoRecords = useFilteredSortedRecords({filterDeadline : false})
    const selectCollectionByTodoRecord = (entry) => selectCollectionRecordsById(storeState, entry.collection)
    const monthAsTable = useFillMonth(state.year, state.month)

    const navigateToViewByDay = (date) => {
        globalDispatch(setList())
        navigate(`records_by_date/${date.toISOString()}`)
    }

    let dayIndex = -1

    return (
    <>
        <table className={style["calendar"]}>
            <button onClick = {() => dispatch({type : decMonth})}><span title='icon' className="material-symbols-outlined">arrow_back</span></button>
            <h2>{monthsNames[state.month]}</h2>
            <select name="select-year" value = {state.year} onChange={event => dispatch({type : setYear, payload : event.target.value})}>
                {Array.range(new Date().getFullYear(), 2050).map(n => 
                    <option>{n}</option>
                )}
            </select>
            <button onClick = {() => dispatch({type : incMonth})}><span title='icon' className="material-symbols-outlined">arrow_forward</span></button>
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