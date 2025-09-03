import { useNavigate } from "react-router"

import * as roleService from '../../services/role.service'
import MyInput from '../../components/my.input'
import type { Role } from "~/models"

export default function RoleCreatePage() {

    const navigate = useNavigate()

    let name = ''
    let description = ''

    function goBack() {
        navigate(-1)
    }

    function save() {
        if (name === '') {
            alert('Nome é obrigatório')
            return
        }
        if (description === '') {
            alert('Descrição é obrigatória')
            return
        }

        const role: Role = { name, description }
        
        roleService.create(role).then(result => {
            if (result === true) goBack()
            else if (result === false) alert('Role já existe!')
            else navigate('/roles')
        })
    }

    return (
        <div className="page">
            <header>
                <h3>Nova Role</h3>
            </header>
            
            <main>
                <MyInput title="Nome" change={value => name = value} />
                <MyInput title="Description" change={value => description = value} />
            </main>

            <footer>
                <button className="gray" onClick={goBack}>Cancelar</button>
                <button className="green" onClick={save}>Salvar</button>
            </footer>
        </div>
    )
}