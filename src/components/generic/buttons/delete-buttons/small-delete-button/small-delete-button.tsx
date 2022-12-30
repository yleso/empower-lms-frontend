import { FC } from 'react'
import { Trash } from 'tabler-icons-react'
import Vars from '@/vars/vars.json'

const SmallDeleteButton: FC<{
	disabled?: boolean
	deleteFunction: () => Promise<void> | void
}> = ({ disabled, deleteFunction }) => {
	return (
		<button type={'button'} onClick={deleteFunction} disabled={disabled}>
			<Trash size={16} color={Vars['grey-primary-color']} />
		</button>
	)
}

export default SmallDeleteButton