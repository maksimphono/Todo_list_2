import React, { useEffect, useMemo, useReducer, useState, useRef } from 'react'

import style from "../styles/Calendar.module.scss"
import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

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
    
    for (let day = daysInMonths.get(prevMonth) - firstDayOfWeek + 1; day <= daysInMonths.get(prevMonth); day++) {
        monthAsTable.push(day)
    }
    monthAsTable = [...monthAsTable, ...Array.range(1, daysInMonths.get(month) + 1)]
    
    monthAsTable = [...monthAsTable, ...Array.range(1, 42 - monthAsTable.length + 1)]

    return monthAsTable
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

import TodoCardsByDay from './TodoCardsByDay'

export default function CalendarView({show}) {
    if (!show) return <></>
    
    const [state, dispatch] = useReducer(dateReducer, {
        __proto__ : null, 
        month : +(new Date().getMonth()),
        year : +(new Date().getFullYear())
    })
    const dislogRef = useRef(null)
    //const todoRecords = useSelector(globalState => globalState.todoRecords.filter(entry => new Date(entry.dateEnd).getFullYear() === state.year && new Date(entry.dateEnd).getMonth() === state.month))
    //console.table(todoRecords)

    const monthAsTable = useMemo(() => fillMonth(state.year, state.month + 1), [state.month, state.year])

    let dayIndex = 0

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
                        {Array.range(0, 7).map(key => 
                            (<td key = {key}>
                                <span>{monthAsTable[dayIndex++]}</span>
                                <div style = {{background : "#ada"}}></div>
                                <div style = {{background : "red"}}></div>
                                <div style = {{background : "#e1c"}}></div>
                            </td>)
                            )
                        }
                    </tr>
                )}
            </tbody>
        </table>
    </>
  )
}
