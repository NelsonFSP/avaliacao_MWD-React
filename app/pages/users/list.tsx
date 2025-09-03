import React from 'react'
import { NavLink, useNavigate } from "react-router"

import UserItem from '../../components/user.item'

import type { User } from '~/models'
import * as userService from "~/services/user.service"

export default function ListUserPage() {

    const navigate = useNavigate()

    const [users, setUsers] = React.useState<User[]>([])

    function fetchUsers() {
        userService.getList().then(list => {
            setUsers(list ? list : [])
        }).catch(error => {
            console.error(error)
            navigate('/')
        })
    }

    React.useEffect(() => {
        fetchUsers()
    }, [])

    function update(user: User) {
        navigate(`/users/${user.id}`)
    }

    function remove(user: User) {
        userService.remove(user.id!).then(result => {
            if (result === true) {
                fetchUsers()
            } else if (result === false) {
                alert('Usuário não encontrado!')
            } else {
                navigate('/')
            }
        })
    }

    return (
        <div className="page">
            <header>
                <h3>Listagem de Usuários</h3>
            </header>
            
            <main style={{ alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <NavLink to='/users/create'>Adicionar Usuário</NavLink>
                    <NavLink to='/roles'>Ver roles</NavLink>
                </div>
                
                <br />
                { users.map(user => (
                    <UserItem user={user} update={update} remove={remove} />
                ) )}
            </main>

            <footer>
                Temos {users.length} cadastrados
            </footer>
        </div>
    )
}