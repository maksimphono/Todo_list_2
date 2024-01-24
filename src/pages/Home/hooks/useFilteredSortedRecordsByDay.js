import { useSelector } from "react-redux/es/hooks/useSelector"
import { useCallback } from "react"

import { selectAllTodoRecords } from "../../../Context/Redux/todoRecordsSlice"

export default function useSortedFilteredTodoRecordsByDay(specifiedDate) {
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


    return useSelector((state) => {
        let resultList = null

        resultList = selectAllTodoRecords(state)
        if (specifiedDate)
            resultList = resultList.filter(record => (new Date(record.dateEnd).toLocaleString() === new Date(specifiedDate).toLocaleString()))
        
        //console.dir(todoRecordsFilters.filtersEnabled)
        if (todoRecordsFilters.filtersEnabled) {
            resultList = resultList
                .filter(record => [
                    record.title.includes(todoRecordsFilters.searchFieldValue), // todo record title contains inputted string
                    todoRecordsFilters.selectedCollectionIds[record.collection] // todo record belongs to one of selected collections
                    ].every(v => !!v)
                )
                
        }
        return resultList.sort(sortingFunction)
    })
}