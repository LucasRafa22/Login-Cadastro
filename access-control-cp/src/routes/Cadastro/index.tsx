import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { TipoCadastro } from "../../types/tipoCadastro";

const URL_API_CADASTROS = import.meta.env.VITE_API_URL_BASE_CADASTROS;

export default function Cadastro() {

    useEffect(() => {
        document.title = "Cadastro";
    }, []);

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<TipoCadastro>({
        mode: "onBlur"
    })
    
   
    const validateUnique = async (fieldName: keyof TipoCadastro, value: string) => {
        if (!value) {
            return true;
        }
        
        try {
            const response = await fetch(`${URL_API_CADASTROS}?${fieldName}=${value}`);
            const data = await response.json();
            
            
            return data.length === 0 || `Este ${fieldName === 'nomeUsuario' ? 'nome de usuário' : 'email'} já está em uso.`;
        } catch (error) {
            console.error("Erro na validação de unicidade:", error);
            return `Erro ao verificar ${fieldName === 'nomeUsuario' ? 'o nome de usuário' : 'o email'}. Tente novamente.`;
        }
    };


    const onSubmit = async (data: TipoCadastro) => {
        try {
            const response = await fetch(URL_API_CADASTROS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("Cadastro realizado com sucesso!");
                navigate("/"); 
            } else {
                alert("Erro ao cadastrar. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro na comunicação com o servidor.");
        }
    };

    return (
        <main>
            <h1>Cadastro</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Formulário de Cadastro</h2>

                    <div>
                        <label htmlFor="nome">Nome</label>
                        <input
                            id="nome"
                            type="text"
                            {...register("nome", {required:'O nome é obrigatorio', 
                                minLength: { value: 3, message: "O nome deve ter no mínimo 3 caracteres" },
                                maxLength: { value: 50, message: "O nome deve ter no maximo 50 caracteres" }})}
                        />
                        {errors.nome && <span>{errors.nome.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="nomeUsuario">Nome de Usuário</label>
                        <input
                            id="nomeUsuario"
                            type="text"
                            
                            {...register("nomeUsuario", {required:'O nome de usuário é obrigatorio', 
                                minLength: { value: 3, message: "O nome de usuário deve ter no mínimo 3 caracteres" },
                                maxLength: { value: 200, message: "O nome de usuário deve ter no maximo 200 caracteres" },
                                validate: async (value) => await validateUnique('nomeUsuario', value)
                            })}
                        />
                        {errors.nomeUsuario && <span>{errors.nomeUsuario.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", { required: "O email é obrigatório", 
                                minLength: { value: 3, message: "O email deve ter no mínimo 3 caracteres" },
                                maxLength: { value: 200, message: "O email deve ter no maximo 200 caracteres" },
                                validate: async (value) => await validateUnique('email', value)
                            })}
                        />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>

                    <div>
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}