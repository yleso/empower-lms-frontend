import { themeSlice } from '@/store/theme/theme.slice'
import * as authActions from './auth/auth.actions'

export const rootAction = {
	...authActions,
	...themeSlice.actions
}