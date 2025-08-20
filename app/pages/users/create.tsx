import { useNavigate } from "react-router"
import type { User } from "~/models"

export default function UserCreatePage() {

    const navigate = useNavigate()

    let name = ''
    let username = ''
    let password = ''
    let confirmPass = ''

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

        const user: User = { name, username, password }
        console.log('User: ', user)
        
        // Implementar o Salvar
        
        goBack()
    }

    return (
        <div className="page">
            <header>
                <h3>Novo Usuário</h3>
            </header>
            
            <main>
                <div className="div-input">
                    <span>Nome:</span>
                    <input type="text" onChange={event => name = event.target.value} />
                </div>

                <div className="div-input">
                    <span>Login:</span>
                    <input type="text" onChange={event => username = event.target.value} />
                </div>

                <div className="div-input">
                    <span>Senha:</span>
                    <input type="password" onChange={event => password = event.target.value} />
                </div>

                <div className="div-input">
                    <span>Confirmar Senha:</span>
                    <input type="password" onChange={event => confirmPass = event.target.value} />
                </div>
            </main>

            <footer>
                <button className="gray" onClick={goBack}>Cancelar</button>
                <button className="green" onClick={save}>Salvar</button>
            </footer>
        </div>
    )
}