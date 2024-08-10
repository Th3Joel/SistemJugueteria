import { useEffect, useState } from "react";
import LoaderSmall from "@/modules/core/components/LoaderSmall";
import alertBox from "@/modules/core/utils/alertBox";
import { AuthState } from "../globalStates/auth-state";
import { Link } from "react-router-dom";

import { Button, TextField } from "@mui/material";
import { IUseTable } from "../hooks/useTable";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface IProps {
  ruta: string;
  colunms: string[];
  hook: IUseTable<any>;
  body(
      ruta:string,
    eliminar: (id: string, texto: string) => void,
    img: (name: string) => string

  ): React.ReactNode;
}

const Table: React.FC<IProps> = ({ ruta, colunms, hook, body }) => {
  const { user } = AuthState();

  const { get, all, loading,remove } = hook;

  const [pageSize, setPageSize] = useState(10); //Registros por pagina
  const [page, setPage] = useState(1); //Numero de pagina

  //Estado para evitar que se ejecute varias veces el getDatos
  const [avoid, setAvoid] = useState(false);

  //muestra detalles del numero de registro en acumulador
  const [ac, setAc] = useState(1);
  const [ac2, setAc2] = useState(pageSize);

  const pagSig = () => {
    if (page < (all?.pages ?? 0)) {
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
    get(`/${ruta}?page=${page}&pageSize=${pageSize}`);
  };

  const img = (name: string) => {
    return `${process.env.NEXT_PUBLIC_URL}/${ruta}/picture/${name}`;
  };

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
    //Agregar retraso
    clearTimeout(setTime);
    setTime = setTimeout(() => {
      get(`/${ruta}?page=${page}&pageSize=${pageSize}&search=${val}`);
      setAc(1);
      setPage(1);
    }, 500);
  };

  const eliminar = (id: string, texto: string) => {
    console.log(id);
    alertBox("warning", "Está seguro?", texto, "Si, eliminar", async () => {
      await remove(`/${ruta}/${id}`);
      getDatos();
    });
  };

  useEffect(() => {
    setAc2(ac + ((all?.data.length ?? 0) - 1));
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

  return (
    <>
      <div className="h-12 flex items-center">
        <Link to={`/${ruta}/add`}>
        <div className="btnAdd">

          <Button variant="contained">Agregar</Button>
        </div>
        </Link>
      </div>
      <hr />
      <div className="p-2">
        <div className="flex justify-between mb-2 items-center flex-col sm:flex-row gap-2">
          <div className="perPage">
            <select
              onChange={initSetPageSize}
              className="mr-2 p-[3px] text-center rounded-md outline-none"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            por página
          </div>

          <div className="txtSearch">
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
                  <td colSpan={colunms.length}>
                    <div className="p-6 flex justify-center">
                      <LoaderSmall />
                    </div>
                  </td>
                </tr>
              ) : all?.data.length ? (
                body(`/${ruta}/edit/`,eliminar, img)
              ) : (
                <tr>
                  <td colSpan={colunms.length} className="text-center">
                    No hay elementos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row justify-between mt-2 items-center">
          <div className="infoCounters">
            Mostrando {ac} a {ac2} de {all?.count} elementos
          </div>
          <div className="flex items-center justify-end paginationTable">
            <Button className="paginationBtnBack" variant="outlined" disabled={loading} onClick={pagAnt}>
              <FaChevronLeft />
            </Button>
            <span className="p-2 paginationInfo">
              página {page} de {all?.pages}
            </span>
            <Button variant="outlined" className="w-[50px] paginationBtnNext" disabled={loading} onClick={pagSig}>
              <FaChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
