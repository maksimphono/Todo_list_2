import { useRef, useEffect, useContext, useCallback, forwardRef, useImperativeHandle, useId, useMemo } from "react";

import NewCollectionForm from "./NewCollectionForm";

import {selectedTodosCollectionContext} from "../NewTodoRecord.jsx"
import modalContext from "../../../Context/modalContext.js";

// styles
import style from "../styles/SelectCollection.module.scss"//"../styles/SelectCollection.module.scss"
import styled_buttons from "../../../buttons.module.scss";
import { selectAllCollectionRecords, removeOne } from "../../../Context/Redux/todoCollectionsSlice";
import { useDispatch, useSelector } from "react-redux";

import EditCollectionForm from "./EditCollectionForm";


function CollectionOption({id, title, color}) {
    const dispatch = useDispatch();
    const context = useContext(selectedTodosCollectionContext);
    const {modalRef} = useContext(modalContext)

    const editCollectionFormId = useId()
    const radioInput = useRef(null);
    const textColor = useMemo(() => ((parseInt(color.slice(1, 7), 16) > 0x7fffff)?"#333":"#ddd"), [])
    const borderColor = useMemo(() => ((parseInt(color.slice(1, 7), 16) > 0x7fffff)?"#333":"#ddd"), [])

    const handleRemoveCollection = useCallback((collectionId) => {
      modalRef.current.close()
      dispatch(removeOne(collectionId))
    })

    const startEditCollectionRecord = useCallback(event => {
      modalRef.current.setTitle("Edit collection");
      modalRef.current.setBody(<EditCollectionForm id = {editCollectionFormId} CollectionId = {id} closeModal = {modalRef.current.close} />);
      modalRef.current.setFooter([
        <button form = {editCollectionFormId} className = {styled_buttons["warning-btn"]} type = "submit">Edit</button>,
        <button className = {styled_buttons["danger-btn"]} type = "button" onClick = {() => handleRemoveCollection(id)}>Delete</button>
      ]);
      modalRef.current.showModal()
    })

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
                onClick = {event => context.setSelectedTodosCollection({id, title, color, textColor})} 
              />
            </label>
   
            <button className = {style["edit-collection"]} type = "button" onClick={startEditCollectionRecord}>Edit</button>
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

    return (
      <>
      <ul className = {style["select-collection-list"]}>
          <li className = {style["add-collection"]}>
            <button type = "button" onClick = {() => {showNewCollectionDialog()}}>Add</button>
          </li>
          {allColection.map((item) => 
            <CollectionOption key = {item.id} id = {item.id} title = {item.name} color = {item.color}/>
          )}
          
      </ul>
      </>
    )
  }