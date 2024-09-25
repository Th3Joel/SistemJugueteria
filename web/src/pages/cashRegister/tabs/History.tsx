import cashImage from "@/assets/cash.png";
import dayjs from "dayjs";
import { formatNumber } from "@/modules/core/utils/formatNumber";
import { useNavigate } from "react-router-dom";
import Table from "@/modules/core/components/Table";
import { useTable } from "@/modules/core/hooks/useTable";
import { AuthState } from "@/modules/core/states/auth-state";


interface DataItem {
  id: string;
  state: string;
  initialBalance: string;
  totalCashBalance: string;
  totalSales: string;
  closedAt: string;
  createdAt: string;
  user: {
    name: string;
  };
}

const History = () => {
  const navigate = useNavigate();
  const hook = useTable<DataItem>()
  const {user} = AuthState();

  const toDetail = (id: string, state: string) => {
    if (state === "0") {
      navigate(`/cash-register/show/${id}`)
    }
  }

  return (

    <div className="flex justify-center my-2">
      <div className="border rounded-xl">
        <Table
          v3
          hook={hook}
          colunms={[]}
          ruta={user.Role == "admin" ? "cash-register" : "cash-register/my"}
          body={() =>
            hook.all?.data.map((item, index) => (
              <div key={index}
                className="cursor-pointer rounded-xl shadow-lg px-4 py-3 flex justify-between w-[700px] border"
                onClick={() => toDetail(item.id, item.state)}>
                <div className="flex">
                  <img src={cashImage} alt="cashImage" width={90} />
                  <div className="flex flex-col justify-center ml-3">
                    <h1 className="font-bold text-xl">Caja de:</h1>
                    <h2 className="text-gray-500 font-bold">{
                      user.Role == "admin" ?
                        item.user.name :
                        user.Name
        
                    }</h2>
                    {
                      item.state === "1" ? <h3 className="text-green-700 mt-3">
                        {dayjs(item.createdAt).format("DD/MM/YYYY | hh:mm A")}
                      </h3> :
                        <h3 className="text-red-700 mt-3">
                          {dayjs(item.closedAt).format("DD/MM/YYYY | hh:mm A")}
                        </h3>
                    }

                  </div>
                </div>

                <div className="flex flex-col justify-between ml-4">

                  {
                    item.state === "1" ? <h1 className="text-green-700 text-end font-bold">
                      Abierta
                    </h1> :
                      <h1 className="text-red-700 text-end font-bold">
                        Cerrada
                      </h1>
                  }

                  <div className="flex flex-col text-lg">

                    <span>
                      Saldo inicial: C$ {formatNumber(item.initialBalance)}
                    </span>
                    {
                      item.state === "0" &&
                      <span>
                        Total ventas: C$ {formatNumber(item.totalSales)}
                      </span>
                    }

                  </div>
                </div>
              </div>

            )
            )
          }
        />
      </div>

    </div>
  )
}

export default History;