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

export default function CardsRecordsCollection() {
    const dispatch = useDispatch()
    const TodoRecords = useSelector(selectAllTodoRecords)

    useEffect(() => {
        console.dir(TodoRecords)
    }, [])

    return (
        <>
            <div className = {style["cards"]}>
                {TodoRecords.map(rec => <TodoRecordCard cardData = {rec}/>)}
            </div>
        </>
    )
}
