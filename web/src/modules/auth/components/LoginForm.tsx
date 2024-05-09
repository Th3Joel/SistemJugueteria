import { AccountCircle, Key } from "@mui/icons-material";
import { Button, InputAdornment, Link, TextField } from "@mui/material";

export const LoginForm = () => {
  return (
    <div className="w-[300px] border-[1px] border-t-blue-600 border-t-4 bg-white border-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold text-center mt-2 mb-2">
        Coleccióname
      </h1>
      <hr className="border-gray-200" />

      <form action="" className="flex flex-col gap-3 px-6 py-2">
        <h3 className="text-center">Bienvenido</h3>
        <TextField size="small" label="Correo" variant="outlined" InputProps={{startAdornment:(
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        )}} />
        <TextField size="small" type="password" label="Contraseña" variant="outlined" InputProps={{startAdornment:(
          <InputAdornment position="start">
            <Key />
          </InputAdornment>
        )}}/>
        <Button variant="contained">Iniciar session</Button>
        <Link className="text-center">¿Hás olvidado tu contraseña</Link>
      </form>
    </div>
  );
};
