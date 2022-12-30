import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/generic/buttons/primary-button/button'
import Field from '@/components/generic/field/field'
import Popup from '@/components/popup/popup'
import { CreateCourseDto } from '@/types/course/create-course.dto'
import { useAuth } from '@/hooks/useAuth.hook'
import { useTheme } from '@/hooks/useTheme.hook'
import courseApi from '@/store/api/course.api'
import Text from '@/styles/text.module.scss'
import Styles from '../faq-popup/faq-popup.module.scss'
import { PopupInterface } from '../popup.interface'


const CoursePopup: FC<PopupInterface> = ({ isShow, setIsShow, reference }) => {
	const { darkmode } = useTheme()

	const { user } = useAuth()
	const teamId = user?.team_id || 0

	const navigate = useNavigate()

	const { register, handleSubmit, reset } = useForm<CreateCourseDto>({
		mode: 'onChange'
	})

	const [createCourse] = courseApi.useCreateCourseMutation()

	const onSubmit: SubmitHandler<CreateCourseDto> = async data => {
		const courseData = {
			...data,
			team: Number(teamId)
		}

		setIsShow(false)
		await createCourse(courseData).then(response => {
			//Get new course from response
			//@ts-ignore
			const newCourse = response.data
			navigate(`/knowledge-base/course/${newCourse.id}`)
		})
		reset()
	}

	return (
		<Popup isOpened={isShow} setIsOpened={setIsShow} reference={reference}>
			<form
				className={`${Styles.Content} ${darkmode && Styles.ContentDark}`}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className={`${Styles.PopupGrid}`}>
					<div className={Styles.Field}>
						<label className={Text.H6Bold}>Course name</label>
						<Field
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
				<Button text={'Create Course'} fill small submit />
			</form>
		</Popup>
	)
}

export default CoursePopup