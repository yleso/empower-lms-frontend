import { FC, useContext } from 'react'
import { AddSectionElementInterface } from '@/components/add-section-element/add-section-element.interface'
import { ThemeContext } from '@/context/theme.context'
import Text from '@/styles/text.module.scss'
import Styles from './add-section-element.module.scss'


const AddSectionElement: FC<AddSectionElementInterface> = ({
	whatToAdd,
	addFunction
}) => {
	const { darkmode } = useContext(ThemeContext)

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