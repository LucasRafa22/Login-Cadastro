import { useLocation } from "react-router-dom"
import type { TipoCadastro } from "../../types/tipoCadastro"

export default function Site(){
    const location = useLocation()
    const usuario = location.state as TipoCadastro

    return(
        <main>
            <h1>Bem vindo ao nosso site!</h1>
            <div>
                <h2>Nome: {usuario?.nome}</h2>
                <h2>Nome de usuário: {usuario?.nomeUsuario}</h2>
                <h2>Email: {usuario?.email}</h2>
            </div>
        </main>
    )
}