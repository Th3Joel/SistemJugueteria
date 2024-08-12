import { create } from "zustand";

interface TitleState {
  title: string;
  path: string;
  setTitle: (titulo: string) => void;
  setPath: (path: string) => void;
}

export const routesTitles: Record<string, string> = {
  "/": "Dashboard",
  "/clientes": "Clientes",
  "/clientes/add": "Agregar cliente",
  "/clientes/edit": "Editar cliente",
  "/articles-box": "Cajas de artículos",
  "/articles-box/add": "Agregar caja de artículos",
  "/articles-box/edit": "Editar caja de artículos",
  "/categories": "Categorías",
  "/categories/add": "Agregar categoría",
  "/categories/edit": "Editar categoría",
  "/price-categories": "Categorías de precios",
  "/price-categories/add": "Agregar categoría de precios",
  "/price-categories/edit": "Editar categoría de precios",
  "/suppliers": "Proveedores",
  "/suppliers/add": "Agregar proveedor",
  "/suppliers/edit": "Editar proveedor",
  "/articles": "Artículos",
  "/articles/add": "Agregar artículo",
  "/articles/edit": "Editar artículo",
  "/cash-register": "Arqueo de caja",
  "/settings": "Configuración | Usuarios",
  "/settings/users": "Configuración | Usuarios",
  "/settings/users/add": "Configuración | Agregar usuario",
  "/settings/users/edit": "Configuración | Editar usuario",
  "/settings/profile": "Configuración | Perfil",
  "/settings/company": "Configuración | Empresa",
  "/settings/maintenance": "Configuración | Mantenimiento",
  "/auth/": "Inicio de sesión",
  "/auth/login": "Inicio de sesión",
  "/auth/forgot-password": "Recuperación de contraseña",
  "/auth/reset-password": "Restablecimiento de contraseña",
};

export const TitleState = create<TitleState>((set) => ({
  title: "Inicio",
  path: "/",
  setTitle: (titulo) => {
    window.document.title = titulo;
    return set({ title: titulo })
  },
  setPath: (path) => set({ path: path })
}));    