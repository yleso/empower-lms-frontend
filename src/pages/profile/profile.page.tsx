import React, {
	ChangeEvent,
	DragEvent,
	FC,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Page404 from '@/pages/404/404.page'
import AssignedCourseMini from '@/components/assigned-course/mini/assigned-course'
import Avatar from '@/components/avatar/avatar'
import Certificate from '@/components/certificate/certificate'
import Field from '@/components/generic/field/field'
import Popup from '@/components/popup/popup'
import { ThemeContext } from '@/context/theme.context'
import useAuth from '@/hooks/useAuth.hook'
import useOutside from '@/hooks/useOutside.hook'
import employeeApi from '@/store/api/employee.api'
import uploadApi from '@/store/api/upload.api'
import Text from '@/styles/text.module.scss'
import Vars from '@/vars/vars.json'
import { CertificatesData } from '../../data/certificates.data'
import { ProfileAssignedData } from '../../data/profile-assigned.data'
import { ProfileInputInterface } from './profile-input.interface'
import Styles from './profile.module.scss'


const ProfilePage: FC = () => {
	//Hooks
	const { darkmode } = useContext(ThemeContext)
	const { user } = useAuth()
	const { employee_id: userId } = useParams()
	const path = useLocation().pathname
	const { isShow, setIsShow, ref: popupRef } = useOutside(false)

	const isProfile = path === '/profile'
	const profileId: number = isProfile && user ? user.id : userId ? +userId : 0

	//Data fetch
	const { data: userData } = employeeApi.useGetEmployeeQuery(profileId)
	//End of fetching data

	const User = { ...userData }
	const ProfileData: ProfileInputInterface[] = [
		{ label: 'Name', value: User.name, type: 'text' },
		{ label: 'Surname', value: User.surname, type: 'text' },
		{ label: 'Email', value: User.email, type: 'text' },
		{ label: 'Team', value: User?.team?.name, type: 'text' },
		{ label: 'Job title', value: User.job_title, type: 'text' },
		{ label: 'Phone number', value: User.phone, type: 'text' },
		{ label: 'Starting date', value: User.starting_date, type: 'text' },
		{ label: 'Line manager', value: User.line_manager, type: 'text' }
	]

	const [activeSwitch, setActiveSwitch] = useState('Assigned')

	// const {
	// 	register,
	// 	formState: { errors },
	// 	handleSubmit
	// } = useForm<ChangePasswordFieldsInterface>({
	// 	mode: 'onChange'
	// })

	// const { changePassword } = useActions()

	// const onSubmit: SubmitHandler<ChangePasswordFieldsInterface> = data => {
	// 	changePassword(data)
	// 	window.location.reload()
	// }

	//For popup
	const [drag, setDrag] = useState(false)
	const [uploadError, setUploadError] = useState(false)

	const [uploadAvatar] = uploadApi.useUploadNewFileMutation()
	const [deleteAvatar] = uploadApi.useDeleteFileMutation()

	const [changeEmployeeAvatar] = employeeApi.useChangeEmployeeAvatarMutation()

	const changeAvatarApi = async () => {
		setDrag(false)
		setUploadError(false)

		if (uploadFormRef.current === null) return

		//Deleting previous avatar
		if (User.avatar) {
			await deleteAvatar(User.avatar.id)
		}

		//Uploading new avatar
		await uploadAvatar(uploadFormRef.current).then(async response => {
			await changeEmployeeAvatar({
				userId: profileId,
				// @ts-ignore
				avatarId: response.data[0].id
			})
		})

		setIsShow(false)
	}

	const dragStartHandler = (event: DragEvent<HTMLElement>) => {
		event.preventDefault()
		setDrag(true)
	}

	const dragLeaveHandler = (event: DragEvent<HTMLElement>) => {
		event.preventDefault()
		setDrag(false)
	}

	const onDropHandler = async (event: DragEvent<HTMLElement>) => {
		event.preventDefault()

		if (event.dataTransfer.files.length > 1) {
			setUploadError(true)
			setDrag(false)

			return
		}

		if (!event.dataTransfer.files[0].type.startsWith('image/')) {
			setUploadError(true)
			setDrag(false)

			return
		}

		if (avatarRef.current !== null) {
			avatarRef.current.files = event.dataTransfer.files
			await changeAvatarApi()
		}
	}

	const changeAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files !== null) {
			await changeAvatarApi()
		}
	}

	const avatarRef = useRef<HTMLInputElement>(null)
	const uploadFormRef = useRef<HTMLFormElement>(null)

	const memoAvatarRef = useMemo(() => avatarRef, [isShow])

	useEffect(() => {
		return () => {
			setDrag(false)
			setUploadError(false)
		}
	}, [isShow])

	if (!userData) return <Page404 />

	return (
		<>
			<Popup isOpened={isShow} setIsOpened={setIsShow} popupRef={popupRef}>
				<form id={Styles.UploadForm} ref={uploadFormRef}>
					<input
						ref={memoAvatarRef}
						name={'files'}
						id={Styles.UploadAvatar}
						type={'file'}
						accept={'image/*'}
						onChange={changeAvatar}
					/>
					<label
						htmlFor={Styles.UploadAvatar}
						className={Styles.DragAndDrop}
						style={{
							backgroundColor: uploadError ? Vars['system-red-color'] : '',
							opacity: !drag ? 1 : 0.5
						}}
						onDragStart={event => dragStartHandler(event)}
						onDragLeave={event => dragLeaveHandler(event)}
						onDragOver={event => dragStartHandler(event)}
						onDrop={event => onDropHandler(event)}
					>
						{!uploadError
							? !drag
								? 'Drag and drop your image here or choose file'
								: 'Release the file'
							: 'Some error occurred!'}
					</label>
				</form>
			</Popup>
			<section
				className={`${Styles.Profile} ${darkmode && Styles.ProfileDark}`}
			>
				<div className={Styles.ProfileInfo}>
					<div className={Styles.ProfileAvatar}>
						<div>
							<Avatar
								width={'128px'}
								height={'168px'}
								alt={'Avatar'}
								avatarPath={
									User?.avatar
										? `http://localhost:4200${User?.avatar?.formats.thumbnail.url}`
										: 'https://via.placeholder.com/128x168'
								}
							/>
						</div>
						{(user?.id === Number(userId) || isProfile) && (
							<button
								onClick={() => setIsShow(true)}
								className={`${Text.Caption1Medium} ${Styles.AvatarEdit}`}
							>
								Change avatar
							</button>
						)}
						{/*<button*/}
						{/*	onClick={() => setIsShow(true)}*/}
						{/*	className={`${Text.Caption1Medium} ${Styles.AvatarEdit}`}*/}
						{/*>*/}
						{/*	Change avatar*/}
						{/*</button>*/}
					</div>
					<div className={Styles.ProfileGrid}>
						{ProfileData.map((inputData, index) => (
							<div key={index} className={`${Styles.ProfileInput}`}>
								<h6 className={Text.H6Bold}>{inputData.label}</h6>
								<Field
									name={inputData.label}
									type={inputData.type}
									theme={!darkmode ? 'grey' : 'black'}
									value={inputData.value}
									disabled
								/>
							</div>
						))}
					</div>
				</div>

				{/*{userData.id === user?.id &&*/}
				{/*	<form*/}
				{/*		className={Styles.PasswordChange}*/}
				{/*		onSubmit={handleSubmit(onSubmit)}*/}
				{/*	>*/}
				{/*		<div className={`${Styles.ProfileInput}`}>*/}
				{/*			<h6 className={Text.H6Bold}>Current Password</h6>*/}
				{/*			<Field*/}
				{/*				type={'password'}*/}
				{/*				theme={!darkmode ? 'grey' : 'black'}*/}
				{/*				{...register('currentPassword')}*/}
				{/*				reference={register('currentPassword').ref}*/}
				{/*			/>*/}
				{/*		</div>*/}
				{/*		<div className={`${Styles.ProfileInput}`}>*/}
				{/*			<h6 className={Text.H6Bold}>New Password</h6>*/}
				{/*			<Field*/}
				{/*				type={'password'}*/}
				{/*				theme={!darkmode ? 'grey' : 'black'}*/}
				{/*				{...register('password')}*/}
				{/*				reference={register('password').ref}*/}
				{/*			/>*/}
				{/*		</div>*/}
				{/*		<div className={`${Styles.ProfileInput}`}>*/}
				{/*			<h6 className={Text.H6Bold}>Confirm Password</h6>*/}
				{/*			<Field*/}
				{/*				type={'password'}*/}
				{/*				theme={!darkmode ? 'grey' : 'black'}*/}
				{/*				{...register('passwordConfirmation')}*/}
				{/*				reference={register('passwordConfirmation').ref}*/}
				{/*			/>*/}
				{/*		</div>*/}
				{/*		<Button*/}
				{/*			text={'Change'}*/}
				{/*			stroke*/}
				{/*			small*/}
				{/*			submit*/}
				{/*		/>*/}
				{/*	</form>*/}
				{/*}*/}
			</section>

			<section className={Styles.SwitchSection}>
				<div className={Styles.Switcher}>
					<button
						className={`${Text.Body1Regular} ${
							activeSwitch === 'Assigned'
								? !darkmode
									? Styles.SwitcherPointActive
									: Styles.SwitcherPointActiveDark
								: Styles.SwitcherPoint
						}`}
						onClick={() => setActiveSwitch('Assigned')}
					>
						Assigned
					</button>
					<div />
					<button
						className={`${Text.Body1Regular} ${
							activeSwitch === 'Certificates'
								? !darkmode
									? Styles.SwitcherPointActive
									: Styles.SwitcherPointActiveDark
								: Styles.SwitcherPoint
						}`}
						onClick={() => setActiveSwitch('Certificates')}
					>
						Certificates
					</button>
				</div>
				{activeSwitch === 'Assigned' ? (
					<>
						<div className={Styles.AssignedGrid}>
							{ProfileAssignedData.map((assigned, index) => (
								<AssignedCourseMini
									key={index}
									name={assigned.name}
									progress={assigned.progress}
									startedOn={assigned.startedOn}
								/>
							))}
						</div>
					</>
				) : activeSwitch === 'Certificates' ? (
					<>
						<div className={Styles.CertificatesGrid}>
							{CertificatesData.map((certificate, index) => (
								<Certificate
									key={index}
									name={certificate.name}
									passedIn={certificate.passedIn}
								/>
							))}
						</div>
					</>
				) : (
					<></>
				)}
			</section>
		</>
	)
}

export default ProfilePage