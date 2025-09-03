import React from 'react'
import { useNavigate, useParams } from "react-router"

import * as userService from '../../services/user.service'
import * as roleService from '../../services/role.service'
import MyInput from '../../components/my.input'
import MySelect from '../../components/my.select'
import type { User } from "~/models"
import type { Role } from "~/models"
import { useState } from "react"

export default function UserUpdatePage() {

    const navigate = useNavigate()
    const params = useParams()
    const userId = Number(params.id)
    

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [listRoles, setListRoles] = React.useState<Role[]>([])
    const [roles, setRoles] = useState<string[]>([])

    function fetchUser() {
        userService.get(userId).then(data => {
            setName(data.name)
            setUsername(data.username)
            setRoles(data.roles)
        }).catch(error => {
            navigate('/')
        })
    }

    React.useEffect(() => {
        fetchUser()
    }, [])

    function fetchRoles() {
        roleService.getList().then(list => {
            setListRoles(list ? list : [])
        }).catch(error => {
            console.error(error)
            navigate('/')
        })
    }

    React.useEffect(() => {
        fetchRoles()
    }, [])


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selecionadas = Array.from(event.target.selectedOptions).map(
          (opt) => opt.value
        )
        setRoles(selecionadas)
  }


    function goBack() {
        navigate(-1)
    }

    function save() {
        if (name === '') {
            alert('Nome é obrigatório')
            return
        }

        const user: User = { id: userId, name, username , roles}

        userService.update(user).then(result => {
            goBack()
        }).catch(error => {
            alert('Login já existe!')
            navigate('/')
        })
    }

    return (
        <div className="page">
            <header>
                <h3>Alterar Usuário</h3>
            </header>

            <main>
                <MyInput title="Login" value={username} change={setUsername} readOnly />
                <MyInput title="Nome" value={name} change={setName} />

                <select
                    name="Roles"
                    id="roles"
                    onChange={handleChange
                    }
                    multiple
                    value={roles}
                    >
                    {listRoles.map(role => (
                        <option value={role.name} >{role.name}</option>
                    ))}
                    
                </select>
            </main>

            <footer>
                <button className="gray" onClick={goBack}>Cancelar</button>
                <button className="green" onClick={save}>Salvar</button>
            </footer>
        </div>
    )
}