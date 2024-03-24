import {useEffect,useState} from 'react'
import { Button } from '@mui/material'

export default function    PlusMinusComponent(props){
console.log("QTTTTTTY",props.qty)    
const [value,setValue]=useState()
useEffect(()=>{
    setValue(props.qty)
},[props])
const handlePlusClick=()=>{
    
    setValue((prev)=>{
        if(prev<5)
        { props.onChange(prev+1)
        return prev+1}
        else 
        { props.onChange(prev)
            return prev}
    })
}
const handleMinusClick=()=>{
    setValue((prev)=>{
        if(prev>=1)
        { props.onChange(prev-1)
            return prev-1}
        
        })


}
return(<div>
     <div style={{ paddingRight: 10, marginLeft: '4%', marginTop: '3%' }}>
               {value==0?<Button onClick={handlePlusClick} variant='outlined' color='success' >ADD</Button>:
               <div style={{border:'1px solid #70a1ff',width:75,display:'flex',justifyContent:'space-between',borderRadius:5,height:25}}>
                <div onClick={handlePlusClick} style={{cursor:'pointer', fontWeight:20,background: '#70a1ff',color:'#fff',width:9,padding:10,display:'flex',alignItems:'center',justifyContent:'center'}} >+</div>
                <div style={{fontWeight:20,display:'flex',alignItems:'center',justifyContent:'center'}}>{value}</div>
                <div onClick={handleMinusClick} style={{cursor:'pointer', background: '#70a1ff',color:'#fff',fontWeight:20, width:9,padding:10,alignItems:'center',display:'flex',justifyContent:'center'}}>-</div>
               </div>}
            </div>
    </div>)

}