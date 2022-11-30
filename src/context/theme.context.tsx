import { getCookie, hasCookie, setCookie } from 'cookies-next'
import React, { FC, PropsWithChildren, createContext, useState } from 'react'

interface ContextInterface {
	sidebarIsOpen: boolean
	toggleSidebar: () => void
	darkmode: boolean
	toggleDarkmode: () => void
}

const defaultValues = {
	sidebarIsOpen: true,
	toggleSidebar: () => {},
	darkmode: false,
	toggleDarkmode: () => {}
}

export const ThemeContext = createContext<ContextInterface>(defaultValues)

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const getDarkmodeState = (): boolean => {
		if (hasCookie('darkmode')) {
			return Boolean(getCookie('darkmode'))
		}

		return false
	}

	const [sidebarIsOpen, setSidebarIsOpen] = useState(true)
	const [darkmode, setDarkmode] = useState<boolean>(getDarkmodeState())

	const toggleSidebar = () => {
		setSidebarIsOpen(sidebarIsOpen => !sidebarIsOpen)
	}

	const toggleDarkmode = () => {
		setCookie('darkmode', !darkmode)
		setDarkmode(darkmode => !darkmode)
	}

	return (
		<ThemeContext.Provider
			value={{ sidebarIsOpen, toggleSidebar, darkmode, toggleDarkmode }}
		>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeContextProvider