import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'tabler-icons-react'
import { BreadCrumbsInterface } from '@/components/bread-crumbs/bread-crumbs.interface'
import Text from '@/styles/text.module.scss'
import Styles from './bread-crumbs.module.scss'


const BreadCrumbs: FC<BreadCrumbsInterface> = ({ points }) => {
	return (
		<div className={Styles.Crumbs}>
			{points.map(point => (
				<>
					<Link
						key={point.link}
						to={point.link}
						className={Text.Caption1Regular}
					>
						{point.name}
					</Link>
					<ChevronRight size={12} />
				</>
			))}
		</div>
	)
}

export default BreadCrumbs