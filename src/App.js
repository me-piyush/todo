import "./App.css";
import Header from "./My components/Header";
import { Todos } from "./My components/Todos";
import { Footer } from "./My components/Footer";
import { AddTodo } from "./My components/AddTodo";
import { About } from "./My components/About";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const onDelete = (todo) => {
    setTodos((prevTodos) => prevTodos.filter((e) => e !== todo));
  };

  const addTodo = (title, desc) => {
    let sno;
    if (todos.length === 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos((prevTodos) => [...prevTodos, myTodo]);
    console.log(myTodo);
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storedTodos || []);
    setLoading(false); // Set loading to false after fetching data
  }, []);

  useEffect(() => {
    if (!loading) {
      // Save todos to local storage only after initial fetch
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, loading]);

  return (
    <>
      <Router>
        <Header title="My Todos List" searchBar={false} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <AddTodo addTodo={addTodo} />
                <Todos todos={todos} onDelete={onDelete} />
              </>
            }
          />
          <Route exact path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
