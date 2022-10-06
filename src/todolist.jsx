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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import SwitchNight from "./switch";
import Avatar from '@mui/material/Avatar';



const locales = ["en"]
const Tips = ["Don't forget to check your email!","You can Do it !","You got this!"]

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
    const [image, setImage] = useState(["https://i.im.ge/2022/10/05/1zm7BD.todocatneutral-removebg-preview-removebg-preview.png"]);
    const [num, setNum] = useState();
    const[beginImage, setBeginImage]= useState("https://i.im.ge/2022/10/05/1zmiOp.todocatsleep-removebg-preview.png");
    const [confirm, setComfirm] = useState(false);
    const [todoTypes, setTodoTypes] = useState([]);
    const [theme, setTheme] = useState ("light");
    const [color, setColor] = useState("purple")
    
    const GettingTodo = () => {
        const options = {method: 'GET', headers: {Accept: 'application/json'}};
        fetch('http://localhost:8080/api/todos', options)
            .then(response => { return response.json()})
            .then(dataTodos => setTodo(dataTodos))
    };

    useEffect(() => {
        const optionsCategories = {method: 'GET', headers: {Accept: 'application/json'}};
        fetch('http://localhost:8080/api/todotypes', optionsCategories)
            .then(response => response.json())
            .then(data => {setCategories(data)})
    }, []);
    
    useEffect(() => GettingTodo(), []);

    const selectLocale = (newLocale) => {
        setLocale(newLocale);
    };

    const handleValue = (event, newValue) => {
        setValue(newValue)
    };
   
    const updateTodo = event => { 
        if (theme == "light"){newImage()}
        else {darkImage()}

        var date = dateValue.$d  ;
        var finaldate = date.getDate() + '-' +  (date.getMonth() + 1)  + '-' +  date.getFullYear();
        inputRef.current.value = inputRef.current.value.trim();

        if (inputRef.current.value == "" ){
            setText("Please Type a Todo");
            setopen(true);
        } else if (select === "") {
            setText("please select an Urgent");
            setopen(true);
        } else if (select === select && inputRef.current.value ==""){
            setText("Please Type a Todo");
            setopen(true);
        } else if (inputRef.current.value.length < 3 ){
            setText("Please type a longer sentence");
            setopen(true);
        } else if (finaldate.length == 11 || dateValue == null){
            setText("Please put in a valid date")
            setopen(true);
        } else {
            const optionsSend = {
                method: 'POST',                                                                          
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    description: inputRef.current.value,
                    typeId: select
                })                                                               
            };                                                                                                                                                                                       
            fetch('http://localhost:8080/api/todos', optionsSend)                        
                .then(response => response.json())
                .then(data => {
                    GettingTodo();
                })  
        }
        
        inputRef.current.value = ""
    };
    
    async function DeleteTodoAll(key) {
        const optionsDeleteAll = {method: 'POST', Headers: { Accept: 'application/json' }};
        for(let i= 0; i <= todo.length; i ++){ 
            await fetch(`http://localhost:8080/api/todos/${key}/delete`, optionsDeleteAll)
        } 
        setTodo([]);
    }

    const filterForDelete = () => {
        return (
            todo.map(key => {
                return DeleteTodoAll(key.id)
            })
        )
    };
    
    const Comfirmed = () => {
        setComfirm(true)
    };
    
    const handleClose = () =>{
        setopen(false);
        setComfirm(false);
    };

    const deleteToDo = (key) => {    
        fetch(`http://localhost:8080/api/todos/${key}/delete`, { 
            method: 'POST', 
            headers: { 
                Accept: 'application/json' 
            }
        }).then(response => {
            setTodo((current) =>
                current.filter(todoo => {
                    return todoo.id != key;
                })
            );
        });
    };
    
    const Enter = event => {
        if (event.key === "Enter"){
            event.preventDefault();
            updateTodo();
        };
    };
    
    const HandleChange = (event) => {
        setSelect(event.target.value);
    };

    const EditTodo = (key, singleTodo) => {
        const Fetching = `http://localhost:8080/api/todos/${singleTodo.id}`;
        const optionsEdit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"description":key.value,"typeId":singleTodo.todoType.id,"done":singleTodo.done})
          };
          fetch(Fetching, optionsEdit)
            .then(response => response.json())
    };
    
    const HandleCheck = (filteredCheck, val, id) => {
        const Fetching = `http://localhost:8080/api/todos/${id}`;
        const optionsCheck = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"description":filteredCheck.description,"typeId":filteredCheck.todoType.id,"done":val})
          };
          fetch(Fetching, optionsCheck)
            .then(response => response.json())
    };
                                                    // dit is eigelijk hetzelde als en if en else statement
    const check = (val, id) => {
        setTodo(todo.map(t => t.id == id ? {...t, done: val} : t))
        todo.filter(t => t.id == id).map(filteredCheck => (
            HandleCheck(filteredCheck, val, id)
        ))
    };

    const ShowAll = () => {
        SetShow("All") 
    };

    const ShowUnfineshed  = () => {
        SetShow("Unfinished")
    };

    const ShowFinished = () => {
        SetShow("Finished")
    };

    const newImage = () => {
        const firstImage = setTimeout(()=> {
            setImage("https://i.im.ge/2022/10/05/1zmLyC.todocatneutraltalk-removebg-preview.png")
            setNum(randomNumberRange(0, 2))
        
        },2000)         

        const secondImage = setTimeout(()=>{
            setImage("https://i.im.ge/2022/10/05/1zm7BD.todocatneutral-removebg-preview-removebg-preview.png")
            setNum("")
        }, 6000)
    };

    const darkImage = () => {
        const firstImage = setTimeout(()=> {
            setImage("https://i.im.ge/2022/10/06/1HJEC8.nightversion-talk-removebg-preview.png")
            setNum(randomNumberRange(0, 2))
           
        },2000)         

        const secondImage = setTimeout(()=>{
            setImage("https://i.im.ge/2022/10/06/1HJtcK.nightversion-neutral-removebg-preview.png")
            setNum("")
        }, 6000)

    }

        const randomNumberRange = (min,max) =>{
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };  

        const Begin = () => {
            if (todo.length === 0 ){
                if (theme == "light"){
                    setBeginImage("https://i.im.ge/2022/10/05/1zmiOp.todocatsleep-removebg-preview.png")
                    return(
                        <a>
                        <img src={beginImage}  
                        alt="todocatsleep" border="0" className="sleepycat"/>
                        </a> )}
                else { 
                    setBeginImage("https://i.im.ge/2022/10/06/1Hnbnx.night-cat-sleep-removebg-preview-2.png")
                    return(
                        <a>
                        <img src={beginImage}  
                        alt="todocatsleep" border="0" className="sleepycat"/>
                        </a> )
                }
        };}

    const visibleTodos = useMemo(() => todo.filter(element => {
        if (Show === "All" 
        || (Show === "Unfinished" && element.done === false)
        || (Show === "Finished" && element.done === true))  {
            return true; 
        }
        return false;
    }, [ Show, todo ]));

    const TypeTodo = () => {
        const optionsType = {method: 'GET', headers: {Accept: 'application/json'}};
        fetch('http://localhost:8080/api/todotypes', optionsType)
            .then(response => response.json())
            .then(data => setTodoTypes(data))
    };
    
    useEffect(() => TypeTodo(), []);

    const TheTodoType = () => {
        return(
        todoTypes.map(todoTypeFilter => {
            return <div>
                <div>
                    <Rating name="disabled" value={5} readOnly className="rating" />
                    <h3 className="High">{todoTypeFilter.name}</h3>
                    <TodoItems category={todoTypeFilter.name} todos={visibleTodos} editCallback={EditTodo} deleteCallback={deleteToDo} checkCallback={check} />
                </div>
        </div>         
        }))
    };

    const DarkMode = () => {
        if (theme === "light"){
            setTheme("dark")
            setColor("black")
            setImage("https://i.im.ge/2022/10/06/1HJtcK.nightversion-neutral-removebg-preview.png")

        }else  {
        setTheme("light"),  
        setColor("purple"), 
        setImage("https://i.im.ge/2022/10/05/1zm7BD.todocatneutral-removebg-preview-removebg-preview.png");}
    }

    useEffect(() => {
        document.body.className = theme;
    },[theme]);
  
    return(
    <div className={`form ${theme}`} >   
        
        <h1 className="textTodo"  >TodoList</h1>
        <h2>
            <Link href="http://127.0.0.1:5173/NewPage" underline="hover" className="Link" style={{color: color}}>
                Information
            </Link>
        </h2>

        <Avatar alt="Brenda Stoute" src="/static/images/avatar/1.jpg" className="avatar"/>

        <FormGroup>
            <FormControlLabel control={<SwitchNight  sx={{ m: 1 }} onClick={DarkMode}/>} label="Enable Darkmode" className="darkmode" />
        </FormGroup>

        <Box className="TimePicker">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale} >
                <Stack spacing={3} >
                    <ToggleButtonGroup value={locale} exclusive sx={{ mb: 2, display: 'block' }}>
                        {locales.map((localeItem)=>{
                            <ToggleButton key={localeItem} value={localeItem} onClick={() => selectLocale(localeItem)} >
                            </ToggleButton>
                        })}
                    </ToggleButtonGroup>
                    <DatePicker value={dateValue}  onChange={(newValue) => setDateValue(newValue)}
                    renderInput={(params) => <TextField {...params} className="timeColor"/>} >   
                    </DatePicker>
                </Stack>
            </LocalizationProvider>
        </Box>
            
        <div role="tabpanel">
            <Box  className="ShowSertainTodos">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleValue} textColor="secondary" indicatorColor="secondary" >
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
            <p className="textTodoAmount">amount of Todo's :</p>
            <p className="amountTodo">{todo.length}</p>
        </div>

        <Box> 
            <div className="todos-container">
                <TheTodoType/>
            </div>
        </Box>

        <img src={image} 
        alt="todocatneutral" border="0"  className="catmascot"/>
      
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
                <Button onClick={()=>{handleClose(),filterForDelete()}} autoFocus>
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
