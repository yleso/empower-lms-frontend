import { useTypedSelector } from '@/hooks/useTypedSelector.hook'

export const useTheme = () => useTypedSelector(state => state.theme)