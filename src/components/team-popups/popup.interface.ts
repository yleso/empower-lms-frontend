import { Dispatch, RefObject, SetStateAction } from 'react'

export interface PopupInterface {
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
	reference: RefObject<any>
}