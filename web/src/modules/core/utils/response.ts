import { IResponseFetch, ResTypeMessages } from "@/types.d";


export const CheckAuth = <T>(res: IResponseFetch<T>) => {
        if (res.type == ResTypeMessages.UNAUTHORIZED) {
            window.location.reload();
        }
}

