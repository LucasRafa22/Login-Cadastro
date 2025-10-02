import { Link } from "react-router-dom"

export default function Menu(){
    return(
        <nav>
            <Link to="./">Login |</Link>
            <Link to="./cadastro"> Cadastro</Link>
        </nav>
    )
}