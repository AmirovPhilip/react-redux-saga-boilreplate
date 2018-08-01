import { createAction, handleActions } from 'redux-actions'
import { put, takeLatest, call } from 'redux-saga/effects'

import * as api from '../../../api'

export const getUserRequested = createAction('USER/GET_USER_REQUESTED')
export const getUserSucceeeded = createAction('USER/GET_USER_SUCCEEDED')
export const getUserFailed = createAction('USER/GET_USER_FAILED')

export const initialState = {
  user: null,
}

export const userReducer = handleActions(
  {
    [getUserSucceeeded]: (state) => ({
      ...state,
    }),
    [getUserFailed]: (state) => ({
      ...state,
    }),
  },
  initialState,
)

export function* userRequest() {
  try {
    const { data } = yield call(api.getUser)
    yield put(getUserSucceeeded(data))
  } catch (error) {
    yield put(getUserFailed())
  }
}

export function* userSaga() {
  yield takeLatest(getUserRequested, userRequest)
}
