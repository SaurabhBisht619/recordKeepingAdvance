import React,{useEffect, useState} from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import './Field.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Alert from './Alert';


let flag=false;

function Field() {

  // Get data from the local storage
  const getLocalItem =()=>{
    let data = localStorage.getItem("myKey");
    if(data){
      return JSON.parse(localStorage.getItem("myKey"))
    }
    else {
      return [];
    }
  }

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [data,setData] = useState(getLocalItem);
    const [alert, setAlert] = useState({ show: false });


    const handleAlert =(text) =>{
      setAlert({show:true,text});
      setTimeout(() => {
        setAlert({show:false})
      }, 2000);
    }

    const val = /^[^\s@]+@[^\s@]+\.[^\s@1]{2,}$/i;
    const addData = ()=>{
      if(name.length===0){
        // alert("Enter name");
        let text="Enter Name"
        handleAlert(text);
        return;
      }
      else  if(email.length===0){
        // alert("Enter email")
        let text="Enter Email"
        handleAlert(text);
        return;
      }
      else  if(name.length<3){
        // alert("Enter valid name")
        let text="Enter Valid name"
        handleAlert(text);
        return;
      }
      else  if(email.length<10){
        // alert("Enter valid email")
        let text="Enter valid email"
        handleAlert(text);
        return;
      }
      else if(!val.test(email)){
        // alert("Please enter valid Email")
        let text="Please enter valid Email"
        handleAlert(text);
        return;
      }
        setData([...data,{ name,email}]);
        setName("");
        setEmail("");
        flag=true;
    }

    // Set data into the local storage
    useEffect(()=>{
        localStorage.setItem("myKey",JSON.stringify(data))
    },[data])

    const removeItem = (index) =>{
        let arr = data;
        arr.splice(index,1);
        setData([...arr]);
        if(arr.length===0){
          flag=false;
        }
    }

    // Add the data when press enter
    const press = (e)=>{
      if(e.charCode===13){
        addData();
      }
    }

    const deleteAll =()=>{
      setData([]);
      flag=false;
    }

    const copyFun = ()=>{
      let text="Copy of contant is not allowed"
      handleAlert(text);
      return;
    }

  return (
    <div>
   
    {alert.show && <Alert text={alert.text} />}

        <div className='field'>
        <Stack spacing={6} direction="row">
            <TextField onChange={(e)=>setName(e.target.value)} onCopy={copyFun} value={name} id="outlined-basic" label="name" variant="outlined" />

            <TextField onChange={(e)=>setEmail(e.target.value)} onCopy={copyFun} onKeyPress={(e)=> press(e)} value={email} id="outlined-basic" label="email" variant="outlined" />

            <button onClick={addData} className='field-btn'><AddIcon fontSize='large'/></button>
        </Stack>
        </div>

        <div className="field">
        <div className="field_val">
          <h5>Name</h5>
          <h5>Email</h5>
          <h5>Remove</h5>
        </div>

    {
      data.map((val,index)=>{
        return(
          <div className="field_val">
          <h5>{val.name}</h5>
          <h5>{val.email}</h5>
          <h5 className='delete-btn' onClick={()=>removeItem(index)}><DeleteForeverIcon fontSize='large'/></h5>
        </div>
        )
      })

    }

    {/* Delete all button with condition */}
    {
      (data.length>0)?flag=true:flag=false
    }

    {
      (flag===false)?"":<button onClick={deleteAll} className='deleteAll'>Delete All</button>
    }


    </div>
    
    </div>
  )
}

export default Field;
