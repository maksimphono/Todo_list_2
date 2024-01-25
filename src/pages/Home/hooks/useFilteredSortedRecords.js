import { useSelector } from "react-redux"
import { useCallback } from "react"
import { selectAllTodoRecords } from "../../../Context/Redux/todoRecordsSlice"
import { selectCollectionRecordsById } from "../../../Context/Redux/todoCollectionsSlice"

export default function useFilteredSortedRecords({filterDeadline} = {filterDeadline : false}) {
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

        if (todoRecordsFilters.filtersEnabled) {            
            if (!filterDeadline) {
                resultList = resultList
                    .filter(record => [
                        record => new Date(record.dateEnd).getFullYear() === state.year && new Date(record.dateEnd).getMonth() === state.month,
                        record.title.includes(todoRecordsFilters.searchFieldValue), // todo record title contains inputted string
                        todoRecordsFilters.selectedCollectionIds[record.collection] // todo record belongs to one of selected collections
                        ].every(v => !!v)
                    )
            } else {
                resultList = resultList
                    .filter(record => [
                        ((todoRecordsFilters.selectedEndDateFrom != "")?
                            (new Date(record.dateEnd) >= new Date(todoRecordsFilters.selectedEndDateFrom))
                            :
                            true // just ignore that condition if that date is not specified
                        ),
                        ((todoRecordsFilters.selectedEndDateTo != "")?
                            (new Date(record.dateEnd) < new Date(todoRecordsFilters.selectedEndDateTo))
                            :
                            true // just ignore that condition if that date is not specified
                        ),
                        record.title.includes(todoRecordsFilters.searchFieldValue), // todo record title contains inputted string
                        todoRecordsFilters.selectedCollectionIds[record.collection] // todo record belongs to one of selected collections
                        ].every(v => !!v)
                    )
            }
        }
        return resultList.sort(sortingFunction)
    })
}