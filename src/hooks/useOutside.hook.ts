import { useEffect, useRef, useState } from 'react'

export const useOutside = (initialVisibility: boolean) => {
	const [isShow, setIsShow] = useState(initialVisibility)
	const ref = useRef<HTMLElement>(null)

	const handleClickOutside = (event: MouseEvent) => {
		//@ts-ignore
		if (ref.current && !ref.current.contains(event.target) && isShow) {
			setIsShow(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)

		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	})

	return { isShow, setIsShow, ref }
}