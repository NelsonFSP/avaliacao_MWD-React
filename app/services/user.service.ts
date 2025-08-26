import type { User } from "~/models"
import { getLoggedUser } from "./auth.service"

const URL_BASE = 'http://localhost:3030/users'

export async function getList() {
    const user = getLoggedUser()

    const response = await fetch(URL_BASE, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${user?.token}`
        }
    })

    if (response.status === 200) {
        const data: User[] = await response.json()
        return data
    }

    return null
}

export async function create(user: User) {
    const logged = getLoggedUser()

    const response = await fetch(URL_BASE, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${logged?.token}`
        },
        body: JSON.stringify(user)
    })

    if (response.status === 201) {
        return true
    } else if (response.status === 400) {
        return false
    } else {
        return null
    }
}
