import { Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers"
import { useState } from "react"


export function TodoForm({ initialDate, onAdd }) {
    const [ dateValue, setDateValue ] = useState(initialDate);
    const [ description, setDescription ] = useState("");
    return <div>
        <DatePicker value={initialDate} onChange={setDateValue} />
        <input />
        <Button onClick={() => {
            if(onAdd) {
                onAdd({
                    id: Math.random() * 10000,
                    description: description
                })
            }
        }} />
    </div>
}



function TodoApp() {
    return <div>
        <TodoForm name="" ></TodoForm>
    </div>
}