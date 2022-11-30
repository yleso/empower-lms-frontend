import emailjs from '@emailjs/browser'
import React, { FC, useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import Button from '@/components/generic/buttons/primary-button/button'
import Field from '@/components/generic/field/field'
import Popup from '@/components/popup/popup'
import { ThemeContext } from '@/context/theme.context'
import { GeneratePassword } from '@/utils/password-generator.util'
import employeeApi from '@/store/api/employee.api'
import Text from '@/styles/text.module.scss'
import TeammateFields from './teammate-popul.fields'
import { TeammatePopupFormInterface } from './teammate-popup.form.interface'
import { TeammatePopupInterface } from './teammate-popup.interface'
import Styles from './teammate-popup.module.scss'


const TeammatePopup: FC<TeammatePopupInterface> = ({
	popupShow,
	setPopupShow,
	popupRef,
	teamName
}) => {
	const { darkmode } = useContext(ThemeContext)

	const { team_id } = useParams()
	const teamId = Number(team_id) || 0

	const [createUserApi] = employeeApi.useCreateEmployeeMutation()

	const sendEmail = (name: string, email: string, password: string) => {
		emailjs.send(
			import.meta.env.VITE_EMAIL_SERVICE_ID,
			import.meta.env.VITE_EMAIL_TEMPLATE_ID,
			{
				user_name: name,
				user_email: email,
				user_password: password
			},
			import.meta.env.VITE_EMAIL_PUBLIC_KEY
		)
	}

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<TeammatePopupFormInterface>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<TeammatePopupFormInterface> = async data => {
		const userData = {
			...data,
			username: data.email,
			team: teamId,
			password: GeneratePassword(12)
		}

		setPopupShow(false)
		await createUserApi(userData).then(() => {
			sendEmail(userData.name, userData.email, userData.password)
		})
	}

	return (
		<>
			{/*Content*/}
			<Popup
				isOpened={popupShow}
				setIsOpened={setPopupShow}
				popupRef={popupRef}
			>
				<div className={`${darkmode && Styles.ContentDark} ${Styles.Content}`}>
					<form
						className={`${Styles.PopupForm}`}
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className={`${Styles.PopupGrid}`}>
							{TeammateFields.map(field => (
								<div key={field.label} className={`${Styles.Field}`}>
									<div>
										<label className={Text.H6Bold}>{field.label}</label>
										{field.label === 'Phone' && <span>Opt.</span>}
									</div>
									<Field
										type={field.type}
										required={field.label !== 'Phone'}
										theme={!darkmode ? 'grey' : 'black'}
										{...register(field.name)}
										reference={register(field.name).ref}
									/>
								</div>
							))}

							<div key={'Team'} className={`${Styles.Field}`}>
								<div>
									<label className={Text.H6Bold}>Team</label>
								</div>
								<Field
									type={'text'}
									required={true}
									theme={!darkmode ? 'grey' : 'black'}
									value={teamName}
									disabled={true}
								/>
							</div>
						</div>
						<Button text={'Add a team member'} fill small submit />
					</form>
				</div>
			</Popup>
		</>
	)
}

export default TeammatePopup