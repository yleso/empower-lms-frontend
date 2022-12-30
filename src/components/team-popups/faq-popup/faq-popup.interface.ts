import { Dispatch, SetStateAction } from 'react'
import { PopupInterface } from '@/components/team-popups/popup.interface'


export interface FaqPopupInterface extends PopupInterface {
	setValue: Dispatch<SetStateAction<any>>
}