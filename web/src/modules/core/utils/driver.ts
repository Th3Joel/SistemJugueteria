import { driver, DriveStep } from "driver.js"
import { toast } from "sonner";
import { create } from "zustand";

export const stepsAddPurchase: DriveStep[] = [
    {
        element: ".dataPurchaseGen",
        popover: {
            description: "Aquí puedes ingresar los datos de la compra, como el número de factura,elegir el proveedor y la fecha"
        }
    },
    {
        element:".boxDetails",
        popover: {
            description: "En esta sección puedes elegir una caja de artículos registrada con anterioridad, ingresar el costo de la caja y la cantidad de artículos que contaste al inventariar la caja"
        }
    },

    {
        element:".btnAddArticle",
        popover: {
            description: "Este botón abrirá un modal que te permetirá elegir un artículo para ingresarlo al detalle de la compra"
        }
    }
]

export const stepsAddSale: DriveStep[] = [
    {
        element: ".dataSaleGen",
        popover: {
            description: "Aquí puedes ingresar los datos de la venta, como el número de factura (autoincremental),elegir el cliente"
        }
    },
    {
        element:".btnAddArticle",
        popover: {
            description: "Este botón abrirá un modal que te permetirá elegir un artículo para ingresarlo al detalle de la venta"
        }
    }
]

export const stepsMaintenance: DriveStep[] = [
    {
        element: ".backupStep",
        popover: {
            description: "En esta sección vas a poder realizar una copia de seguridad de la base de datos y poder restaurarla en caso de una pérdida de datos, cada véz que cierre sesión se te preguntará si desea hacer un respaldo"
        }
    }
]

export const stepsCompany: DriveStep[] = [
    {
        element: ".companyForm",
        popover: {
            description: "Aquí vas a poder ingresar la información de la empresa"
        }
    }
]

export const stepsFormAdd: DriveStep[] = [
    {
        element: ".formAdd",
        popover: {
            description: "En esta sección puedes ingresar la información nueva en el formulario"
        }
    }
]

export const stepsPettyCash: DriveStep[] = [
    {
        element: ".pettyCashGeneral",
        popover: {
            description: "En esta sección, puedes editar los datos generales de la caja chica. El monto inicial establece un límite sobre cuánto se puede reembolsar. Además, el límite de saldo mínimo determina cuándo el saldo se mostrará en rojo, si es inferior a dicho límite."
        }
    },
    {
        element: ".pettyCashExpenses",
        popover: {
            description: "Te muestra una lista de los egresos realizados, tambien puedes agregar nuevos egresos y eliminar en caso de ingresar datos erróneos"
        }
    },
    {
        element: ".pettyCashRefunds",
        popover: {
            description: "Te muestra una lista de los reembolsos realizados, tambien puedes agregar nuevos egresos y el saldo disponible se actualizará automáticamente"
        }
    }
]

export const stepsCashRegisterHistory: DriveStep[] = [
    {
        element: ".cashRegisterHistory",
        popover: {
            description: "Muestra un historial de todas las cajas, puedes ver los detalles de una caja solo si está cerrada haciendo click en ella"
        }
    }
]

export const stepsCashRegister: DriveStep[] = [
    //CashRegister
    {
        element: ".cashRegisterReqOpen",
        popover: {
            description: "Aquí vas a poder ingresar el monto de la caja para aperturarla"
        }
    },
    {
        element: ".cashRegisterGen",
        popover: {
            description: "Muestra información básica de la caja: Nombre de cajero, fecha de apertura (marcado en color verde), estado de la caja (marcado en color verde), botón para cerrar la caja"
        }
    },
    {
        element: ".cashRegisterDetails",
        popover: {
            description: "Muestra detalles de la caja: Saldo inicial, total de ventas, total de egresos, total de córdobas, faltantes en córdobas, sobrantes en córdobas,total dólares, faltante en dólares, sobrantes en dólares."
        }
    },
    {
        element: ".cashRegisterDenomination",
        popover: {
            description: "Aquí puedes ingresar las cantidades de dinero que tienes en la caja, para poder hacer el arqueo"
        }
    },
    {
        element: ".cashRegisterDenominationTotalDollar",
        popover: {
            description: "Aqui puedes ingresar la cantidad total de dólares que tienes en la caja"
        }
    },
    {
        element: ".cashRegisterDenominationTotalCordoba",
        popover: {
            description: "Te muestra el total de córdobas de los cálculos de la denominación"
        }
    },
    {
        element: ".cashRegisterDenominationTotalClean",
        popover: {
            description: "Aqui puedes limpiar los datos de la denominación"
        }
    },
    {
        element: ".cashRegisterExpenses",
        popover: {
            description: "Te muestra una lista de los egresos realizados, tambien puedes agregar nuevos egresos y eliminar en caso de ingresar datos erróneos"
        }
    }
]

export const stepsDashboard: DriveStep[] = [
    {
        element: ".counters",
        popover: {
            description: "Muestra información general del sistema"
        }
    }, {
        element: ".graphSales",
        popover: {
            description: "Muestra información del total de ventas por mes en un gráfico"
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