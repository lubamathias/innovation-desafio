"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { FaUserAlt } from "react-icons/fa";



export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setToken } = useAuthStore();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      const res = await fetch(
        "https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/login/acessar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha }),
        }
      );

      const data = await res.json();

      if (data.status !== 1) throw new Error("Usuário ou senha inválidos");

      setToken(data.token_de_acesso);
      router.push("/produtos");
    } catch (err) {
      setErro("Usuário ou senha incorretos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[url('/fundo2.jpg')] bg-cover bg-center">
        <h1 className="text-[#89c511] text-2xl font-bold mb-8">
          Bem-vindo à Innovation Brindes
        </h1>
      <form
        onSubmit={handleLogin}
        className="w-full flex flex-col gap-5 pt-18 pb-8 items-center justify-center bg-[#89c511] px-10 rounded-lg shadow-lg max-w-sm md:max-w-lg text-center"
      >

        <div  className="flex flex-col w-4/6 items-center justify-center">
            <input
              type="text"
              placeholder="👤  Usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 rounded-full outline-none bg-white text-black px-8 py-3 text-xs font-bold"
            />
            <input
              type="password"
              placeholder="🔓  Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full mb-3 rounded-full outline-none bg-white text-black px-8 py-3 text-xs font-bold"
            />
            <div className="w-full flex justify-between px-2 mt-1 items-center  text-white mb-3 text-[9px]">
              <label className="flex items-center gap-1">
                <input type="checkbox" /> Manter logado
              </label>
              <a href="#" >
                Esqueceu a senha?
              </a>
            </div>
            {erro && <p className="text-red-600 text-sm mt-2">{erro}</p>}
        </div>
            <button
              disabled={loading}
              type="submit"
              className="bg-white text-gray-500 text-sm font-semibold py-3 rounded-full hover:bg-gray-200 w-35 text-center"
            >
              {loading ? "Entrando..." : "Login"}
            </button>
      </form>
    </main>
  );
}
