import { Skeleton } from "@mui/material";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface IProps {
    counter: number;
    title: string;
    color: string;
    link: string;
    icon: React.ReactNode;
    isLoading?: boolean;
  }
  const SkeletonCounters = () => {
    return <Skeleton variant="rounded" height="2.25rem" width={100} />
  }

export const BoxCounterInfo: React.FC<IProps> = ({counter, title, color, link, icon,isLoading}) => {
  return (
    <div className="group w-[290px] h-[130px] rounded-lg overflow-hidden" style={{backgroundColor: color}}>
      <div className="h-[107px] p-4 text-white flex justify-between">
        <div>
          {isLoading ? <SkeletonCounters /> : <p className="text-3xl">{counter}</p>}
          <p className="mt-2">{title}</p>
        </div>
        <p className="text-6xl text-gray-600 opacity-55 duration-300 group-hover:scale-[1.1]">
          {icon}
        </p>
      </div>
      <div
        className="group/link bg-gray-600 w-full mb-[200px] flex
           justify-center text-white
           bg-opacity-35"
      >
        <Link to={link} className="flex justify-center items-center">
          Mas información
          <span className="ml-2 group-hover/link:rotate-180 duration-300">
            <FaCircleArrowLeft />
          </span>
        </Link>
      </div>
    </div>
  );
};
