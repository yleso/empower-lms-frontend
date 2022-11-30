import { FC } from 'react'
import { Check, Pencil, Plus } from 'tabler-icons-react'
import Text from '@/styles/text.module.scss'
import {
	AddButtonInterface,
	EditButtonInterface
} from './admin-button.interface'
import Styles from './admin-button.module.scss'


const AddButton: FC<AddButtonInterface> = ({ action }) => {
	return (
		<button
			type={'button'}
			className={`${Text.ButtonSmall} ${Styles.Button}`}
			onClick={action}
		>
			<Plus size={10} strokeWidth={4} />
			<span>ADD</span>
		</button>
	)
}

const EditButton: FC<EditButtonInterface> = ({ editing, toggleEdit }) => {
	return (
		<button
			type={'button'}
			className={`${Text.ButtonSmall} ${Styles.Button}`}
			onClick={toggleEdit}
		>
			{!editing ? (
				<Pencil size={10} strokeWidth={4} />
			) : (
				<Check size={10} strokeWidth={4} />
			)}
			<span>{!editing ? 'EDIT' : 'SAVE'}</span>
		</button>
	)
}

export { AddButton, EditButton }