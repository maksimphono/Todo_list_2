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
        collection : "Hw",
        content : "Qwertyasdfghzxcvbn"
    },
    {
        id : "2",
        title : "Second Todo",
        dateEnd : "2023-12-10",
        collection : "Study",
        content : "Second Todo qwerftgvcxsaswderftghbvcfdxsa"
    },
    {
        id : "3",
        title : "Third Todo#3",
        dateEnd : "2023-04-28",
        collection : "Study",
        content : "#3 todo Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae commodi, architecto saepe placeat ipsum quidem beatae cum soluta assumenda quia, vitae quod pariatur debitis nam. Eum voluptatibus sed unde adipisci."
    }
]

import { addOne } from '../../../Context/Redux/todoRecordsSlice';
import { useSelector, useDispatch } from "react-redux"
import {selectAllTodoRecords} from "../../../Context/Redux/todoRecordsSlice"
import { store } from '../../../Context/Redux/store';

export default function CardsRecordsCollection() {
    const dispatch = useDispatch()
    const todoRecordsFilters = useSelector(state => state.filterTodoRecords)
    const TodoRecords = useSelector((state) => {
        if (Object.keys(todoRecordsFilters).length > 2) {
            console.log(new Date(selectAllTodoRecords(state)[0].dateEnd))
            return selectAllTodoRecords(state).filter(record => new Date(record.dateEnd) >= new Date(todoRecordsFilters.selectedEndDateFrom))
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
