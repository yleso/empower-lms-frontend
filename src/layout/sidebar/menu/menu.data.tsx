import { Book2, Database, Settings, Subtask } from 'tabler-icons-react'
import { MenuItemInterface } from './menu-item.interface'

export const MenuData: MenuItemInterface[] = [
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

export const AdminMenuData: MenuItemInterface[] = [
	{
		name: 'Admin panel',
		path: '/admin-panel',
		icon: <Settings size={18} />
	}
]