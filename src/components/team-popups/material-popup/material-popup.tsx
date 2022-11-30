import React, { FC, useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import Field from '@/generic/field/field'
import Button from '@/components/generic/buttons/primary-button/button'
import { ThemeContext } from '@/context/theme.context'
import { CreateCourseDto } from '@/types/course/create-course.dto'
import courseApi from '@/store/api/course.api'
import Text from '@/styles/text.module.scss'
import Popup from '../../popup/popup'
import Styles from '../faq-popup/faq-popup.module.scss'
import { PopupInterface } from '../popup.interface'


type FixType = any

const MaterialPopup: FC<PopupInterface> = ({
	popupShow,
	setPopupShow,
	popupRef
}) => {
	const { darkmode } = useContext(ThemeContext)
	const { team_id: teamId } = useParams()

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<CreateCourseDto>({
		mode: 'onChange'
	})

	const [createCourse, { isLoading }] = courseApi.useCreateCourseMutation()

	const onSubmit: SubmitHandler<FixType> = async data => {
		const materialData = {
			...data,
			team: Number(teamId)
		}

		setPopupShow(false)
		await createCourse(materialData)
		!isLoading && window.location.reload()
	}

	return (
		<Popup isOpened={popupShow} setIsOpened={setPopupShow} popupRef={popupRef}>
			<form
				className={`${Styles.Content} ${darkmode && Styles.ContentDark}`}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className={`${Styles.PopupGrid}`}>
					<div className={Styles.Field}>
						<label className={Text.H6Bold}>Material name</label>
						<Field
							{...register('name')}
							type={'text'}
							theme={!darkmode ? 'grey' : 'black'}
							required
							{...register('name')}
							reference={register('name').ref}
						/>
					</div>
					<div className={`${Styles.Field}`}>
						<label className={Text.H6Bold}>Description</label>
						<Field
							type={'textarea'}
							theme={!darkmode ? 'grey' : 'black'}
							required
							{...register('description')}
							reference={register('description').ref}
						/>
					</div>
				</div>
				<Button text={'Add material'} fill small submit />
			</form>
		</Popup>
	)
}

export default MaterialPopup