import React from 'react'
import { useNavigate, useParams } from "react-router"

import * as userService from '../../services/user.service'
import MyInput from '../../components/my.input'
import type { User } from "~/models"
import { useState } from "react"

export default function UserUpdatePage() {

    const navigate = useNavigate()
    const params = useParams()
    const userId = Number(params.id)

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')

    function fetchUser() {
        userService.get(userId).then(data => {
            setName(data.name)
            setUsername(data.username)
        }).catch(error => {
            navigate('/')
        })
    }

    React.useEffect(() => {
        fetchUser()
    }, [])

    function goBack() {
        navigate(-1)
    }

    function save() {
        if (name === '') {
            alert('Nome é obrigatório')
            return
        }

        const user: User = { id: userId, name, username }
        
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
            </main>

            <footer>
                <button className="gray" onClick={goBack}>Cancelar</button>
                <button className="green" onClick={save}>Salvar</button>
            </footer>
        </div>
    )
}