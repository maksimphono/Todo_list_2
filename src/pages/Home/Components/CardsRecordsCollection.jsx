import React from 'react'
import TodoRecordCard from './TodoRecordCard';

// <styles>
import style from "../styles/CardsRecordsCollection.module.scss";

// </styles>

export default function CardsRecordsCollection() {
  return (
    <>
      <div className = {style["cards"]}>
            <TodoRecordCard />

            <div className = {style["todo-record-card"] + " " + style["show-content"]}>
                <h3 className = {style["title"]}>Todo 2</h3>
                <span className = {style["date-stamp"]}>13 Jan 2023</span>
                <span className = {style["type"]}>Is type of Homework</span>
                <ul className ={ style["control-buttons"]}>
                    <button className ={ style["success-btn"]}>Complete</button>
                    <button className ={ style["info-btn"]}>Edit</button>
                    <button className ={ style["danger-btn"]}>Delete</button>
                </ul>
                <p className={style["content"]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius labore obcaecati hic cum quia, aperiam dicta impedit dignissimos quis, accusantium ipsam illo vero voluptatem velit culpa enim aspernatur. Inventore, commodi?</p>
            </div>
            <div className ={ style["todo-record-card"]}>
                <h3 className ={ style["title"]}>Todo 3</h3>
                <span className ={ style["date-stamp"]}>13 Jan 2023</span>
                <span className ={ style["type"]}>Is type of Homework</span>
                <ul className ={ style["control-buttons"]}>
                    <button className ={ style["success-btn"]}>Complete</button>
                    <button className ={ style["info-btn"]}>Edit</button>
                    <button className ={ style["danger-btn"]}>Delete</button>
                </ul>
            </div>
            <div className ={ style["todo-record-card"]}>
                <h3 className = {style["title"]}>Todo 4</h3>
                <span className = {style["date-stamp"]}>13 Jan 2023</span>
                <span className = {style["type"]}>Is type of Homework</span>
                <ul className = {style["control-buttons"]}>
                    <button className = {style["success-btn"]}>Complete</button>
                    <button className = {style["info-btn"]}>Edit</button>
                    <button className = {style["danger-btn"]}>Delete</button>
                </ul>
            </div>
        </div>
    </>
  )
}
