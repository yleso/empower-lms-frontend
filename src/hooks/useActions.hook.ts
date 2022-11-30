import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { rootAction } from '@/store/root.action'

const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(rootAction, dispatch)
}

export default useActions