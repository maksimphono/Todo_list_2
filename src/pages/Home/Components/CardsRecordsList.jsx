import React, { useEffect } from 'react'
import TodoRecordCard from './TodoRecordCard';

import { addManyCollections } from '../../../Context/Redux/todoCollectionsSlice';
import { addManyTodos } from '../../../Context/Redux/todoRecordsSlice';

import { addOne } from '../../../Context/Redux/todoRecordsSlice';
import { useSelector, useDispatch } from "react-redux"
import {selectAllTodoRecords} from "../../../Context/Redux/todoRecordsSlice"
import { store } from '../../../Context/Redux/store';

// <styles>
import style from "../styles/CardsRecordsList.module.scss";

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

function setInitialState(dispatch) {
    dispatch(addManyTodos(TodoRecordsJSON))
    dispatch(addManyCollections(collectionsJSON))
}

export default function CardsRecordsCollection() {
    const dispatch = useDispatch()
    const todoRecordsFilters = useSelector(state => state.filterTodoRecords)
    const todoRecordsSortParams = useSelector(state => state.sortTodoRecords)

    const sortingFunction = (a, b) => {
        let [comparableA, comparableB] = [a, b]
        if (todoRecordsSortParams.parameter == null) return a.id.localeCompare(b.id)
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
    }

    useEffect(() => {
        setInitialState(dispatch)
    }, [])

    const TodoRecords = useSelector((state) => {
        console.dir(todoRecordsFilters)
        if (Object.keys(todoRecordsFilters).length > 2) {
            return selectAllTodoRecords(state)
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
                .sort(sortingFunction)
        } else {
            return selectAllTodoRecords(state).sort(sortingFunction)
        }
        
    })

    return (
        <>
            <div className = {style["cards"]}>
                {TodoRecords.map(rec => <TodoRecordCard key = {rec.id} cardData = {rec}/>)}
            </div>
        </>
    )
}
