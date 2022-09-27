import React from "react";
import { Box } from "@mui/system"
import Checkbox from '@mui/material/Checkbox';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { EditText } from "react-edit-text";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  


const TodoBox = (element, index, editCallback, deleteCallback, checkCallback) => {     
    return(
        
        <h2 key={index}>
            <Box >
                <Item className="todo-item">
                    <th>{element.category}</th>
                    <Checkbox color="success" placeholder="check" className="check" checked={element.Checked} onChange={(e, val) => checkCallback(val, element.id)} />    
                        <div className={`todo-name ${element.Checked ? "checked" : ""}`}>
                            <p>{element.date}</p>
                            <EditText name={element.id} defaultValue={element.name} type="text" onSave={editCallback} className="EditText"> </EditText>
                        </div>
                        <IconButton aria-label="delete" size="medium" className="newDelete">
                            <DeleteIcon fontSize="inherit" onClick={() => deleteCallback(element.id)} />
                        </IconButton>
                </Item>
            </Box>
        </h2>        
    )
}

export default TodoBox