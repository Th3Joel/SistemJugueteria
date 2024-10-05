import { driver, DriveStep } from "driver.js"
import { toast } from "sonner";
import { create } from "zustand";

export const stepsDashboard: DriveStep[] = [
    {
        element:".counters",
        popover: {
            description: "Muestra información general del sistema"
        }
    },{
        element:".graphSales",
        popover: {
            description: "Muestra información de ventas en un gráfico"
        }
    }
]

export const stepsTable: DriveStep[] = [
    {
        element: ".btnAdd",
        popover: {
            description: "Al hacer click lo redireccionará a la página de creación de un nuevo elemento"
        }
    },
    {
        element: ".perPage",
        popover: {
            description: "Selecciona el número de elementos que se mostraran en la tabla"
        }
    },
    {
        element: ".txtSearch",
        popover: {
            description: "Busca elementos en la tabla"
        }
    },
    //Información de compras
    {
        element: ".txtIncompletePurchase",
        popover: {
            description: `Si la compra está incompleta quiere decir que
            la cantidad de artículos que ingresaste en el detalle no fué igual a 
            la cantidad de articulos de la caja, por ende la podrás editar y comprar mas artículos, 
             se mostrara el botón para editarla`
        }
    },
    {
        element: ".txtCompletedPurchase",
        popover: {
            description: "Si está completa quiere decir que la cantidad de artículos en el detalle es igual a la cantidad de articulos de la caja que indicaste en la compra"
        }
    },
    //--------------------------------------------------------------------------------------
    
    {
        element: ".btnView",
        popover: {
            description: "Al hacer click lo redireccionará a la página para visualizar el elemento"
        }
    },
    {
        element: ".btnNull",
        popover: {
            description: "Esto anulará la venta y devuelve los productos al inventario, tiene el límite de 2 días"
        }
    },
    {
        element: ".btnEdit",
        popover: {
            description: "Al hacer click lo redireccionará a la página de edición de un elemento"
        }
    },
    {
        element: ".btnDelete",
        popover: {
            description: "Al hacer click le mostrará un cuadro de confirmación para eliminar el elemento"
        }
    },
    {
        element: ".infoCounters",
        popover: {
            description: "Muestra contadores de los elementos de la tabla"
        }
    }, {
        element: ".paginationTable",
        popover: {
            description: "Controles para la paginación de la tabla"
        }
    }, {
        element: ".paginationBtnBack",
        popover: {
            description: "Botón para ir a la página anterior"
        }
    },
    {
        element: ".paginationBtnNext",
        popover: {
            description: "Botón para ir a la página siguiente"
        }
    }, {
        element: ".paginationInfo",
        popover: {
            description: "Muestra información de paginación"
        }
    }
];


interface IStateDriver {
    steps: DriveStep[]
    setSteps: (steps: DriveStep[]) => void
    run: () => void
}

export const StateDriver = create<IStateDriver>((set, get) => ({
    steps: [],
    setSteps: (steps: DriveStep[]) => set({ steps }),
    run: () => {
        let { steps } = get();
        
        steps = steps.filter(s => stepIfExist(s.element as string));
        if (steps.length === 0) {
            toast.error("Si no hay información, se explica solo")
            return;
        }
        driver({
            showProgress: true,
            nextBtnText: "Siguiente",
            prevBtnText: "Anterior",
            doneBtnText: "Listo",
            steps
        }).drive();
    }
}))

const stepIfExist = (element: string) => {
    if (document.querySelector(element)) {
        return true;
    }
    return false;
}