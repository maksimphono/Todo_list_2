//import "../define.scss"
import style from "./navbar.module.scss";
import React, { useContext } from 'react'
import { Link } from "react-router-dom";

import modalContext from "./Context/modalContext";

export default function Navbar() {
  const {searchWindowRef} = useContext(modalContext)
  
  return (
    <nav id = {style["navbar"]}>
        <div className = {style["brand"]}>
            <Link to="/" />
        </div>
        <button className = {style["navbar-toggler"]}><span className="material-symbols-outlined">reorder</span></button>
        <ul>
            <li><Link to="/"><span className="material-symbols-outlined">home</span> Home</Link></li>
            <li><Link to="/NewTodoRecord"><span className="material-symbols-outlined">add</span> New</Link></li>
            <button onClick = {() => searchWindowRef.current.showModal()}><span className="material-symbols-outlined">search</span></button>
        </ul>
    </nav>
  )
}
