import { FC } from 'react'
import { Trash } from 'tabler-icons-react'
import Styles from './large-delete-button.module.scss'

interface PropsInterface {
	deleteFunction: () => Promise<void>
}

const LargeDeleteButton: FC<PropsInterface> = ({ deleteFunction }) => {
	return (
		<button
			className={Styles.DeleteButton}
			type={'button'}
			onClick={deleteFunction}
		>
			<Trash height={16} />
		</button>
	)
}

export default LargeDeleteButton