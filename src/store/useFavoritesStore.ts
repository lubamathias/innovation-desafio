"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoriteStore = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

export const useFavoritesStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id) => {
        const { favorites } = get();
        set({
          favorites: favorites.includes(id)
            ? favorites.filter((f) => f !== id)
            : [...favorites, id],
        });
      },
      isFavorite: (id) => get().favorites.includes(id),
    }),
    { name: "favorites-storage" }
  )
);
