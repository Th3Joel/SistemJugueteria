interface CardProps {
  children: React.ReactNode;
  notAnimate?: boolean;
}

export const Card:React.FC<CardProps> = ({children,notAnimate}) => {
  return (
    <div className={`${!notAnimate && 'animate__fadeInLeft'} bg-white rounded-lg px-2 border border-[#EA4D1C]`}>
        {children}
    </div>
  )
}
