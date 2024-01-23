import { useContext } from "react"
import ModalContext from "/src/Context/modalContext.js"

export default function useModal() {
    const {modalRef} = useContext(ModalContext)

    return modalRef
}