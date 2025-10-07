"use client";
import Image from "next/image";
import { useEffect } from "react";
import { BiX } from "react-icons/bi";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  produto: {
    nome: string;
    descricao: string;
    preco: string;
    imagem: string;
  } | null;
};

export function ProductModal({ open, onClose, produto }: ModalProps) {
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open]);

  if (!open || !produto) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-5 max-w-md w-[90%] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <BiX size={20} />
        </button>

        <div className="text-center">
          <Image
            src={produto.imagem}
            alt={produto.nome}
            width={250}
            height={250}
            className="mx-auto"
          />
          <h2 className="text-xl font-semibold mt-3">{produto.nome}</h2>
          <p className="text-gray-600 mt-2 text-sm">{produto.descricao}</p>
          <p className="text-green-700 font-bold mt-3">
            R$ {parseFloat(produto.preco).toFixed(2).replace(".", ",")}
          </p>
        </div>
      </div>
    </div>
  );
}
