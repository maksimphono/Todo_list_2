import { useMemo } from "react"

export default function useFillMonth(year, month) {
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

    return useMemo(() => fillMonth(year, month + 1), [year, month])
}