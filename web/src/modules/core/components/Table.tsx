import { useEffect, useState } from "react";
import LoaderSmall from "@/modules/core/components/LoaderSmall";
import alertBox from "@/modules/core/utils/alertBox";
import { AuthState } from "../globalStates/auth-state";
import { Link } from "react-router-dom";
import { KeyboardArrowLeftTwoTone, KeyboardArrowRightTwoTone } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";

interface ITable {
  ruta: string | undefined;
  colunms: string[];
  hook: any;
  body: any;
}


const Table = ({ ruta, colunms, hook, body }: ITable) => {

  const {user} = AuthState();

  const { get, all, loading } = hook;

  const [pageSize, setPageSize] = useState(10); //Registros por pagina
  const [page, setPage] = useState(1); //Numero de pagina

  //Estado para evitar que se ejecute varias veces el getDatos
  const [avoid, setAvoid] = useState(false);

  //muestra detalles del numero de registro en acumulador
  const [ac, setAc] = useState(1);
  const [ac2, setAc2] = useState(pageSize);

  const pagSig = () => {
    if (page < all.pages) {
      setPage(page + 1);
      setAc(ac + pageSize);
    }
  };
  const pagAnt = () => {
    if (page > 1) {
      setPage(page - 1);
      setAc(ac - pageSize);
    }
  };

  const getDatos = () => {
    //send(`/${ruta}/all?page=${page}&pageSize=${pageSize}`, "GET");
    get(`/${ruta}/all?page=${page}&pageSize=${pageSize}`);
    
  };

  const img = (name:string) =>{
    return  `${process.env.NEXT_PUBLIC_URL}/${ruta}/picture/${name}`;
  }

  //Reinicia cuando el select cambia de el numero de pagina
  const initSetPageSize = (e: { target: { value: string } }) => {
    const num = parseInt(e.target.value);
    setPageSize(num);
    setAc(1);
    setPage(1);
  };
  let setTime: any;

  const buscador = (e: { target: { value: string } }) => {
    const val = e.target.value;
    console.log(val)
    //Agregar retraso
    clearTimeout(setTime);
    setTime = setTimeout(() => {
      // send(
      //   `/${ruta}/all?page=${page}&pageSize=${pageSize}&search=${val}`,
      //   "GET"
      // );
      setAc(1);
      setPage(1);
    }, 500);
  };

  const eliminar = (id: string, texto: string) => {
    console.log(id)
    
    alertBox("warning", "Está seguro?", texto, "Si, eliminar", async () => {
      //await send(`/${ruta}/${id}`, "DELETE"); 
      getDatos();
    });
  };

  useEffect(() => {
    setAc2(ac + (all?.data.length - 1));
  }, [all]);

  useEffect(() => {
    avoid && getDatos();
  }, [pageSize, page]);

  //Inicia y poner en true avoid para que evitar que los otros
  //use effect se repitanx
  useEffect(() => {
    if (user && !avoid) {
      getDatos();
      setAvoid(true);
    }
  }, [user]);

  return  (
    <>
      <div className="h-12 flex items-center">
        <Link to={`/${ruta}/agregar`}>
          <Button variant="contained">Agregar</Button>
        </Link>
      </div>
      <hr />
      <div className="p-2">
        <div className="flex justify-between mb-2 items-center flex-col sm:flex-row gap-2">
          <div>
            <select
              onChange={initSetPageSize}
              className="mr-2 p-[3px] text-center"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            por página
          </div>

          <div>
            <TextField
              onChange={buscador}
              type="search"
              label="Buscar"
              variant="outlined"
              size="small"
              className="w-[170px] ml-2"
            />
          </div>
        </div>
        <div className=" overflow-x-auto">
          <table>
            <thead>
              <tr>
                {colunms.map((x, i) => (
                  <th key={i}>{x}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6}>
                    <div className="p-6 flex justify-center">
                      <LoaderSmall />
                    </div>
                  </td>
                </tr>
              ) : all.data.length ? (
                body(eliminar,img)
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No hay elementos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row justify-between mt-2 items-center">
          <div>
            Mostrando {ac} a {ac2} de {all?.count} elementos
          </div>
          <div className="flex items-center justify-end">
            <button disabled={loading} onClick={pagAnt}>
              <KeyboardArrowLeftTwoTone />
            </button>
            <span className="p-2">
              page {page} de {all?.pages}
            </span>
            <button disabled={loading} onClick={pagSig}>
              <KeyboardArrowRightTwoTone />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
