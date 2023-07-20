import React from 'react'

// <styles>
import style from "../styles/Tooltip.module.scss";

// </styles>

export default function Tooltip() {
  return (
    <>
      <div className = {style.tooltip}>
            <details className = {style["tool"]} data-search>
                <summary>Search</summary>
                <div className = {style["options"]}>
                    <input type="text" />
                    <button type="submit">Search</button>
                </div>
            </details>
            <details className = {style["tool"]}>
                <summary>Filter</summary>
                <ul className = {style["options"]}>
                    <li>Option</li>
                    <li>Option</li>
                    <li>Option</li>
                </ul>
            </details>
            <details className = {style["tool"]}>
                <summary>Sort</summary>
                <ul className = {style["options"]}>
                    <li>Option</li>
                    <li>Option</li>
                    <li>Option</li>
                </ul>
            </details>
            
        </div>
    </>
  )
}
