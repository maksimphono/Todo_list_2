import React from 'react'

import style from "../styles/Calendar.module.scss"

Array.range = (start, stop, step = 1) => {
    return Array.from((function* () {
        for (let i = start; i < stop; i += step) {
            yield i
        }
    })())
}

export default function CalendarView() {
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
