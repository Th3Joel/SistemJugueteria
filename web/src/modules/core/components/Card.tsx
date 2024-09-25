import { IconButton, Tooltip } from "@mui/material";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";


interface BaseProps {
  children: React.ReactNode;
  notAnimate?: boolean;
}

interface BtnBackProps extends BaseProps {
  btnBack: true;
  btnBackLink: string;
}
/**
 * Esto es para si envio el parametro btnBack
 * me requiere que se pase el btnBackLink
 */
interface NoBtnBackProps extends BaseProps {
  btnBack?: false;
  btnBackLink?: never; // Asegura que btnBackLink no se debe proporcionar aquí
}

// Unión de tipos
type Props = BtnBackProps | NoBtnBackProps;

export const Card: React.FC<Props> = ({ children, notAnimate, btnBack, btnBackLink }) => {
  return (
    <div className={`${!notAnimate && 'animate__fadeInLeft'} bg-white rounded-lg px-2 border border-[#EA4D1C]`}>
      {
        btnBack &&
        <Tooltip title="Volver">
          <Link to={btnBackLink ?? ""} className="mt-3 absolute -top-2 left-1">
            <IconButton color="primary">
              <FaCircleArrowLeft size={30} />
            </IconButton>
          </Link>
        </Tooltip>
      }
      {children}
    </div >
  )
}
