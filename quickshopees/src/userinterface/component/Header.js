import { AppBar,Badge,Toolbar } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStyle } from "../UserInterfaceCss";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {InputAdornment,OutlinedInput,FormControl} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux"

export default function Header(props)
{
  const navigate=useNavigate()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  var product=useSelector((state)=>state.products)
  var totalproduct=Object.keys(product)
    const classes=useStyle()

               
    const handleNavigate=()=>
    {
    navigate('/cart')
    }
                 
    return(<div >
       
        <AppBar position="fixed"  >
            <Toolbar className={classes.header}>
                <div className={classes.headcontain}>
               <div className={classes.headfont} >
               {matches?`Quickshopee`:`QS`}
               </div>

               <div className={classes.searchicon}>
                <FormControl sx={{ m: 1, width: '60ch' }} variant="outlined">
                  
            <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end"><SearchOutlinedIcon/></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          </FormControl>
          </div>
               
          <div className={classes.icon}>
                <PersonIcon/>
                <div className={classes.carticon}>
                  <Badge badgeContent={totalproduct.length} color="success">
                 <ShoppingCartIcon onClick={handleNavigate} />
                </Badge >
                </div>
              </div>

               </div>

            </Toolbar>
        </AppBar>

          
    </div>)
}