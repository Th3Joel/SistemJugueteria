import { createTheme, IconButton, ThemeProvider } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { FaCircleXmark } from "react-icons/fa6";

interface IProps {
    children: React.ReactNode
    open:boolean
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
}
const DrawerTeme = createTheme({
    components: {
        MuiDrawer: {
            styleOverrides: {
                paperAnchorBottom: {
                    borderRadius:"20px 20px 0 0",
                }
            }
        },
    }
})
export const Drawer: React.FC<IProps> = ({ children,open,setOpen }) => {



    return (
        <ThemeProvider theme={DrawerTeme}>
            <SwipeableDrawer
                swipeAreaWidth={50}
                anchor="bottom"
                open={open}
                onOpen={()=>setOpen(true)}
                onClose={()=>setOpen(false)}
                disableSwipeToOpen={true}
            >
                <div className="absolute right-0 top-0">
                    <IconButton color="success" onClick={()=>setOpen(false)}>
                        <FaCircleXmark />
                    </IconButton>
                </div>
                {children}
            </SwipeableDrawer>
        </ThemeProvider>
    )
}
