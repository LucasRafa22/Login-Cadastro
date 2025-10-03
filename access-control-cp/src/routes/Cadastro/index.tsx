export default function Cadastro(){
    return(
        <main>
            <h1>Cadastro</h1>
            <h1>Login</h1>
            <form>
                <div>
                    <label>Nome completo</label>
                    <input type="text" placeholder="Digite nome seu nome" />
                </div>
                <div>
                    <label>Nome de Usuário</label>
                    <input type="text" placeholder="Digite nome de usuráio" />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" placeholder="Digite o email" />
                </div>
                <button>Cadastrar</button>
            </form>
        </main>
    )
}