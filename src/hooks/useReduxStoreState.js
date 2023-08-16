import { useSelector } from "react-redux";

export default function useReduxStoreState() {
    return useSelector(state => state)
}