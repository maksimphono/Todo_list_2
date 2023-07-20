//import "../define.scss"
import style from "./navbar.scss";
import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav id = "navbar">
        <div className = "brand">
            <Link to="/" />
        </div>
        <button className = "navbar-toggler"></button>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/NewTodoRecord">New</Link></li>
            <li><Link to="/">Analize</Link></li>
            <button>P</button>
        </ul>            
    </nav>
  )
}
