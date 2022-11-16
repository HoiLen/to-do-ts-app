import React, { useEffect, useState } from 'react'
import axios from 'axios';

const ToDoList = () => {

    const [completeList, setCompleteList] = useState([]);
    const [list,setList] = useState([]);
    const [todo,setTodo] = useState("");

    const handlePush = () => {
        if (todo !== "") {

            //setList(list.concat([todo]));
            axios
            .post("http://localhost:3000/api/tasks",{
                name: todo,
            })
            .then(() => {
                handleGetList()
            });

            setTodo("");
        }
    };
    const handleComplete = (index) => {
        // setCompleteList(completeList.concat(list[index]))
        // //index番目の要素だけ取り出したlistに更新する
        // setList(list.slice(0,index).concat(list.slice(index + 1)))
        axios
        .put(`http://localhost:3000/api/tasks/` + list[index].id)
        .then(() => {
			handleGetList()
		})
    }

    const handleDelete = (index) => {
        axios
        .delete(`http://localhost:3000/api/tasks/` + completeList[index].id)
        .then(() => {
            handleGetList()
        })
    }

    const handleGetList = () => {
        axios
        .get("http://localhost:3000/api/tasks")
        .then((res) => {
            let tmpCompletedList = []
            let tmpList = []
            for (let i=0; i<res.data.length; i++){
                if(res.data[i].finished){
                    tmpCompletedList = tmpCompletedList.concat([
                        {
                            id: res.data[i].id,
                            name: res.data[i].name,
                        },
                    ])
                } else {
                    tmpList = tmpList.concat([
                        {
                            id: res.data[i].id,
                            name: res.data[i].name,
                        },
                    ])
                }
            }

            setCompleteList(tmpCompletedList)
            setList(tmpList)
        })
    };

    useEffect(() => {handleGetList()}, []);

  return (
    <div>
        <h1>ToDoList</h1>
        <input 
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={handlePush}>Add</button>
        <h2>Tasks List</h2>
        <h3>Completes</h3>
        <ul>
            {completeList.map((completeTodo,index) => (
                <li key={completeTodo.id}>
                    {completeTodo.name}
                    <button onClick={() => handleDelete(index)}>
                        Delete
                    </button>
                </li>
            ))}
        </ul>
        <h3>Tasks</h3>
        <ul>
            {list.map((todo,index)=>(
                <li key={todo.id}>
                    {todo.name}
                    <button onClick={() => handleComplete(index)}>Complete</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ToDoList