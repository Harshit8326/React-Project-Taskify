import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import "./App.css";
import { v4 as uuidv4 } from 'uuid';
import { LiaEdit } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";

function App() {
  const [count, setCount] = useState(0);
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todosString = localStorage.getItem("todos");
    if (todosString) {
      let todos = JSON.parse(todosString);
      settodos(todos);
    }
  }, []);

  const saveToLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const HandelAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    settodos(newTodos);
    settodo("");
    saveToLS(newTodos);
  };

  const HandelEdit = (e, id) => {
    let uptodo = todos.filter(item => item.id === id);
    settodo(uptodo[0].todo);
    let newTodos = todos.filter(item => item.id !== id);
    settodos(newTodos);
    saveToLS(newTodos);
  };

  const HandelDelete = (id) => {
    let newTodos = todos.filter(item => item.id !== id);
    settodos(newTodos);
    saveToLS(newTodos);
  };

  const HandelChange = (e) => {
    settodo(e.target.value);
  };

  const HandelCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
    saveToLS(newTodos);
  };

  const ToggleFinished=(e)=>{
    setshowFinished(!showFinished)
  }

  return (
    <>
      <Navbar />
      <div className="outerBox">
      <center> <h1 className="YourToDo">Manage your Tasks at one place</h1></center>
        <div className="addToDo">
        <center><h1 className="YourToDo">Add a To-Do </h1></center>
          <input className="inputAdd" onChange={HandelChange} type="text" value={todo} />{" "}<br></br>
          <button className="AddToDoBtn moreAdd" onClick={HandelAdd} disabled={todo.length<=1}>
            Save
          </button>
        </div>
        <center><h1 className="YourToDo">Your To-Do List</h1></center>
        <input type="checkbox" checked={showFinished} onChange={ToggleFinished}/> Show Finished
        <div className="list">
          {todos.length === 0 && <div className="noToDo">No To-Do's to Display</div>}
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) &&(
              <div key={item.id} className="todo">
                <div className={item.isCompleted ? "line-through" : ""} id="todoItem">
                  <input id="checkbox"
                    name={item.id}
                    type="checkbox"
                    onChange={HandelCheckbox}
                    checked={item.isCompleted}
                  />
                  {item.todo}
                </div>
                <div className="btns">
                  <button className="AddToDoBtn" onClick={(e) => HandelEdit(e, item.id)}>
                  <LiaEdit />
                  </button>
                  <button
                    className="AddToDoBtn"
                    onClick={() => HandelDelete(item.id)}
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
