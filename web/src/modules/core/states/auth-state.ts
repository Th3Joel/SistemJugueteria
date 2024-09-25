import { create } from "zustand";
import { useFetch } from "../hooks/useFetch";
interface IUser {
  Name: string;
  Email: string;
  Picture: string;
  Role: string;
}
type ICompany = {
  Name: string;
  Logo: string;
  Email: string;
  Phone: string;
  Ruc: string;
  Address: string;
  PriceDollar: string;
}
interface IAuth {
  estado: boolean;
  loading: boolean;
  user: IUser;
  company: ICompany;
  verify(): void;
}

export const AuthState = create<IAuth>((set) => ({
  user: {
    Name: "",
    Email: "",
    Picture: "",
    Role: "",
  },
  company: {
    Name: "",
    Logo: "",
    Email: "",
    Phone: "",
    Ruc: "",
    Address: "",
    PriceDollar: ""
  },
  estado: false,
  loading: true,
  verify: async () => {
    try {
      const userResponse = await useFetch<{ status: boolean, find: IUser }>("/settings/users/user", "GET");
      const companyResponse = await useFetch<{ status: boolean, find: ICompany }>("/settings/company", "GET");

      if (userResponse.status) {
        set({ estado: true, user: userResponse.find });
      } else {
        set({ estado: false });
      }

      set({ loading: false });

      if (companyResponse.status) {
        set({ company: companyResponse.find });
      }

    } catch (error) {
      console.error("Error fetching authentication data:", error);
      set({ loading: false });
    }
  }
}));
