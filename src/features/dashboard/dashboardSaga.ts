import cityApi from "api/citiApi";
import studentApi from "api/studentApi";
import authSaga from "features/auth/authSaga";
import { City, ListResponse } from "models";
import { Student } from "models/student";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { dashboardAction, RankingByCity } from "./dashboardSlice";

function* fetchStatistics() {
    // use all is all action run together in this moment,
    //  if any action non-blocking => all function is non-blocking
    // if any action blocking => all function is blocking
    // blocking: run by  sequentially
    // and opposite with non-blocking
    const responseList: Array<ListResponse<Student>> = yield all([
        call(studentApi.getAll, {
            _limit: 1,
            _page: 1,
            gender: 'male'
        }),
        call(studentApi.getAll, {
            _limit: 1,
            _page: 1,
            gender: 'female'
        }),
        call(studentApi.getAll, {
            _limit: 1,
            _page: 1,
            mark_gte: 8
        }),
        call(studentApi.getAll, {
            _limit: 1,
            _page: 1,
            mark_gte: 5
        }),
    ])

    const staticsticsLst = responseList.map((x) => x.pagination._totalRows)
    const [maleCount, femaleCount, highMarkCount, lowMarkCount] = staticsticsLst
    yield put(dashboardAction.setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount }))
}
function* fetchHighestStudentList() {
    const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
        _limit: 1,
        _page: 5,
        _sort: 'mark',
        _order: 'desc',
    })

    yield put(dashboardAction.setHigestStudentList(data))
}
function* fetchLowestStudentList() {
    const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
        _limit: 1,
        _page: 5,
        _sort: 'mark',
        _order: 'asc',
    })

    yield put(dashboardAction.setLowestStudentList(data))
}
function* fetchRankingBycity() {

    //Fetch city list
    const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll)

    // fetch ranking per city
    const callList = cityList.map(x => call(studentApi.getAll, {
        _limit: 1,
        _page: 5,
        _sort: 'mark',
        _order: 'desc',
        city: x.code
    }))

    const responseList: Array<ListResponse<Student>> = yield all(callList)
    const rankingByCityList: Array<RankingByCity> = responseList.map((x, idx) => ({
        cityId: cityList[idx].code,
        rankingList: x.data
    }))

    // update RootState
    yield put(dashboardAction.setRankingByCityList(rankingByCityList))
}

function* fetchDashboardData() {
    try {
        // call is blocking
        yield all([
            call(fetchStatistics),
            call(fetchHighestStudentList),
            call(fetchLowestStudentList),
            call(fetchRankingBycity),
        ])

        yield put(dashboardAction.fetchDataSuccess())

    } catch (error) {
        console.log('Failded to fecth dashboard data', error)
    }

}

export default function* dashboardSaga() {
    yield takeLatest(dashboardAction.fetchData.type, fetchDashboardData)
}