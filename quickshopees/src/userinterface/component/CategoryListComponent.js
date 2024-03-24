import { Avatar, Paper } from "@mui/material";
import { serverURL } from "../../assets/services/FetchNodeService";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';


export default function CategoryListComponent({data,getSubCategoryId})
{
  const handleClick=(item)=>
  {
    getSubCategoryId(item.subcategoryid,item.subcategoryname)
  }
    
    const listView=()=>
    {      console.log(data)
        return data.map((item)=>{
            return <ListItem disablePadding>
              <ListItemButton onClick={()=>handleClick(item)} style={{display:'flex'}}>
                <ListItemIcon>
                  <Avatar src={`${serverURL}/images/${item.icon}`} />
                </ListItemIcon>
                <ListItemText primary={<span style={{fontFamily:'poppins',fontSize:14}}>{item.subcategoryname}</span>} />
              </ListItemButton>
           
            </ListItem>
              
            
        })
    }


    return(<div>
        <Paper elevation={2}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <Avatar src={`${serverURL}/images/masala.png`} />
                Top Category
            </div>
           
        </Paper>
        <List>
            
            {listView()}
            </List>
        
            
    </div>)
    
}