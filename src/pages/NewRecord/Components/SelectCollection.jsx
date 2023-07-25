import { useRef, useEffect, useContext } from "react";

import {selectedTodosCollectionContext} from "../NewTodoRecord.jsx"

// styles
import style from "../styles/SelectCollection.module.scss"//"../styles/SelectCollection.module.scss"

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
  
import {addOne} from "../../../Context/Redux/todoCollectionsSlice.js"
import { store } from "../../../Context/Redux/store.js";

import modalContext from "../../../Context/modalContext.js";

export default function SelectCollection() {
    const {modalRef} = useContext(modalContext)
    
    return (
      <>
      <ul className = {style["select-collection-list"]}>
          <li className = {style["add-collection"]}>
            <button type = "button" onClick = {() => modalRef.current.alert("qwerty")}>Add</button>
          </li>
          <CollectionOption title = "qert"/>
          <CollectionOption title = "asdfg"/>
          <CollectionOption title = "lkmn "/>
      </ul>
      </>
    )
  }