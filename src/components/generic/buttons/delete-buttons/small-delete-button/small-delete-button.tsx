import { FC } from 'react'
import { Trash } from 'tabler-icons-react'
import Vars from '@/vars/vars.json'

const SmallDeleteButton: FC<{ deleteFunction: () => Promise<void> | void }> = ({
	deleteFunction
}) => {
	return (
		<button type={'button'} onClick={deleteFunction}>
			<Trash size={16} color={Vars['grey-primary-color']} />
		</button>
	)
}

export default SmallDeleteButton