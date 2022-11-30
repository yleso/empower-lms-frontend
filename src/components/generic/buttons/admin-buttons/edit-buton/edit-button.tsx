import { FC } from 'react'
import { Pencil } from 'tabler-icons-react'
import { EditButtonInterface } from '@/components/generic/buttons/admin-buttons/edit-buton/edit-button.interface'
import Styles from './edit-button.module.scss'


const EditButton: FC<EditButtonInterface> = ({ action }) => {
	return (
		<button onClick={action} type={'button'} className={Styles.EditButton}>
			<Pencil size={10} />
		</button>
	)
}

export default EditButton