import { NavLink } from "react-router"

export default function ListUserPage() {
    return (
        <div className="page">
            <header>
                <h3>Listagem de Usuários</h3>
            </header>
            
            <main>
                <NavLink to='/users/create'>Adicionar Usuário</NavLink>
            </main>

            <footer>
            </footer>
        </div>
    )
}