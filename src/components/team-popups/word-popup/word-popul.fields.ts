import TeammatePopup from './word-popup.module.scss'

const TeammateFields = [
	{
		label: 'Name',
		type: 'text',
		class: TeammatePopup.Name
	},
	{
		label: 'Surname',
		type: 'text',
		class: TeammatePopup.Surname
	},
	{
		label: 'Starting Date',
		type: 'date',
		class: TeammatePopup.StartingDate
	},
	{
		label: 'Email',
		type: 'email',
		class: TeammatePopup.Email
	},
	{
		label: 'Phone',
		type: 'text',
		class: TeammatePopup.Phone
	},
	{
		label: 'Job Title',
		type: 'text',
		class: TeammatePopup.Job
	}
]

export default TeammateFields