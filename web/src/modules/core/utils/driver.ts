import {driver} from "driver.js"

export const driverAllData = driver({
    showProgress:true,
    nextBtnText:"Siguiente",
    prevBtnText:"Anterior",
    doneBtnText:"Listo",
    steps:[
        {
            element:".btnAdd",
            popover:{
                description:"Al hacer click lo redireccionará a la página de creación de un nuevo elemento"
            }
        },
        {
            element:".perPage",
            popover:{
                description:"Selecciona el número de elementos que se mostraran en la tabla"
            }
        },
        {
            element:".txtSearch",
            popover:{
                description:"Busca elementos en la tabla"
            }
        },
        
        {
            element:".btnEdit",
            popover:{
                description:"Al hacer click lo redireccionará a la página de edición de un elemento"
            }
        },
        {
            element:".btnDelete",
            popover:{
                description:"Al hacer click le mostrará un cuadro de confirmación para eliminar el elemento"
            }
        },
        {
            element:".infoCounters",
            popover:{
                description:"Muestra contadores de los elementos de la tabla"
            }
        },{
            element:".paginationTable",
            popover:{
                description:"Controles para la paginación de la tabla"
            }
        },{
            element:".paginationBtnBack",
            popover:{
                description:"Botón para ir a la página anterior"
            }
        },
        {
            element:".paginationBtnNext",
            popover:{
                description:"Botón para ir a la página siguiente"
            }
        },{
            element:".paginationInfo",
            popover:{
                description:"Muestra información de paginación"
            }
        }
    ]
});
