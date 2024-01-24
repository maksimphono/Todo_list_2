import { selectAllTodoRecords } from "../Context/Redux/todoRecordsSlice"

export default function () {
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