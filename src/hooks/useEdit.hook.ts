import { useState } from 'react'

const useEdit = (initialValue: boolean): [boolean, () => void] => {
	const [isEdit, setIsEdit] = useState<boolean>(initialValue)

	const toggleEdit = () => setIsEdit(currentEditMode => !currentEditMode)

	return [isEdit, toggleEdit]
}

export default useEdit