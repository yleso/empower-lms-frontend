import React, { FC, useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/generic/buttons/primary-button/button'
import Field from '@/components/generic/field/field'
import Popup from '@/components/popup/popup'
import { ThemeContext } from '@/context/theme.context'
import { CreateCourseDto } from '@/types/course/create-course.dto'
import { useAuth } from '@/hooks/useAuth.hook'
import courseApi from '@/store/api/course.api'
import employeeApi from '@/store/api/employee.api'
import Text from '@/styles/text.module.scss'
import Styles from '../faq-popup/faq-popup.module.scss'
import { PopupInterface } from '../popup.interface'


const CoursePopup: FC<PopupInterface> = ({
	popupShow,
	setPopupShow,
	popupRef
}) => {
	const { darkmode } = useContext(ThemeContext)

	const { user } = useAuth()
	const { data: userTeam } = employeeApi.useGetEmployeeTeamQuery(user?.id || 0)
	const teamId = userTeam?.data[0].id

	const navigate = useNavigate()

	const { register, handleSubmit } = useForm<CreateCourseDto>({
		mode: 'onChange'
	})

	const [createCourse] = courseApi.useCreateCourseMutation()

	const onSubmit: SubmitHandler<CreateCourseDto> = async data => {
		const courseData = {
			...data,
			team: Number(teamId)
		}

		setPopupShow(false)
		await createCourse(courseData).then(response => {
			//Get new course from response
			//@ts-ignore
			const newCourse = response.data.data
			navigate(`/knowledge-base/course/${newCourse.id}`)
		})
	}

	return (
		<Popup isOpened={popupShow} setIsOpened={setPopupShow} popupRef={popupRef}>
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