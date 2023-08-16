import { useEffect } from "react"

export default function useSliceInit(dispatch, slice) {
    useEffect(() => {
        dispatch(slice.actions.init())
    }, [])
}
