import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit'

export const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => next => action => {
		return next(action)
	}