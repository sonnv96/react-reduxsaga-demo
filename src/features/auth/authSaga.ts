import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { call, delay, fork, put, take } from "redux-saga/effects";
import { authActions, LoginPayload } from "./authSlice";

function* handleLogin(payload: LoginPayload) {
    try {
        console.log("Login", payload)
        yield delay(1000) // call api
        localStorage.setItem('access_token', 'son')
        yield put(authActions.loginSuccess({ id: 1, name: "son" }))
        // redirect to admin dashboard
        yield put(push('./admin/dashboard'))
    }
    catch (err) {
        //yield put failed
    }
}
function* handleLogout() {
    console.log("Logout")
    localStorage.removeItem('access_token')
    yield put(push('./login'))

}
function* watchLoginFlow() {
    while (true) {
        const isLoggedIn = Boolean(localStorage.getItem('access_token'))
        if (!isLoggedIn) {
            const action: PayloadAction<LoginPayload> = yield take(authActions.login.type)
            yield fork(handleLogin, action.payload)
        }

        yield take(authActions.logout.type)
        // not use for this here because need waiting logout end, 
        // if not, will run new while and check still have access token
        yield call(handleLogout)
    }
}


export default function* authSaga() {
    yield fork(watchLoginFlow)

}


// fork: none-blocking
// call: blocking