import React from 'react'
import { NavLink } from "react-router"

import type { User } from '~/models'
import * as userService from "~/services/user.service"

export default function ListUserPage() {

    const [users, setUsers] = React.useState<User[]>([])

    React.useEffect(() => {
        userService.getList().then(list => {
            setUsers(list ? list : [])
        })
    }, [])

    return (
        <div className="page">
            <header>
                <h3>Listagem de Usuários</h3>
            </header>
            
            <main>
                <NavLink to='/users/create'>Adicionar Usuário</NavLink>
                <br />
                { users.map(user => (
                    <div>{user.id} - {user.name} - {user.username}</div>
                ) )}
            </main>

            <footer>
                Temos {users.length} cadastrados
            </footer>
        </div>
    )
}