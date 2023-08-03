import React, { useEffect } from 'react'
import TodoRecordCard from './TodoRecordCard';

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

import { addManyCollections } from '../../../Context/Redux/todoCollectionsSlice';
import { addManyTodos } from '../../../Context/Redux/todoRecordsSlice';

import { addOne } from '../../../Context/Redux/todoRecordsSlice';
import { useSelector, useDispatch } from "react-redux"
import {selectAllTodoRecords} from "../../../Context/Redux/todoRecordsSlice"
import { store } from '../../../Context/Redux/store';

export default function CardsRecordsCollection() {
    const dispatch = useDispatch()
    const todoRecordsFilters = useSelector(state => state.filterTodoRecords)
    
    useEffect(() => {
        dispatch(addManyTodos(TodoRecordsJSON))
        dispatch(addManyCollections(collectionsJSON))
    }, [])

    const TodoRecords = useSelector((state) => {
        console.dir(todoRecordsFilters)
        if (Object.keys(todoRecordsFilters).length > 2) {
            return selectAllTodoRecords(state)
                .filter(record => [
                    ((todoRecordsFilters.selectedEndDateFrom != "")?
                        (new Date(record.dateEnd) >= new Date(todoRecordsFilters.selectedEndDateFrom))
                    :
                        true
                    ),
                    ((todoRecordsFilters.selectedEndDateTo != "")?
                        (new Date(record.dateEnd) < new Date(todoRecordsFilters.selectedEndDateTo))
                    :
                        true
                    ),
                    record.title.includes(todoRecordsFilters.searchFieldValue),
                    todoRecordsFilters.selectedCollectionIds[record.collection]
                    ].every(v => v)
                )
        } else {
            return selectAllTodoRecords(state)
        }
        
    })
    

    useEffect(() => {
        console.log("Filters: ")
        console.dir(todoRecordsFilters)
    }, [todoRecordsFilters])

    return (
        <>
            <div className = {style["cards"]}>
                {TodoRecords.map(rec => <TodoRecordCard key = {rec.id} cardData = {rec}/>)}
            </div>
        </>
    )
}
