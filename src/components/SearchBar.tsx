"use client";
import { useState } from "react";
import debounce from "debounce";

type SearchBarProps = {
  onSearch: (term: string) => void;
};

export function SearchBar({ onSearch }: SearchBarProps) {
  const [term, setTerm] = useState("");

  const handleChange = debounce((value: string) => {
    onSearch(value);
  }, 500);

  return (
    <input
      type="text"
      placeholder="Buscar produto..."
      value={term}
      onChange={(e) => {
        setTerm(e.target.value);
        handleChange(e.target.value);
      }}
      className="border border-gray-300 rounded-md p-2 w-full sm:w-80 focus:outline-[#8cc63f] text-black"
    />
  );
}
