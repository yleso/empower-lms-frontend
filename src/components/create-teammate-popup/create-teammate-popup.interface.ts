import { Dispatch, RefObject, SetStateAction } from 'react'
import { OptionInterface } from '@/generic/select/select.interface'

export interface CreateTeammatePopupInterface {
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
	reference: RefObject<any>
	teams: OptionInterface[]
}