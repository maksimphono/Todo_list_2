import {useCallback, useContext} from "react"

import modalContext from "../../../Context/modalContext.js";

import {addOneCollection} from "../../../Context/Redux/todoCollectionsSlice.js"
import { store } from "../../../Context/Redux/store.js";



// styles
import style_NewCollectionForm from "../styles/NewCollectionForm.module.scss"
import { useDispatch } from "react-redux";

import { createOneCollection } from "../../../Context/Redux/utilities.js";

export default function NewCollectionForm({id, closeModal}) {
    const dispatch = useDispatch()

    const handleSubmit = useCallback(event => {
      event.preventDefault()
      const formDate = new FormData(event.target)
      console.log(formDate.get("name"), formDate.get("color"))
      
      createOneCollection({dispatch, entry : {
        id : new Date().toString().slice(4, 24),
        name : formDate.get("name"), 
        color : formDate.get("color")
      }})
      
      event.target.reset()
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