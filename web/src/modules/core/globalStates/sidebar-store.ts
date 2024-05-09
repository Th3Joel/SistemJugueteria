import { create } from "zustand"

interface ISidebar{
    estado:boolean
    inc(param:boolean):void
}

export const SidebarStore = create<ISidebar>(set => ({
    estado:false,
    inc:(param)=>set(()=>({estado:param}))
}))