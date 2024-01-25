import { selectTodoRecordsById } from "../Context/Redux/todoRecordsSlice"
import { selectCollectionRecordsById } from "../Context/Redux/todoCollectionsSlice"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useMemo } from "react"

export function useSerializeTodoRecordbyId(id) {
    const record = useSelector(state => selectTodoRecordsById(state, id))
    return useSerializeTodoRecord(record)
}

export default function useSerializeTodoRecord(reduxTodoRecord) {
    if (reduxTodoRecord == null) return {}
    const collection = useSelector((state) => selectCollectionRecordsById(state, reduxTodoRecord.collection))

    return useMemo(() => ({
        ...reduxTodoRecord,
        collection : {
            name : collection.name,
            color : collection.color
        }
    }), [reduxTodoRecord.id, reduxTodoRecord.title, reduxTodoRecord.dateEnd, reduxTodoRecord.content])
}