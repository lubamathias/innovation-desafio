"use client";
import Image from "next/image";

import { useFavoritesStore } from "@/store/useFavoritesStore";
import { FaHeart } from "react-icons/fa";

type Props = {
  codigo: string;
  nome: string;
  preco: string;
  imagem: string;
  onSelect: () => void;
  descricao: string,
};

export function ProductCard({ codigo, nome, preco, imagem, onSelect, descricao }: Props) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const favorito = isFavorite(codigo);

  const formatarNome = (texto: string) => {
    if (!texto) return "";
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  };

  const cores = [
    "#ff6b6b", "#ff9f43", "#feca57", "#1dd1a1", "#54a0ff", "#5f27cd",
    "#341f97", "#10ac84", "#222f3e", "#ff8c94", "#2e86de", "#9b59b6",
    "#00b894", "#636e72"
  ];
  return (
    <div className=" bg-white overflow-hidden relative flex flex-col mb-5">
      <div className="flex flex-col items-center justify-center">
          <p
            className="text-black font-extrabold leading-tight text-xs whitespace-nowrap overflow-hidden text-ellipsis w-full max-w-[180px] text-center"
          >
            {formatarNome(nome)}
          </p>

          <p className="text-xs text-black mb-1">{codigo}</p>
      </div>
      <div className="border border-gray-300 rounded-sm">
        <div className="relative">
          <Image
            src={imagem}
            alt={nome}
            width={250}
            height={250}
            className="object-contain w-full h-[180px]"
          />
          <span className="absolute top-0 right-0 text-blue-400 text-xs font-extrabold  rounded">
            EXCLUSIVO!
          </span>
          <button
            onClick={() => toggleFavorite(codigo)}
            className="absolute top-1 left-1 text-red-500 hover:scale-110 transition"
            aria-label="Favoritar"
          >
            <FaHeart
              size={18}
              fill={favorito ? "red" : "gray"}
              strokeWidth={1.5}
            />
          </button>
        </div>
        <div className="p-2 text-center text-sm flex flex-col flex-grow justify-between">
          <div>
            <div className="min-h-[32px] flex items-center justify-center">
              <p
                className="text-gray-600 text-xs line-clamp-2 leading-snug"
                title={descricao}
              >
                {descricao}
              </p>
            </div>
        <div className="mt-2">
          <p className="text-xs font-semibold text-gray-700 text-left">Cores:</p>

          <div className="flex flex-col items-start mt-1 gap-[2px]">
            <div className="flex justify-start gap-1 flex-wrap">
              {cores.slice(0, 6).map((cor, idx) => (
                <span
                  key={idx}
                  className="w-3.5 h-3.5 rounded-full border border-gray-300"
                  style={{ backgroundColor: cor }}
                />
              ))}
            </div>
            <div className="flex justify-start gap-1 flex-wrap">
              {cores.slice(6, 10).map((cor, idx) => (
                <span
                  key={idx + 6}
                  className="w-3.5 h-3.5 rounded-full border border-gray-300"
                  style={{ backgroundColor: cor }}
                />
              ))}
            </div>
            <div className="flex justify-start gap-1 flex-wrap">
              {cores.slice(10, 14).map((cor, idx) => (
                <span
                  key={idx + 10}
                  className="w-3.5 h-3.5 rounded-full border border-gray-300"
                  style={{ backgroundColor: cor }}
                />
              ))}
            </div>
          </div>
        </div>
          </div>
          <div className="flex flex-col items-end w-full px-2 -mt-2 mb-1">
            <p className="text-[11px] text-gray-600">
              a partir de 
            </p>
            <span className="font-semibold text-gray-800">
                R$ {parseFloat(preco).toFixed(2).replace(".", ",")}
              </span>
            <p className="text-[10px] text-gray-400 -mt-1">
              gerado pela melhor oferta
            </p>
          </div>

        </div>
      </div>
        <button
          onClick={onSelect}
          className="mt-2 bg-[#89c511] text-white font-semibold py-1 rounded hover:bg-green-700"
        >
          CONFIRA
        </button>
    </div>
  );
}
