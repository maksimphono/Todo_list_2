import React, { Suspense, useEffect, useMemo, useState } from 'react'

// <styles>
//import style from "../styles/Tooltip_wide.module.scss";
//import style from "../styles/Tooltip_narrow.module.scss";

// </styles>

const query_phone_width_px = 400;

function FontSettingsForm() {
  return (
    <>
      <form>
        <select name="font" id="">
            <option value="">Monospace</option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
        </select>
        <select name="size" id="">
            {[8, 9, 10, 12, 14, 16, 18, 20, 22].map(val => (<option key = {val}>{val}</option>))}
        </select>
                        <button name="font-size-up"></button>
                        <button name="font-size-dn"></button>
                        <input name="font-bold" type="checkbox" />
                        <input name="font-underline" type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <details name="font-color">
                            <summary>
    
                            </summary>
                            <input type="color" />
                        </details>
                        <details name="mark-color">
                            <summary>
    
                            </summary>
                            <input type="color" />
                        </details>
                    </form>
    </>
  )
}


function BtnCreationSettings({style}) {
  return (
    <>
        {(window.innerWidth <= query_phone_width_px)?
            <div className = {style["content"]}>
                <button></button>
                <button></button>
                <button></button>
            </div>
        :
            <>
                <button></button>
                <button></button>
                <button></button>
            </>
        }
      
    </>
  )
}


export default function Tooltip() {
    const [style, setStyle] = useState({});

    useEffect(() => {
        let styleFilePath = "../styles/Tooltip_wide.module.scss"
        if (window.innerWidth <= query_phone_width_px)
            styleFilePath = "../styles/Tooltip_narrow.module.scss"    

        import(styleFilePath)
            .then(importedStyle => {console.log("Import"); setStyle(importedStyle)})
            .catch(err => {console.log("Error"); console.error(err)})
    }, [])

    return (
    <>
        <div className = {style["tooltip"]}>
            {(window.innerWidth <= query_phone_width_px)?
                <>
                    <details className = {style["font-control"]}>
                        <summary>
                            Font
                        </summary>
                        <FontSettingsForm />
                    </details>
                    <details className = {style["create-elements-btns"]}>
                    <summary>
                        Add
                    </summary>
                        <BtnCreationSettings style = {style} />
                    </details>
                </>
            :
                <>
                    <FontSettingsForm />
                    <BtnCreationSettings style = {style} />
                </>
            }   
        </div>
    </>
  )
}
