import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { TipoCadastro } from "../../types/tipoCadastro";

const URL_API_CADASTROS = import.meta.env.VITE_API_URL_BASE_CADASTROS;

export default function Login() {
    useEffect(() => {
        document.title = "Login";
    }, []);

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<TipoCadastro>({
        mode: "onBlur"
    });

    const onSubmit = async (data: TipoCadastro) => {
        try {
            const response = await fetch(`${URL_API_CADASTROS}?nomeUsuario=${data.nomeUsuario}&email=${data.email}`);
            const usuariosEncontrados = await response.json();
            
            if (usuariosEncontrados.length > 0) {
                alert("Login realizado com sucesso!");
                navigate("/site", { state: usuariosEncontrados[0] });
            } else {
                alert("Credenciais inválidas. Verifique seu nome de usuário e email.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro na comunicação com o servidor.");
        }
    };

    return (
        <main className="pagina_conteudo">
            <div className="form_card">
                <h1 className="titulo_principal">Login</h1>
                <h2 className="subtitulo">Formulário de Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="login_requisitos">
                        <label htmlFor="nomeUsuario">Nome de Usuário</label>
                        <input
                            id="nomeUsuario"
                            type="text"
                            className="texto_botao"
                            {...register("nomeUsuario", { required: "O nome de usuário é obrigatório" })}
                        />
                        {errors.nomeUsuario && <span className="errorMsg">{errors.nomeUsuario.message}</span>}
                    </div>

                    <div className="login_requisitos">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="texto_botao"
                            {...register ("email", { required: "O email é obrigatório" })}
                        />
                        {errors.email && <span className="errorMsg">{errors.email.message}</span>}
                    </div>

                    <div>
                        <button type="submit" className="botao_confirmar">
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}