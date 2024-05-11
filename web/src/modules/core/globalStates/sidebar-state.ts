import { create } from "zustand"

interface ISidebar{
    estado:boolean
    inc(param:boolean):void
}

export const SidebarState = create<ISidebar>(set => ({
    estado:false,
    inc:(param)=>set(()=>({estado:param}))
}))