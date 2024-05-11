import "@/modules/core/components/css/LoaderSplash.css";
const LoaderSplash = () => {
  return (
    <div className=" scale-150 fixed min-h-screen w-full grid place-items-center">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoaderSplash;
