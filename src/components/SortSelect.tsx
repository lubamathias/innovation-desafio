"use client";

import React from "react";

type SortSelectProps = {
  value: string;
  onChange: (v: string) => void;
};

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300  rounded-md p-2 text-sm bg-transparent"
      aria-label="Ordenar produtos"
    >
      <option value="">Ordenar por...</option>
      <option value="preco-asc">Preço: menor → maior</option>
      <option value="preco-desc">Preço: maior → menor</option>
      <option value="nome-asc">Nome: A → Z</option>
      <option value="nome-desc">Nome: Z → A</option>
    </select>
  );
}
