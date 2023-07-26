import { useRef, useEffect, useContext, useCallback, forwardRef, useImperativeHandle, useId } from "react";


import {selectedTodosCollectionContext} from "../NewTodoRecord.jsx"
import modalContext from "../../../Context/modalContext.js";

import {addOne} from "../../../Context/Redux/todoCollectionsSlice.js"
import { store } from "../../../Context/Redux/store.js";


// styles
import style from "../styles/SelectCollection.module.scss"//"../styles/SelectCollection.module.scss"
import style_NewCollectionForm from "../styles/NewCollectionForm.module.scss"
import styled_buttons from "../../../buttons.module.scss";


function CollectionOption({title}) {
    const context = useContext(selectedTodosCollectionContext);
    const radioInput = useRef(null);

    return (
      <>
        <li>
            <label>
              {title}
              <input ref = {radioInput} name = "select-collection-item" type="radio" onClick = {event => context.setSelectedTodosCollection(title)} />
            </label>
                        
            <button className = {style["edit-collection"]} type = "button">Edit</button>
          </li>
      </>
    )
  }

function NewCollectionForm({id, closeModal}) {
  const handleSubmit = useCallback(event => {
    event.preventDefault()
    const formDate = new FormData(event.target)
    console.log(formDate.get("name"), formDate.get("color"))
    closeModal();
  })

  return (
    <form 
      id = {id}
      className = {style_NewCollectionForm["new_collection_modal_form"]} 
      onSubmit = {handleSubmit}
    >
      <label>
        <h3>Collection name</h3>
        <input name = "name" type="text" />
      </label>
      <label className = {style_NewCollectionForm["color-picker"]}>
        <h3>Collection color</h3>
        <input name = "color" type="color" />
      </label>      
    </form>
  )
}

export default function SelectCollection() {
    const {modalRef} = useContext(modalContext)
    const newCollectionFormId = useId();

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
          <CollectionOption title = "qert"/>
          <CollectionOption title = "asdfg"/>
          <CollectionOption title = "lkmn "/>
      </ul>
      </>
    )
  }