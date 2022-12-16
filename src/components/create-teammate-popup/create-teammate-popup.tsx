import emailjs from '@emailjs/browser'
import { FC, useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Select from '@/generic/select/select'
import Button from '@/components/generic/buttons/primary-button/button'
import Field from '@/components/generic/field/field'
import Popup from '@/components/popup/popup'
import { ThemeContext } from '@/context/theme.context'
import { GeneratePassword } from '@/utils/password-generator.util'
import employeeApi from '@/store/api/employee.api'
import Text from '@/styles/text.module.scss'
import { CreateTeammateFormInterface } from './create-teammate-form.interface'
import { CreateTeammatePopupInterface } from './create-teammate-popup.interface'
import Styles from './create-teammate-popup.module.scss'
import TeammateFields from './employee.fields'


const CreateTeammatePopup: FC<CreateTeammatePopupInterface> = ({
	popupShow,
	setPopupShow,
	popupRef,
	teams
}) => {
	//Hooks
	//Theme hook
	const { darkmode } = useContext(ThemeContext)
	//Error hook
	const [error, setError] = useState<string>()

	//Make errors empty on load
	useEffect(() => {
		setError(undefined)
		reset()
	}, [popupShow])

	const [createUserApi] = employeeApi.useCreateEmployeeMutation()

	const sendEmail = async (name: string, email: string, password: string) => {
		await emailjs.send(
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

	const { register, handleSubmit, reset } =
		useForm<CreateTeammateFormInterface>({
			mode: 'onChange'
		})

	const onSubmit: SubmitHandler<CreateTeammateFormInterface> = async data => {
		const userData = {
			...data,
			phone: data.phone ? data.phone : undefined,
			username: data.email,
			password: GeneratePassword(12)
		}

		await createUserApi(userData).then(async response => {
			//Get error from response
			//@ts-ignore
			const error = response?.error?.data?.error
			//If email is already registered
			if (error) {
				if (error.message === 'Email already taken') {
					return setError('Employee with this email is already exist')
				} else {
					return setError('Employee with this phone is already exist')
				}
			}
			//Close popup
			setPopupShow(false)
			//Send email with login and password to new employee
			await sendEmail(userData.name, userData.email, userData.password)
		})
	}

	return (
		<Popup isOpened={popupShow} setIsOpened={setPopupShow} popupRef={popupRef}>
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
							<Select
								theme={!darkmode ? 'grey' : 'black'}
								options={teams}
								{...register('team')}
								reference={register('team').ref}
							/>
						</div>
					</div>
					{error && <div className={Styles.Error}>{error}</div>}
					<Button text={'Add a team member'} fill small submit />
				</form>
			</div>
		</Popup>
	)
}

export default CreateTeammatePopup