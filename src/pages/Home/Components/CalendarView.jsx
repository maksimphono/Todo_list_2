import React, { useEffect } from 'react'

import style from "../styles/Calendar.module.scss"

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

export default function CalendarView() {
  
    useEffect(() => console.table(fillMonth(2022, 7)), [])
    
    
    return (
    <>
        <table className={style["calendar"]}>
            <button></button>
            <h2>September</h2>
            <button></button>
            <thead>
                <tr>
                    {"SUN MON TUE WEN THU FRI SAT".split(" ").map(day => <th>{day}</th>)}
                </tr>
            </thead>
            <tbody>
                {Array.range(0, 6).map(() => 
                    <tr>
                        {Array.range(0, 7).map(() => 
                            <td>
                                <span>31</span>
                                <div style = {{background : "#ada"}}></div>
                                <div style = {{background : "red"}}></div>
                                <div style = {{background : "#e1c"}}></div>
                            </td>)}
                    </tr>
                )}
            </tbody>
        </table>
    </>
  )
}
