//import "../define.scss"
import style from "./navbar.scss";
import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav id = "navbar">
        <div className = "brand">
            <Link href="" />
        </div>
        <button className = "navbar-toggler"></button>
        <ul>
            <li><Link href="">Home</Link></li>
            <li><Link href="">About</Link></li>
            <li><Link href="">Analize</Link></li>
            <button>P</button>
        </ul>            
    </nav>
  )
}
