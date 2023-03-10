import { FC } from 'react'
import Text from '@/styles/text.module.scss'
import SwitcherInterface from './switcher.interface'
import Styles from './switcher.module.scss'


const Switcher: FC<SwitcherInterface> = ({ state, toggle }) => {
	return (
		<>
			<label htmlFor={'checkbox'} className={Styles.Switcher}>
				<input
					id={'checkbox'}
					type='checkbox'
					onChange={() => toggle(state => !state)}
					className={Styles.SwitcherInput}
				/>
				<div className={Styles.SwitcherChooser} />
				<span
					className={`${Text.Caption1Medium} ${Styles.SwitcherVariant} ${
						!state && Styles.SwitcherVariantActive
					}`}
				>
					Assigned
				</span>
				<span
					className={`${Text.Caption1Medium} ${Styles.SwitcherVariant} ${
						state && Styles.SwitcherVariantActive
					}`}
				>
					Done
				</span>
			</label>
		</>
	)
}

export default Switcher