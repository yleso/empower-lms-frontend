import { MenuitemInterface } from './menuitem.interface'
import { Book2, Database, Subtask } from 'tabler-icons-react'

export const MenuData: MenuitemInterface[] = [
	{
		name: 'My learning',
		path: '/my-learning',
		icon: <Book2 size={18} />
	},
	{
		name: 'Knowledge base',
		path: '/knowledge-base',
		icon: <Database size={18} />
	}
]

export const AdminMenuData: MenuitemInterface[] = [
	{
		name: 'Admin panel',
		path: '/admin-panel',
		icon: <Subtask size={18} />
	}
]