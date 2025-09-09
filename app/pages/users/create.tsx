import { useNavigate } from "react-router"

import * as userService from '../../services/user.service'
import * as roleService from '../../services/role.service'
import MyInput from '../../components/my.input'
import type { User } from "~/models"
import type { Role } from "~/models"
import React from 'react'
import { useState } from "react"

export default function UserCreatePage() {

    const navigate = useNavigate()

    let name = ''
    let username = ''
    let password = ''
    let confirmPass = ''

    const [listRoles, setListRoles] = React.useState<Role[]>([])
    const [roles, setRoles] = useState<string[]>([])

    function goBack() {
        navigate(-1)
    }

    function save() {
        if (name === '') {
            alert('Nome é obrigatório')
            return
        }
        if (username === '') {
            alert('Login é obrigatório')
            return
        }
        if (password === '') {
            alert('Senha é obrigatória')
            return
        }
        if (password !== confirmPass) {
            alert('Senha não confere')
            return
        }

        const user: User = { name, username, password, roles }

        userService.create(user).then(result => {
            if (result === true) goBack()
            else if (result === false) alert('Login já existe!')
            else navigate('/')
        })
    }

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

    return (
        <div className="page">
            <header>
                <h3>Novo Usuário</h3>
            </header>

            <main>
                <MyInput title="Nome" change={value => name = value} />
                <MyInput title="Login" change={value => username = value} />
                <MyInput type="password" title="Senha" change={value => password = value} />
                <MyInput type="password" title="Confirmar Senha" change={value => confirmPass = value} />
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