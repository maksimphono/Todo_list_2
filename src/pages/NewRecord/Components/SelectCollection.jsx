import { useRef, useEffect, useContext, useCallback, forwardRef, useImperativeHandle, useId, useMemo } from "react";

import NewCollectionForm from "./NewCollectionForm";

import {selectedTodosCollectionContext} from "../NewTodoRecord.jsx"
import modalContext from "../../../Context/modalContext.js";

// styles
import style from "../styles/SelectCollection.module.scss"//"../styles/SelectCollection.module.scss"
import styled_buttons from "../../../buttons.module.scss";
import { selectAllCollectionRecords } from "../../../Context/Redux/todoCollectionsSlice";
import { useSelector } from "react-redux";


function CollectionOption({title, color}) {
    const context = useContext(selectedTodosCollectionContext);
    const radioInput = useRef(null);
    const textColor = useMemo(() => ((parseInt(color.slice(1, 7), 16) > 0x7fffff)?"#333":"#ddd"), [])
    const borderColor = useMemo(() => ((parseInt(color.slice(1, 7), 16) > 0x7fffff)?"#333":"#ddd"), [])

    return (
      <>
        <li>
            <label>
              <span style = {{color : textColor}}>{title}</span>
              <input 
                ref = {radioInput} 
                style = {{
                  background : color,
                  borderTop: `1px solid #fff`
                }}
                name = "select-collection-item" 
                type="radio" 
                onClick = {event => context.setSelectedTodosCollection(title)} 
              />
            </label>
                        
            <button className = {style["edit-collection"]} type = "button">Edit</button>
          </li>
      </>
    )
  }

export default function SelectCollection() {
    const {modalRef} = useContext(modalContext)
    const newCollectionFormId = useId();
    const allColection = useSelector(selectAllCollectionRecords)
    const showNewCollectionDialog = useCallback(() => {
      modalRef.current.setTitle("New collection");
      modalRef.current.setBody(<NewCollectionForm id = {newCollectionFormId} closeModal = {modalRef.current.close} />); 
      modalRef.current.setFooter([<button form = {newCollectionFormId} className = {styled_buttons["success-btn"]} type = "submit">Create</button>]);
      modalRef.current.showModal()
    }, [])

    useEffect(() => console.dir(allColection), [])

    return (
      <>
      <ul className = {style["select-collection-list"]}>
          <li className = {style["add-collection"]}>
            <button type = "button" onClick = {() => {showNewCollectionDialog()}}>Add</button>
          </li>
          {allColection.map((item) => 
            <CollectionOption key = {item.id} title = {item.name} color = {item.color}/>
          )}
          
      </ul>
      </>
    )
  }