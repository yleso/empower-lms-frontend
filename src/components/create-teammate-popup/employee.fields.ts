interface TeammateFieldsInterface {
	name:
		| 'name'
		| 'surname'
		| 'starting_date'
		| 'email'
		| 'line_manager'
		| 'job_title'
		| 'phone'
	label: string
	type: string
}

const TeammateFields: TeammateFieldsInterface[] = [
	{
		name: 'name',
		label: 'Name',
		type: 'text'
	},
	{
		name: 'surname',
		label: 'Surname',
		type: 'text'
	},
	{
		name: 'starting_date',
		label: 'Starting Date',
		type: 'date'
	},
	{
		name: 'email',
		label: 'Email',
		type: 'email'
	},
	{
		name: 'line_manager',
		label: 'Line Manager',
		type: 'text'
	},
	{
		name: 'job_title',
		label: 'Job Title',
		type: 'text'
	},
	{
		name: 'phone',
		label: 'Phone',
		type: 'text'
	}
]

export default TeammateFields
