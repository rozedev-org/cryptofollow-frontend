"use client";
import { useState, useEffect } from "react";

const useCustomMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    // Función para actualizar el estado
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Establecer el estado inicial
    setMatches(mediaQueryList.matches);

    // Agregar el listener
    mediaQueryList.addEventListener("change", handleChange);

    // Limpiar el listener al desmontar
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

export const useResponsiveInfo = () => {
  const isMobile = useCustomMediaQuery("(max-width: 767px)");
  const isTablet = useCustomMediaQuery(
    "(min-width: 768px) and (max-width: 991px)"
  );

  return { isMobile, isTablet };
};
