import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Home() {
  // todo add form show
  const [show, setShow] = useState({
    type: "add",
  });

  // get todo state
  const [getTodo, setGetTodo] = useState([]);

  // Calling todo api
  useEffect(() => {
    axios
      .get("http://localhost:5050/api/todo", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setGetTodo(res.data))
      .catch((e) => console.log(e));
  }, []);

  // Update todo
  const handleUpdateTodo = (id) => {
    let alert = window.confirm("Are you sure?");
    if (alert === true) {
      axios.delete("http://localhost:5050/api/todo/" + id, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("sucess");
    } else {
      console.log("no");
    }
  };



// update todo state 
const [ update, setUpdate] = useState({
    title: "",
    todoEnd: new Date(),
})


  //   handle edit todo
  const handleEditTodo = () => {
    axios.get('http://localhost:5050/api/todo', {
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          }, 
    })
    .then( res => setUpdate(res.data[0]))
    .catch( e => console.log(e));
    setShow({ type: "edit"})

  };

  // input state
  const [input, setInput] = useState({
    title: "",
    todoEnd: new Date(),
  });

  // handle add todo
  const handleAddTodo = (e) => {
    if (input.title === "") {
      alert("Todo name is required");
    } else {
      axios
        .post("http://localhost:5050/api/todo", input, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) =>{
                setInput({
                    title: ""
                })
                alert("Todo add successfully");
        });
    }
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div
                className="card"
                id="list1"
                style={{ borderRadius: ".75rem", backgroundColor: " #eff1f2" }}
              >
                <div className="card-body py-4 px-4 px-md-5">
                  <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                    <i className="fas fa-check-square me-1"></i>
                    <u>My Todo list</u>
                  </p>

                  {show.type === "add" && (
                    <div className="pb-2">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex flex-row align-items-center">
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="exampleFormControlInput1" value={input.title}
                              onChange={(e) =>
                                setInput({ ...input, title: e.target.value })
                              }
                              placeholder="Add new..."
                            />
                            <a
                              href="#!"
                              data-mdb-toggle="tooltip"
                              title="Set due date"
                            >
                              <label htmlFor="date" className="me-2">
                                <DatePicker
                                  id="date"
                                  selected={input.todoEnd}
                                
                                  onChange={(date) =>
                                    setInput({ ...input, todoEnd: date })
                                  }
                                ></DatePicker>
                              </label>
                            </a>
                            <div>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAddTodo}
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {show.type === "edit" && (
                    <div className="pb-2">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex flex-row align-items-center">
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="exampleFormControlInput1" value={update.title}
                              onChange={(e) =>
                                setInput({ ...input, title: e.target.value })
                              }
                              placeholder="Add new..."
                            />
                            <a
                              href="#!"
                              data-mdb-toggle="tooltip"
                              title="Set due date"
                            >
                              <label htmlFor="date">
                                <i className="fas fa-calendar-alt fa-lg me-3 calendar"></i>
                                <DatePicker
                                  id="date"
                                  selected={input.todoTime}
                                  onChange={(date) =>
                                    setInput({ ...input, todoEnd: date })
                                  }
                                ></DatePicker>
                              </label>
                            </a>
                            <div>
                              <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={handleAddTodo}
                              >
                                Update todo
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <hr className="my-4" />

                  <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                    <p className="small mb-0 me-2 text-muted">Filter</p>
                    <select className="select form-select">
                      <option value="1">All</option>
                      <option value="2">Completed</option>
                      <option value="3">Active</option>
                      <option value="4">Has due date</option>
                    </select>
                    <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>
                    <select className="select form-select">
                      <option value="1">Added date</option>
                      <option value="2">Due date</option>
                    </select>
                    <a
                      href="#!"
                      style={{ color: "#23af89" }}
                      data-mdb-toggle="tooltip"
                      title="Ascending"
                    >
                      <i className="fas fa-sort-amount-down-alt ms-2"></i>
                    </a>
                  </div>

                  {getTodo.map((data, index) => (
                    <ul
                      key={index}
                      className="list-group list-group-horizontal rounded-0 bg-transparent"
                    >
                      <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                        <div className="form-check">
                          <input
                            className="form-check-input me-0"
                            type="checkbox"
                            value=""
                            //   checked
                          />
                        </div>
                      </li>
                      <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                        <p className="lead fw-normal mb-0"> {data.title} </p>
                      </li>

                      
                      <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                        <div className="d-flex flex-row justify-content-end mb-1">
                          <button
                            className="text-info btn btn-transparent"
                            onClick={handleEditTodo}
                          >
                            <i className="fas fa-pencil-alt me-3"></i>
                          </button>
                          <button
                            className="text-danger btn btn-transparent"
                            onClick={() => handleUpdateTodo(data._id)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                        <div className="text-end text-muted">
                          <a
                            href="#!"
                            className="text-muted"
                            data-mdb-toggle="tooltip"
                            title="Created date"
                          >
                            <p className="small mb-0">
                              <i className="fas fa-calendar-alt"></i>{" "}
                              {new Date(data.todoEnd).toDateString()}
                            </p>
                          </a>
                        </div>
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
