import { FC } from 'react'
import { AddSectionElementInterface } from '@/components/add-section-element/add-section-element.interface'
import { useTheme } from '@/hooks/useTheme.hook'
import Text from '@/styles/text.module.scss'
import Styles from './add-section-element.module.scss'


const AddSectionElement: FC<AddSectionElementInterface> = ({
	whatToAdd,
	addFunction
}) => {
	const { darkmode } = useTheme()

	return (
		<div
			className={`${Styles.AddSectionElement} ${
				darkmode && Styles.AddSectionElementDark
			}`}
			onClick={addFunction}
		>
			<h6 className={`${Text.H6Bold}`}>
				Add {whatToAdd}
				<span>&nbsp;+</span>
			</h6>
		</div>
	)
}

export default AddSectionElement