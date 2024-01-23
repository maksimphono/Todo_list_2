//import "../define.scss"
import style from "./navbar.module.scss";
import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav id = {style["navbar"]}>
        <div className = {style["brand"]}>
            <Link to="/" />
        </div>
        <button className = {style["navbar-toggler"]}><span className="material-symbols-outlined">reorder</span></button>
        <ul>
            <li><Link to="/"><span className="material-symbols-outlined">home</span> Home</Link></li>
            <li><Link to="/NewTodoRecord"><span className="material-symbols-outlined">add</span> New</Link></li>
            <button><span className="material-symbols-outlined">search</span></button>
        </ul>
    </nav>
  )
}
