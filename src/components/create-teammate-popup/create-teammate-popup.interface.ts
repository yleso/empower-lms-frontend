import { Dispatch, RefObject, SetStateAction } from 'react'
import { OptionInterface } from '@/generic/select/select.interface'

export interface CreateTeammatePopupInterface {
	popupShow: boolean
	setPopupShow: Dispatch<SetStateAction<boolean>>
	popupRef: RefObject<any>
	teams: OptionInterface[]
}