"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { SearchBar } from "@/components/SearchBar";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { SortSelect } from "@/components/SortSelect";



type Produto = {
  codigo: string;
  nome: string;
  preco: string;
  imagem: string;
  descricao: string;
};

export default function ProdutosPage() {
  const router = useRouter();
  const { token } = useAuthStore();
  const { favorites } = useFavoritesStore();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filtered, setFiltered] = useState<Produto[]>([]);
  const [selected, setSelected] = useState<Produto | null>(null);
  const [showFavs, setShowFavs] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!token) router.push("/login");
  }, [token, router]);

  useEffect(() => {
    let mounted = true;
    async function fetchProdutos() {
      setLoading(true);
      try {
        const res = await apiFetch(
          "https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/produtos/listar"
        );
        const data = await res.json();
        if (!mounted) return;
        setProdutos(data || []);
        setFiltered(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchProdutos();
    return () => {
      mounted = false;
    };
  }, [token]);


  async function handleSearch(term: string) {
    setSearchTerm(term);
    if (!term) {
      setFiltered(produtos);
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch(
        "https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/produtos/listar",
        {
          method: "POST",
          body: JSON.stringify({ nome_produto: term, codigo_produto: "" }),
        }
      );
      const data = await res.json();
      setFiltered(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }


  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === "preco-asc") return list.sort((a,b) => parseFloat(a.preco) - parseFloat(b.preco));
    if (sort === "preco-desc") return list.sort((a,b) => parseFloat(b.preco) - parseFloat(a.preco));
    if (sort === "nome-asc") return list.sort((a,b) => a.nome.localeCompare(b.nome));
    if (sort === "nome-desc") return list.sort((a,b) => b.nome.localeCompare(a.nome));
    return list;
  }, [filtered, sort]);


  const display = useMemo(() => {
    if (showFavs) return sorted.filter(p => favorites.includes(p.codigo));
    return sorted;
  }, [sorted, showFavs, favorites]);

  return (
    <main className="min-h-screen">
     
      <header className="bg-[#89c511]  text-white flex justify-around items-center px-6 py-3 mt-7">
        <div className="flex items-center ">
          <img src="/logo.jpeg" alt="Innovation Brindes" className="h-12" />
        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={() => setShowFavs(s => !s)}
            className="bg-white text-[#89c511] px-3 py-1 rounded font-semibold hover:bg-gray-100 transition"
          >
            {showFavs ? "Ver todos" : "Favoritos"}
          </button>
          <img src="https://i.pravatar.cc/40" alt="perfil" className=" border-4 border-white rounded-full w-12  h-12" />
          <div className="hidden sm:block">Ana Carol Machado</div>
        </div>
      </header>

    
      <div className="p-6 max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-center md:mx-40">
        <SearchBar onSearch={handleSearch} />
        <div className="flex gap-3 items-center">
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </div>


      <section className="max-w-7xl mx-auto p-4 md:mx-40">
        {loading ? (
          <p className="text-center text-gray-500  mt-12">Carregando...</p>
        ) : display.length === 0 ? (
          <p className="text-center text-gray-500 mt-12">Nenhum produto encontrado.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {display.map((p) => (
              <ProductCard
                key={p.codigo}
                codigo={p.codigo}
                nome={p.nome}
                preco={p.preco}
                imagem={p.imagem}
                descricao={p.descricao}
                onSelect={() => setSelected(p)}
              />
            ))}
          </div>
        )}
      </section>

      <ProductModal open={!!selected} onClose={() => setSelected(null)} produto={selected} />
    </main>
  );
}
