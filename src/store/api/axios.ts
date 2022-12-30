import axios from 'axios'
import { getContentType } from '@/utils/api.util'


export const BASE_API_URL = `${import.meta.env.VITE_API_URL}`
export const API_URL = `${BASE_API_URL}/api`
export const SEARCH_API_URL = import.meta.env.VITE_SEARCH_API_URL

export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: getContentType()
})