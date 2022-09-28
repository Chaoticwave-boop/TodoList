import React, { useReducer } from "react";
import { useRef, useState, useMemo,useEffect } from "react";
import './todo.scss';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { FormControl } from "@mui/material";
import Rating from '@mui/material/Rating';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TodoItems from "./TodoItems"


const locales = ["en"]
const Tips = ["Don't forget to check your email!","You can Do it !","You got this!"]

// importent 
// JSON.stringify(data) 


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  


const TodoSet = ({}) => {
    const inputRef = useRef(null);
    const [todo, setTodo] = useState([]);
    const [categories, setCategories] = useState([]);
    const [open, setopen] = useState(false);
    const [select, setSelect] =useState("");
    const [Text, setText] = useState("")
    const [value ,setValue] = useState(0)
    const [Show, SetShow] = useState("All");
    const [locale, setLocale] = useState('en');
    const [dateValue, setDateValue] = useState(dayjs());
    const [image, setImage] = useState(["https://i.im.ge/2022/09/22/1UHU0m.todocatneutral.jpg"]);
    const [num, setNum] = useState();
    const[beginImage, setBeginImage]= useState("https://i.im.ge/2022/09/22/1hS33D.todocatsleep.jpg");
    const [confirm, setComfirm] = useState(false);

    const optionsCategories = {method: 'GET', headers: {Accept: 'application/json'}};
    useEffect(() => {
        fetch('http://localhost:8080/api/todotypes', optionsCategories)
        .then(response => response.json())
        .then(data => {setCategories(data)})
    },[categories])
    
      
    const options = {method: 'GET', headers: {Accept: 'application/json'}};
    useEffect(() => {
        fetch('http://localhost:8080/api/todos', options)
        .then(response => { return response.json()})
        .then (data => {setTodo(data)}) 
    },[todo]);

    // i think this is how it gonna work? maybe?
    // i think i have to use json.stringefy on the body part?!
    // maybe make the input go into another useState and stringefy that part?


    // const optionsSend = {
    //     method: 'POST',                                                                          
    //     headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    //     body: '{"description":"eat a cake","typeId":1}'                                                                   
    //   };                                                                                        
    //   useEffect(() => {                                                                                      
    //     fetch('http://localhost:8080/api/todos', optionsSend)                        
    //     .then(response => response.json())
    //   },[todo])


    let i = todo.length

   const selectLocale = (newLocale) => {
        setLocale(newLocale);
   }

    const handleValue = (event, newValue) => {
        setValue(newValue)
    }
   
    const updateTodo = event => { 
        console.log(todo)
        newImage() 
        var date = dateValue.$d  ;
        var finaldate = date.getDate() + '-' +  (date.getMonth() + 1)  + '-' +  date.getFullYear();
        inputRef.current.value = inputRef.current.value.trim();


        if (inputRef.current.value == "" ){
            setText("Please Type a Todo");
            setopen(true);}

        else if (select === "") {
            setText("please select an Urgent");
            setopen(true);}

        else if (select === select && inputRef.current.value ==""){
            setText("Please Type a Todo");
            setopen(true);}

        else if (inputRef.current.value.length < 3 ){
            setText("Please type a longer sentence");
            setopen(true);}
        
        else if (finaldate.length == 11){
            setText("Please put in a valid date")
            setopen(true);}
      
        else{
            setTodo([...todo, {id: i++, description:inputRef.current.value, todoType:{name:select} ,done:false ,date: finaldate}])
        }
            
            
        inputRef.current.value = ""
    }
       


    const DeleteTodoAll = () => {
            setTodo([])
        }
    

    const Comfirmed = () => {
        if (todo.length > 0){
            setComfirm(true)
        }
    }
    

    const handleClose = () =>{
        setopen(false);
        setComfirm(false);
    }



    const deleteToDo = (key) => {    
        // var list = [...todo];
        // // list.splice(key, 1)  
        // // setTodo(list);
            setTodo((current) =>
                current.filter(todoo => {
                    return todoo.id != key;
                })
                );
            }

    
    const Enter = event => {
        if (event.key === "Enter"){
            event.preventDefault();
            updateTodo();
        }
    }
    
    const HandleChange = (event) => {
        setSelect(event.target.value);
    };

    
   
    const EditTodo = (key) => setTodo(todo.map(t => t.id == key.description ? {...t, description: key.value}: t));
    
                                                    // dit is eigelijk hetzelde als en if en else statement
    const check = (val, id) => {
        setTodo(todo.map(t => t.id == id ? {...t, done: val} : t))
    }

 

    const ShowAll = () => {
        SetShow("All") 
    }

    const ShowUnfineshed  = () => {
        console.log("unfinished")
        SetShow("Unfinished")
    }

    const ShowFinished = () => {
        console.log("finished")
        SetShow("Finished")
    }

    const newImage = () => {
        const firstImage = setTimeout(()=> {
            setImage("https://i.im.ge/2022/09/22/1UJOcJ.todocatneutraltalk.jpg")
            setNum(randomNumberRange(0, 2))
        
        },2000)         

        const secondImage = setTimeout(()=>{
            setImage("https://i.im.ge/2022/09/22/1UHU0m.todocatneutral.jpg")
            setNum("")
        }, 6000)
    }

        const randomNumberRange = (min,max) =>{
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }    

        const Begin = () => {
            if (todo.length === 0 ){
            return(
            <a>
            <img src={beginImage}  
            alt="todocatsleep" border="0" className="sleepycat"/>
            </a> )}
        }


    const visibleTodos = useMemo(() => todo.filter(element => {
        if (Show === "All" 
        || (Show === "Unfinished" && element.done === false)
        || (Show === "Finished" && element.done === true))  {
            return true; 
        }

        return false;
    }, [ Show, todo ]));


  
    return(
    <div className="form">  
       
        <h1 className="textTodo"  >TodoList</h1>
        <h2>
            <Link href="http://127.0.0.1:5173/NewPage" underline="hover" className="Link">
                Information
            </Link>
        </h2>
    
        

        <Box className="TimePicker">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                <Stack spacing={3}>
                    <ToggleButtonGroup value={locale} exclusive sx={{ mb: 2, display: 'block' }}>
                        {locales.map((localeItem)=>{
                            <ToggleButton key={localeItem} value={localeItem} onClick={() => selectLocale(localeItem)}>
                            </ToggleButton>
                        })}
                    </ToggleButtonGroup>
                    <DatePicker value={dateValue}  onChange={(newValue) => setDateValue(newValue)}
                    renderInput={(params) => <TextField {...params} />} >   
                    </DatePicker>
                </Stack>
            </LocalizationProvider>
        </Box>
            
            <div role="tabpanel">
                <Box  className="ShowSertainTodos">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleValue} >
                            <Tab label="Show all" onClick={ShowAll} className="HoverOptions" />
                            <Tab label="Show unfinished" onClick={ShowUnfineshed} className="HoverOptions" />
                            <Tab label="Show finished" onClick={ShowFinished} className="HoverOptions" />
                        </Tabs>
                    </Box>
                </Box>
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                <Alert severity="error" onClose={handleClose} sx={{ width: 350 }} className="alert">{Text}</Alert>
            </Snackbar>
            
            <div className="Top-Container">
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth className="Options" >
                        <InputLabel className="select" >Urgent</InputLabel>
                            <Select   onChange={HandleChange} value={select} label="Urgent" >
                                {categories.map((category) => <MenuItem value={category.id}>{category.name}</MenuItem>)}
                                
                            </Select> 
                    </FormControl> 
                </Box>

                
              
                <Button variant="outlined" color="error" className="DeleteAll" onClick={Comfirmed}>Delete All</Button>
            

                <input className="input" placeholder="Add Task"  onKeyPress={Enter} ref={inputRef} type="text" autoComplete="off"  />
                
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Fab aria-label="add" onClick={function(event){updateTodo()} } type="submit" className="add-button">
                        <AddIcon/>
                    </Fab>
                </Box>
               
                <p className="textTodoAmount">amount of Todo's:</p>
                <p className="amountTodo">{todo.length}</p>
                
               
                

            </div>
        
            <Box>
                <div className="todos-container">
                    <div className="high">
                        <Rating name="disabled" value={5} readOnly className="rating" />
                        <h3 className="High">Home</h3>
                        <TodoItems category="Thuis" todos={visibleTodos} editCallback={EditTodo} deleteCallback={deleteToDo} checkCallback={check} />
                    </div>
                    <div className="medium">
                        <Rating name="disabled" value={3} readOnly className="rating" />
                        <h3 className="Medium">Work</h3>
                        <TodoItems category="Werk" todos={visibleTodos} editCallback={EditTodo} deleteCallback={deleteToDo} checkCallback={check} />

                    </div>
                    <div className="low">
                        <Rating name="disabled" value={2} readOnly className="rating" />
                        <h3 className="Low"> School</h3>
                        <TodoItems category="School" todos={visibleTodos} editCallback={EditTodo} deleteCallback={deleteToDo} checkCallback={check} />
                    </div>
                </div>   
            </Box>
      

    
        <img src={image} 
        alt="todocatneutral" border="0"  className="catmascot" onClick={newImage} />
      

        <Box className="Tips">
            <div>
                <p >{Tips[num]}</p>
            </div>
        </Box>           
        
        <Begin />
    
            <div>
                <Dialog open={confirm} onClose={handleClose}  aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" >{"are you sure you want to delete all?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Warning this deletes EVERYTHING your completed & uncompleted todo's</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{handleClose()}}>Disagree</Button>
                    <Button onClick={()=>{handleClose(),DeleteTodoAll()}} autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>


    </div>
    );}



    

const Todo = () => {
    return(
        <div>
            <TodoSet/>
        </div>
    )
}



export default Todo
