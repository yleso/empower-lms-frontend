import { FC } from 'react'
import { ArrowLeft } from 'tabler-icons-react'
import Text from '@/styles/text.module.scss'
import Styles from './back-button.module.scss'


const BackButton: FC<{ whereToText?: string; whereToLink?: string }> = ({
	whereToText,
	whereToLink
}) => {
	const backFunction = () => {
		history.back()
	}

	const text = (): string => {
		if (whereToText) return `Go back to ${whereToText}`
		return 'Go back'
	}

	return (
		<div className={Styles.Container}>
			<ArrowLeft size={16} />
			<button onClick={backFunction} className={Text.Caption1Medium}>
				{text()}
			</button>
		</div>
	)
}

export default BackButton