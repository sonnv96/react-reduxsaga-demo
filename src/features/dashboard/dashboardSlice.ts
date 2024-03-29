import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Student } from "models/student";


export interface DashboardStatistics {
    maleCount: number
    femaleCount: number
    highMarkCount: number
    lowMarkCount: number
}

export interface RankingByCity {
    cityId: string
    rankingList: Student[]
}

export interface DashboardState {
    loading: boolean
    statistics: DashboardStatistics
    highestStudentList: Student[]
    lowestStudentList: Student[]
    rankingByCity: RankingByCity[]
}

const initialState: DashboardState = {
    loading: false,
    statistics: {
        maleCount: 0,
        femaleCount: 0,
        highMarkCount: 0,
        lowMarkCount: 0

    },
    highestStudentList: [],
    lowestStudentList: [],
    rankingByCity: []
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        fetchData(state) { state.loading = true },
        fetchDataSuccess(state) { state.loading = false },
        fetchDataFailed(state) { state.loading = false },


        setStatistics(state, action: PayloadAction<DashboardStatistics>) {
            state.statistics = action.payload
        },
        setHigestStudentList(state, action: PayloadAction<Student[]>) {
            state.highestStudentList = action.payload
        },
        setLowestStudentList(state, action: PayloadAction<Student[]>) {
            state.lowestStudentList = action.payload
        },
        setRankingByCityList(state, action: PayloadAction<RankingByCity[]>) {
            state.rankingByCity = action.payload
        }
    }
})



// Action buttons
export const dashboardAction = dashboardSlice.actions


// Selectors

export const selectDashboardLoading = (state: RootState) => state.dashboard.loading
export const selectDashboardStatistics = (state: RootState) => state.dashboard.statistics
export const selectHigestStudentList = (state: RootState) => state.dashboard.highestStudentList
export const selectLowestStudentList = (state: RootState) => state.dashboard.lowestStudentList
export const selectRankingByCityList = (state: RootState) => state.dashboard.rankingByCity

//Reducers
const dashboardReducer = dashboardSlice.reducer

export default dashboardReducer