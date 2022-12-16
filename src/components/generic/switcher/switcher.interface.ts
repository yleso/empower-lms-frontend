import { Dispatch, SetStateAction } from 'react'

export default interface SwitcherInterface {
	state: boolean
	toggle: Dispatch<SetStateAction<boolean>>
}