import React from 'react'
import { NavLink, useNavigate } from "react-router"
import RoleItem from '../../components/role.item'
import type { Role } from '~/models'
import * as roleService from "~/services/role.service"

export default function ListRolePage() {

    const navigate = useNavigate()

    const [roles, setRoles] = React.useState<Role[]>([])

    function fetchRoles() {
        roleService.getList().then(list => {
            setRoles(list ? list : [])
        }).catch(error => {
            console.error(error)
            navigate('/')
        })
    }

    React.useEffect(() => {
        fetchRoles()
    }, [])

    function update(role: Role) {
        navigate(`/roles/${role.id}`)
    }

    function remove(role: Role) {
        roleService.remove(role.id!).then(result => {
            if (result === true) {
                fetchRoles()
            } else if (result === false) {
                alert('Role não encontrada!')
            } else {
                navigate('/roles')
            }
        })
    }

    return (
        <div className="page">
            <header>
                <h3>Listagem de Roles</h3>
            </header>
            
            <main style={{ alignItems: 'flex-start' }}>
                <NavLink to='/roles/create'>Adicionar Role</NavLink>
                <br />
                { roles.map(role => (
                    <RoleItem role={role} update={update} remove={remove} />
                ) )}
            </main>

            <footer>
                Temos {roles.length} cadastrados
            </footer>
        </div>
    )
}