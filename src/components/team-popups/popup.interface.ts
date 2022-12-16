import { Dispatch, RefObject, SetStateAction } from 'react'

export interface PopupInterface {
	popupShow: boolean
	setPopupShow: Dispatch<SetStateAction<boolean>>
	popupRef: RefObject<any>
	setValue?: Dispatch<SetStateAction<any[] | undefined>>
}