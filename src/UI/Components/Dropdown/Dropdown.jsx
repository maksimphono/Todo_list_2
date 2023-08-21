//import style from "./styles/Dropdown.module.scss"
import { useEffect, useId, useState } from "react"
import $ from "jquery"

export default function Dropdown({children, styles}) {
    const [open, setOpen] = useState(false)
    const selfId = "" + new Date().getTime()

    useEffect(() => {
        $(`#${selfId} *`).attr(`data-dropdown-${selfId}`, true)
        const conditionalBlur = event => {
            if ($(event.target).attr(`data-dropdown-${selfId}`) == undefined) {
                setOpen(false)
            }
        }

        $(document).on("click", conditionalBlur)
        return () => $(document).off("click", conditionalBlur)
    }, [])
    
    return (
        <div id = {selfId} className = {styles["dropdown"]}>
            <label>
                <input type="checkbox" checked = {open} onChange={() => setOpen(v => !v)} />
            </label>
            <div hidden = {!open} className = {styles["dropdown__body"]}>
                {children}
            </div>
        </div>
    )
}