import { useTypedSelector } from './useTypedSelector.hook'

export const useAuth = () => useTypedSelector(state => state.auth)