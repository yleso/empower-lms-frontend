import { FC, PropsWithChildren } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import Button from '@/generic/buttons/primary-button/button'
import Field from '@/generic/field/field'
import { PopupInterface } from '@/components/popup/popup.interface.js'
import Popup from '@/components/popup/popup.js'
import Radio from '@/components/radio/radio'
import { useTheme } from '@/hooks/useTheme.hook'
import departmentApi from '@/store/api/department.api'
import teamApi from '@/store/api/team.api'
import Text from '@/styles/text.module.scss'
import Styles from './create-department-section.module.scss'
import { CreateDepartmentSectionInterface } from './create-department.interface'


const CreateDepartmentSection: FC<PropsWithChildren<PopupInterface>> = ({
	isOpened,
	setIsOpened,
	reference
}) => {
	//Hooks
	const { darkmode } = useTheme()
	const { dep_id, team_id } = useParams()
	const {
		register,
		handleSubmit,
		reset: resetForm
	} = useForm<CreateDepartmentSectionInterface>({
		mode: 'onChange'
	})

	//Api functions
	const [createDepartmentApi] = departmentApi.useCreateDepartmentMutation()
	const [createTeamApi] = teamApi.useCreateTeamMutation()

	const currentSectionId = dep_id
		? Number(dep_id)
		: team_id
		? Number(team_id)
		: undefined

	const createSection: SubmitHandler<
		CreateDepartmentSectionInterface
	> = async data => {
		if (data.type === 'Department') {
			await createDepartmentApi({
				name: data.name,
				department: currentSectionId
			}).then(() => {
				resetForm()
				setIsOpened(false)
			})
		} else {
			await createTeamApi({
				name: data.name,
				department: currentSectionId
			}).then(() => {
				resetForm()
				setIsOpened(false)
			})
		}
	}

	return (
		<Popup isOpened={isOpened} setIsOpened={setIsOpened} reference={reference}>
			<form onSubmit={handleSubmit(createSection)} className={Styles.Form}>
				<div className={`${Styles.Field} ${darkmode && Styles.FieldDark}`}>
					<h6 className={Text.H6Bold}>Name</h6>
					<Field
						{...register('name')}
						type={'text'}
						theme={!darkmode ? 'grey' : 'black'}
						reference={register('name').ref}
					/>
				</div>
				<div className={`${Styles.Field} ${darkmode && Styles.FieldDark}`}>
					<h6 className={Text.H6Bold}>Type</h6>
					<Radio
						text={'Team'}
						value={'Team'}
						{...register('type')}
						reference={register('type').ref}
					/>
					<Radio
						text={'Department'}
						value={'Department'}
						{...register('type')}
						reference={register('type').ref}
					/>
				</div>
				<Button text={'Create'} submit small fill />
			</form>
		</Popup>
	)
}

export default CreateDepartmentSection