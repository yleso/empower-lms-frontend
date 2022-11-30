import axios from 'axios'
import { getContentType } from '@/utils/api.util'

export const API_URL = `${import.meta.env.VITE_API_URL}/api`
export const BASE_API_URL = `${import.meta.env.VITE_API_URL}`

export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: getContentType()
})