import React, { useCallback, useEffect } from 'react'
import TodoRecordCard from './TodoRecordCard';

import { addManyCollections } from '../../../Context/Redux/todoCollectionsSlice';
import { addManyTodos } from '../../../Context/Redux/todoRecordsSlice';
import {selectAllTodoRecords} from "../../../Context/Redux/todoRecordsSlice"

import { useSelector, useDispatch } from "react-redux"

// <styles>
import style from "../styles/CardsRecordsList.module.scss";
import { resetFilters } from '../../../Context/Redux/filterTodoRecordsSlice';
import { resetSortParams } from '../../../Context/Redux/sortTodoRecordsSlice';
//import { clearStorage, loadTodoRecords, saveTodoCollections, saveTodoRecords } from '../../../LocalStorage/initStorage';

// </styles>

const TodoRecordsJSON = [
    {
        id : "1",
        title : "Todo 1",
        dateEnd : "2022-02-03",
        collection : "1",
        content : "Qwertyasdfghzxcvbn"
    },
    {
        id : "2",
        title : "Second Todo",
        dateEnd : "2023-12-10",
        collection : "2",
        content : "Second Todo qwerftgvcxsaswderftghbvcfdxsa"
    },
    {
        id : "3",
        title : "Third Todo#3",
        dateEnd : "2023-04-28",
        collection : "1",
        content : "#3 todo Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae commodi, architecto saepe placeat ipsum quidem beatae cum soluta assumenda quia, vitae quod pariatur debitis nam. Eum voluptatibus sed unde adipisci."
    }
]

const collectionsJSON = [
    {
        id : "1",
        name : "Col_1",
        color: "#ada",
        todoRecordsIds : ["1", "3"]
    },
    {
        id : "2",
        name : "Col_2",
        color: "#e4c",
        todoRecordsIds : ["2"]
    }
]

import { todoRecordsStorageThunks } from '../../../Context/Redux/todoRecordsSlice';
import { collectionsRecordsThunks } from '../../../Context/Redux/todoCollectionsSlice';

function setInitialState(dispatch) {
    dispatch(resetFilters())
    dispatch(resetSortParams())
    dispatch(todoRecordsStorageThunks.loadAll())
    dispatch(collectionsRecordsThunks.loadAll())
}

export default function CardsRecordsCollection() {
    const dispatch = useDispatch()
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

    const todoRecordsLoadStatus = useSelector(state => state.todoRecords.loadstatus)
    const collectionsLoadStatus = useSelector(state => state.todoRecordsCollection.loadstatus)

    useEffect(() => {
         // only for tests, actifically add some records to state, so I don't have to add it manually
        if (todoRecordsLoadStatus == "idle" && collectionsLoadStatus == "idle")
            setInitialState(dispatch)
    }, [])

    const TodoRecords = useSelector((state) => {
        let resultList = null
        if (todoRecordsFilters.filtersEnabled) {
            resultList = selectAllTodoRecords(state)
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
                    ].every(v => v)
                )
                
        } else {
            resultList = selectAllTodoRecords(state)
        }
        return resultList.sort(sortingFunction)
    })


    return (
        <>
            <div className = {style["cards"]}>
                {TodoRecords.map(rec => <TodoRecordCard key = {rec.id} cardData = {rec}/>)}
            </div>
        </>
    )
}
