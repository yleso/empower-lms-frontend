import { FC } from 'react'
import Styles from './avatar.module.scss'
import AvatarInterface from './avatar.interface'

const Avatar: FC<AvatarInterface> = (data) => {
	return (
		<div
			className={Styles.Avatar}
			style={{
				backgroundImage: `url(${data.avatarPath})`,
				width: data.width,
				height: data.height
			}}
		>
			<div />
			<img
				src={data.avatarPath}
				alt={`${data.alt}`} />
		</div>
	)
}

export default Avatar