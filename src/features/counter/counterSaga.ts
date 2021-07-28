import { PayloadAction } from "@reduxjs/toolkit"
import { delay, put, takeEvery, takeLatest } from "redux-saga/effects"
import { incrementSaga, incrementSagaSuccess } from "./counterSlice"


export function* log(action: PayloadAction) {
    console.log("log: ", action)
}
export function* handleIncrementSaga(action: PayloadAction<number>) {
    console.log("waiting 2s");
    // wait 2s then dispatch action
    yield delay(2000);

    console.log("waiting done. dispatch action");

    yield put(incrementSagaSuccess(action.payload))
}

export default function* counterSaga() {
    console.log('counter saga')
    yield  takeEvery(incrementSaga.toString(), handleIncrementSaga)
}