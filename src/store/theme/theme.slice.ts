import { createSlice } from '@reduxjs/toolkit'
import { ThemeInterface } from '@/store/theme/theme.interface'

const initialState: ThemeInterface = {
	darkmode: false,
	isSidebarOpened: true
}

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleDarkmode(state) {
			state.darkmode = !state.darkmode
		},
		toggleSidebar(state) {
			state.isSidebarOpened = !state.isSidebarOpened
		}
	}
})