import React from 'react'
import "./todo_records_list.scss";

export default function TodoRecordsList() {
  return (
    <>
      <div id = "todo_records">
        <div className = "tooltip">
            <details className = "tool" data-search>
                <summary>Search</summary>
                <div className = "options">
                    <input type="text" />
                    <button type="submit">Search</button>
                </div>
            </details>
            <details className = "tool">
                <summary>Filter</summary>
                <ul className = "options">
                    <li>Option</li>
                    <li>Option</li>
                    <li>Option</li>
                </ul>
            </details>
            <details className = "tool">
                <summary>Sort</summary>
                <ul className = "options">
                    <li>Option</li>
                    <li>Option</li>
                    <li>Option</li>
                </ul>
            </details>
            
        </div>
        <div className = "cards">
            <div className = "todo-record-card">
                <h3 className = "title">Todo 1</h3>
                <span className = "date-stamp">13 Jan 2023</span>
                <span className = "type">Is type of Homework</span>
                <ul className = "control-buttons">
                    <button className = "success-btn">Complete</button>
                    <button className = "info-btn">Edit</button>
                    <button className = "danger-btn">Delete</button>
                </ul>
            </div>
            <div className = "todo-record-card show-content">
                <h3 className = "title">Todo 2</h3>
                <span className = "date-stamp">13 Jan 2023</span>
                <span className = "type">Is type of Homework</span>
                <ul className = "control-buttons">
                    <button className = "success-btn">Complete</button>
                    <button className = "info-btn">Edit</button>
                    <button className = "danger-btn">Delete</button>
                </ul>
                <p className="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius labore obcaecati hic cum quia, aperiam dicta impedit dignissimos quis, accusantium ipsam illo vero voluptatem velit culpa enim aspernatur. Inventore, commodi?</p>
            </div>
            <div className = "todo-record-card">
                <h3 className = "title">Todo 3</h3>
                <span className = "date-stamp">13 Jan 2023</span>
                <span className = "type">Is type of Homework</span>
                <ul className = "control-buttons">
                    <button className = "success-btn">Complete</button>
                    <button className = "info-btn">Edit</button>
                    <button className = "danger-btn">Delete</button>
                </ul>
            </div>
            <div className = "todo-record-card">
                <h3 className = "title">Todo 4</h3>
                <span className = "date-stamp">13 Jan 2023</span>
                <span className = "type">Is type of Homework</span>
                <ul className = "control-buttons">
                    <button className = "success-btn">Complete</button>
                    <button className = "info-btn">Edit</button>
                    <button className = "danger-btn">Delete</button>
                </ul>
            </div>
        </div>
      </div>
    </>
  )
}
