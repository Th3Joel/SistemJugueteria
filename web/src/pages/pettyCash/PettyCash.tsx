import { Card } from "@/modules/core/components/Card"
import LoaderSmall from "@/modules/core/components/LoaderSmall"
import { AuthState } from "@/modules/core/states/auth-state"
import { TitleState } from "@/modules/core/states/title-state"
import { StateDriver, stepsPettyCash } from "@/modules/core/utils/driver"
import { formatNumber } from "@/modules/core/utils/formatNumber"
import { Expenses } from "@/modules/pettyCash/components/Expenses"
import { GeneralData } from "@/modules/pettyCash/components/GeneralData"
import { Refunds } from "@/modules/pettyCash/components/Refunds"
import { pettyCashState } from "@/modules/pettyCash/states/DataState"
import { useEffect, useState } from "react"


const PettyCash = () => {
    const { setTitle } = TitleState()
    const { user } = AuthState()
    const { setSteps } = StateDriver()
    const [loadingFetch, setLoadingFetch] = useState(true)
    const { InitialBalance, balance, Limit, fetchData } = pettyCashState()
    useEffect(() => {
        setTitle("Caja chica")
        fetchData().then(() => {
            setLoadingFetch(false)
        })
        setSteps(stepsPettyCash)
    }, [])
    return (
        <Card>
            <div className="flex justify-center my-3 mx-2">
                {
                    loadingFetch ? <LoaderSmall />
                        :
                        <div className="w-full sm:max-w-[680px] flex flex-col gap-5">
                            {
                                user.Role == "admin" && <GeneralData />
                            }

                            <div className="shadow-lg rounded-lg p-3 flex justify-evenly">
                                <div className="font-bold text-gray-600 ">
                                    <h1 className="text-end">Saldo disponible:</h1>
                                    {
                                        user.Role == "admin" && <h1>Reembolso pendiente:</h1>
                                    }
                                </div>

                                <div className="font-bold text-gray-600">
                                    <h1 className={balance <= parseFloat(Limit + "") ? "text-red-600" : ""}>C$ {formatNumber(balance + "")}</h1>
                                    {
                                        user.Role == "admin" && <h1>
                                            C$ {formatNumber((InitialBalance - balance) + "")}
                                        </h1>
                                    }
                                </div>
                            </div>
                            <Expenses />

                            {
                                user.Role == "admin" && <Refunds />
                            }

                        </div>

                }


            </div>
        </Card>
    )
}

export default PettyCash