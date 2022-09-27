import TodoBox from "./TodoBox"

const TodoItems = ({category, todos, editCallback, deleteCallback, checkCallback}) => {
    return (   
        todos.filter((element) => element.category === category ).map((element, index) => {
            return (TodoBox(element,index, editCallback, deleteCallback, checkCallback))
        })
    )
}

export default TodoItems
