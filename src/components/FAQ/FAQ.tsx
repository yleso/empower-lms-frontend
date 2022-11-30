import { ThemeContext } from '@/context/theme.context'
import { FC, useContext, useState } from 'react'
import { Plus } from 'tabler-icons-react'
import Text from '@/styles/text.module.scss'
import Vars from '@/vars/vars.json'
import FAQInterface from './FAQ.interface'
import Styles from './FAQ.module.scss'

const Faq: FC<FAQInterface> = FAQ => {
	const { darkmode } = useContext(ThemeContext)
	const [opened, setOpened] = useState(false)

	return (
		<div
			className={`${Styles.FAQ} ${opened && Styles.FAQOpened} ${
				darkmode && Styles.FAQDark
			}`}
			onClick={() => setOpened(!opened)}
		>
			<div className={Styles.FAQHeader}>
				<h6 className={`${Text.H6Bold} ${Styles.FAQQuestion}`}>
					{FAQ.question}
				</h6>
				<Plus size={24} color={Vars['brand-main-color']} />
			</div>
			<p className={`${Text.Body1Regular} ${Styles.FAQAnswer}`}>{FAQ.answer}</p>
		</div>
	)
}

export default Faq
