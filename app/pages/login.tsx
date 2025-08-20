import { useNavigate } from "react-router"

import { login } from '../services/auth.service'

export default function LoginPage() {

    const navigate = useNavigate()

    let username = ''
    let password = ''

    function signIn() {
        login(username, password).then(logged => {
            if (logged === true) {
                navigate('users')
            } else {
                alert('Login/senha inválido(a)!')
            }
        })
    }

    return (
        <div className="page">
            <header>
                <h3>Página de Acesso</h3>
            </header>
            
            <main>
                <div className="div-input">
                    <span>Login:</span>
                    <input type="text" onChange={event => username = event.target.value} />
                </div>

                <div className="div-input">
                    <span>Senha:</span>
                    <input type="password" onChange={event => password = event.target.value} />
                </div>
            </main>

            <footer>
                <button className="green" onClick={signIn}>Entrar</button>
            </footer>
        </div>
    )
}