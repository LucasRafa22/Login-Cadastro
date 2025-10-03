export default function Login(){
    return(
        <main>
            <h1>Login</h1>
            <div>
                <form>
                    <div>
                        <label>Nome de Usuário</label>
                        <input type="text" placeholder="Digite nome de usuráio" />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" placeholder="Digite o email" />
                    </div>
                    <button>Entrar</button>
                </form>
            </div>
        </main>
    )
}