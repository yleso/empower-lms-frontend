import { useQuery } from '@apollo/client'
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
import {
	learningsQuery,
	progressInterface
} from '@/pages/my-learning/learnings.query'
import AssignedCourseMini from '@/components/assigned-course/mini/assigned-course'
import { AssignedCourseInterface } from '@/components/assigned-course/mini/assigned-course.interface'
import Avatar from '@/components/avatar/avatar'
import Certificate from '@/components/certificate/certificate'
import { CertificateInterface } from '@/components/certificate/sertificate.interface'
import Field from '@/components/generic/field/field'
import Loader from '@/components/loader/loader'
import Popup from '@/components/popup/popup'
import { ThemeContext } from '@/context/theme.context'
import { useAuth } from '@/hooks/useAuth.hook'
import { useOutside } from '@/hooks/useOutside.hook'
import { calculateProgress } from '@/utils/calculate-progress.util'
import employeeApi from '@/store/api/employee.api'
import uploadApi from '@/store/api/upload.api'
import Text from '@/styles/text.module.scss'
import Vars from '@/vars/vars.json'
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
	const { data: userData, isLoading: userDataLoading } =
		employeeApi.useGetEmployeeQuery(profileId)
	const { data: progressData, loading: progressLoading } = useQuery(
		learningsQuery(profileId)
	)
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

	const [activeSwitch, setActiveSwitch] = useState<'Assigned' | 'Certificates'>(
		'Assigned'
	)

	const [progresses, setProgresses] = useState<progressInterface[]>()

	useEffect(() => {
		setProgresses(progressData?.userProgresses.data)
	}, [progressData])

	//Assigned courses array
	const { assignedCourses, certificates } = useMemo(() => {
		let assignedCourses: AssignedCourseInterface[] = []
		let certificates: CertificateInterface[] = []

		if (progresses) {
			for (const progress of progresses) {
				const lessonsCount = (): number => {
					let lessonsCount = 0

					for (const module of progress.attributes.course.data.attributes
						.modules.data) {
						lessonsCount += module.attributes.lessons.data.length
					}

					return lessonsCount
				}

				const testsCount = (): number => {
					let testsCount = 0

					for (const module of progress.attributes.course.data.attributes
						.modules.data) {
						testsCount += module.attributes.tests.data.length
					}

					return testsCount
				}

				const totalProgress = calculateProgress(
					lessonsCount(),
					progress.attributes.lessons.data.length,
					testsCount(),
					progress.attributes.tests.data.length
				)

				if (totalProgress !== 100) {
					const formattedAssignedCourse = {
						id: progress.id,
						name: progress.attributes.course.data.attributes.name,
						progress: totalProgress,
						startedOn: progress.attributes.createdAt
					}

					assignedCourses.push(formattedAssignedCourse)
				} else {
					const formattedCertificate = {
						id: progress.id,
						name: progress.attributes.course.data.attributes.name,
						startedOn: progress.attributes.createdAt,
						finishedOn: progress.attributes.updatedAt
					}

					certificates.push(formattedCertificate)
				}
			}
		}

		return { assignedCourses, certificates }
	}, [progresses])

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

	if (userDataLoading || progressLoading) return <Loader />
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
						className={`${Styles.DragAndDrop} ${Text.H6Bold}`}
						style={{
							backgroundColor: uploadError
								? `${Vars['system-red-color']}50`
								: '',
							borderColor: uploadError ? Vars['system-red-color'] : '',
							opacity: !drag ? 1 : 0.5
						}}
						onDragStart={event => dragStartHandler(event)}
						onDragLeave={event => dragLeaveHandler(event)}
						onDragOver={event => dragStartHandler(event)}
						onDrop={event => onDropHandler(event)}
					>
						{!uploadError ? (
							!drag ? (
								<span>
									Drag and drop your image here or{' '}
									<span className={Styles.Underline}>choose file</span>
								</span>
							) : (
								'Release the file'
							)
						) : (
							'Some error occurred!'
						)}
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
					</div>
					<div className={Styles.ProfileGrid}>
						{ProfileData.map((inputData, index) => (
							<div key={index} className={`${Styles.ProfileInput}`}>
								<h6 className={Text.H6Bold}>{inputData.label}</h6>
								<Field
									name={inputData.label}
									type={inputData.type}
									theme={!darkmode ? 'grey' : 'black'}
									value={inputData.value || ''}
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
							{assignedCourses.map(assigned => (
								<AssignedCourseMini
									key={assigned.id}
									id={assigned.id}
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
							{certificates.map(certificate => (
								<Certificate
									key={certificate.id}
									id={certificate.id}
									name={certificate.name}
									startedOn={certificate.startedOn}
									finishedOn={certificate.finishedOn}
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
