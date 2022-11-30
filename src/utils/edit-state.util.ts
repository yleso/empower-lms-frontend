export const SetEditState = (state: boolean) => {
	history.pushState({ editMode: state }, '')
}

export const GetEdit = (setUnEdit: boolean): boolean => {
	const isEditDefault: boolean =
		history.state !== null && history.state.editMode

	SetEditState(setUnEdit)

	return isEditDefault
}
