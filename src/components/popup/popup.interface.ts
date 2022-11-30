import { Dispatch, RefObject, SetStateAction } from 'react'

export interface PopupInterface {
	isOpened: boolean
	setIsOpened: Dispatch<SetStateAction<boolean>>
	popupRef: RefObject<any>
}