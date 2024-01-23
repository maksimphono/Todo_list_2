import { lazy, useCallback, useContext, Suspense, useId } from "react"
//import modalContext from "../Context/modalContext"
import useModal from "./useModal"

export default function useNewCollectionDialog(styled_buttons) {
    const NewCollectionForm = lazy(() => import("../pages/NewRecord/Components/NewCollectionForm"))

    const modal = useModal()
    const newCollectionFormId = useId()

    return useCallback(() => {
        modal.current.setTitle("New collection");
        modal.current.setBody(
            <Suspense fallback = {<div>Loading...</div>}>
                <NewCollectionForm id = {newCollectionFormId} closeModal = {modal.current.close} />
            </Suspense>
        );
        modal.current.setFooter([<button form = {newCollectionFormId} className = {styled_buttons && styled_buttons["success-btn"] || ""} type = "submit">Create</button>]);
        modal.current.showModal()
    }, [modal.current, newCollectionFormId, NewCollectionForm])
}
