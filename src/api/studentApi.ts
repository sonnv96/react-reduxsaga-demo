import { ListParams, ListResponse } from "models"
import { Student } from "models/student"
import axiosClient from "./axiosClient"

const studentApi = {
    getAll(params: ListParams): Promise<ListResponse<Student>> {
        const url = '/students'
        return axiosClient.get(url, { params })
    },
    add(data: Student): Promise<Student> {
        const url = '/students'
        return axiosClient.post(url, data)
    },
    update(id: string, data: Student): Promise<Student> {
        const url = `/students/${id}`
        return axiosClient.patch(url, data)
    },
    remove(id: string): Promise<any> {
        const url = `/students/${id}`
        return axiosClient.get(url)
    },
    getById(id: string): Promise<Student> {
        const url = `/students/${id}`
        return axiosClient.get(url)
    }
}

export default studentApi