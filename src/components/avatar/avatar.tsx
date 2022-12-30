import { FC } from 'react'
import AvatarInterface from './avatar.interface'
import Styles from './avatar.module.scss'

const Avatar: FC<AvatarInterface> = ({ avatarPath, alt, width, height }) => {
	return (
		<div
			className={Styles.Avatar}
			style={{
				backgroundImage: `url(${avatarPath})`,
				width: width,
				height: height
			}}
		>
			<div />
			<img src={avatarPath} alt={`${alt}`} />
		</div>
	)
}

export default Avatar