
export const Card = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="m-3 animate__animated animate__fast animate__fadeInLeft bg-white rounded-lg px-2 border border-[#EA4D1C]">
        {children}
    </div>
  )
}
