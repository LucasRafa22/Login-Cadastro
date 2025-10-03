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
        <main>
            <h1>Login</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Formulário de Login</h2>

                    <div>
                        <label htmlFor="nomeUsuario">Nome de Usuário</label>
                        <input
                            id="nomeUsuario"
                            type="text"
                            
                            {...register("nomeUsuario", { required: "O nome de usuário é obrigatório" }
                            )}
                        />
                        {errors.nomeUsuario && <span>{errors.nomeUsuario.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register ("email", { required: "O nome de usuário é obrigatório" }
                            )}
                        />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>

                    <div>
                        <button type="submit">
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}