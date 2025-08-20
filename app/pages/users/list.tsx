import React from 'react'

import { NavLink } from "react-router"
import * as userService from "~/services/user.service"

export default function ListUserPage() {

    let users = []

    React.useEffect(() => {
        userService.getList().then(list => {
            users = list ? list : []
        })
    }, [])

    return (
        <div className="page">
            <header>
                <h3>Listagem de Usuários</h3>
            </header>
            
            <main>
                <NavLink to='/users/create'>Adicionar Usuário</NavLink>
            </main>

            <footer>
                Temos {users.length} cadastrados
            </footer>
        </div>
    )
}