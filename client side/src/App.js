import React from "react";
import { Route, Routes } from "react-router";

import Login from "./pages/Login";
import Signup from './pages/Signup';
import Todo from './pages/Todo';

function App() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/todo" element={<Todo/>}></Route>
        </Routes>
    </>
  );
}

export default App;
