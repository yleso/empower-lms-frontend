import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootStateType } from '../store/store'

const useTypedSelector: TypedUseSelectorHook<RootStateType> = useSelector

export default useTypedSelector