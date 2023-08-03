import React from 'react'
import { useMemo } from 'react'
import { useId } from 'react'

import style from "../styles/SortOption.module.scss"
import styled_buttons from "../../../buttons.module.scss"

export default function SortOption() {
    const namePrefix = useId()
    const parameterRadioName = useMemo(() => namePrefix + "sort_parameter", []) 

    const handleSubmit = event => {
        event.preventDefault()
    }

    return (
    <>
        <form className = {style["sort_option"]} onSubmit = {handleSubmit}>
            <label className = {style["parameter"]}>
                <h2>By Date</h2>
                <input type="radio" name = {parameterRadioName} />
                <input type="checkbox" className = {style["reversed"]} />
            </label>
            <label className = {style["parameter"]}>
                <h2>By Title</h2>
                <input type="radio" name = {parameterRadioName} />
                <input type="checkbox" className = {style["reversed"]} />
            </label>
            <label className = {style["parameter"]}>
                <h2>By Collection</h2>
                <input type="radio" name = {parameterRadioName} />
                <input type="checkbox" className = {style["reversed"]} />
            </label>
            <button className = {styled_buttons["success-btn"]}>Apply</button>
            <button className = {styled_buttons["secondary-btn"]}>Reset</button>
        </form>
    </>
  )
}
