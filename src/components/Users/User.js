import React from 'react'
import '../Admin/admin.css'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const User = () => {
    const [page,setPage] = useState([])
    const [logoutBtn,setLogoutBtn] = useState(false)
    const [temp, setTemp] = useState([]);
    const [isAdmin, setisAdmin] = useState(false);
    const [token, setToken] = useState();
    const [BookList, setBookList] = useState([]);
    const [tempBookList, setTempBookList] = useState([]);
    const [user, setUser] = useState();
    const [searchStatus, setSearchStatus] = useState(false);
    const [find, setFind] = useState({
      search: "",
    });

    const navigate = useNavigate();

    async function search(evt) {
        const value = evt.target.value;
        console.log(value);
        if (value) {
          setSearchStatus(true);
          let result = axios.get("http://localhost:3000/Books/:ISBN")
          .then((res) => {
              if(result){
                console.log(result)
                setTempBookList(result.data.data)
              }else{
                setTempBookList("");
              }
            })
            .catch((err) => {
              console.log(err);
            });
          setFind({
            ...find,
            [evt.target.name]: value,
          });
        }else{
          setSearchStatus(false)
        }
    }

    const findBooks = (e)=>{
        let result = axios.get("http://localhost:3000/Books/all/1/6")
        .then((res)=>{
            setBookList(result.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    const removeBook=(e)=>{
        let result = axios.delete("http://localhost:3000/Books/:ISBN",(e,user))
        .then((res)=>{
            window.alert(result.data.message);
            window.location.reload();
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    const handleChange =(e)=>{
        let value = e.target.value
        setTemp({
            ...temp,
            [e.target.value]:value
        })
    }

    // const UserData = ()=>{
    //     let result = axios.get("http://localhost:3000/Users/all/:pageNumber/:limit")
    //     .then(res =>{
    //         setUsers(result)
    //         setPage(1)
    //     })
    //     .catch(err =>{
    //         console.log(err)
    //         res.status(401)
    //     })
    // }

    // async function isUser() {
    //     if (localStorage.getItem("user")) {
    //       const id = localStorage.getItem("user");
    //       console.log('asdasdsadasdsad')
    //       let result = axios.get("http://localhost:3000/Users/currentUser")
    //         .then((res) => {
    //           console.log(result)
    //           console.log(result.data)
    //           console.log(res.data)
    //           if (result.data === "admin") {
    //             setisAdmin(true);
    //             setLogoutBtn(true);
    //             setToken(id);
    //             findBooks();
    //           } else if (result.data === true) {
    //             setUser(true);
    //             setLogoutBtn(true);
    //             findBooks();
    //           } else {
    //             console.log("Hello  User")
    //             // navigate("/Login");
    //           }
    //         })
    //         .catch((err) => {
    //           console.log(result);
    //           console.log(err);
    //           console.log("hey")
    //           // navigate("/Login");
    //         });
    //     } else {
    //       console.log("hi")
    //       // navigate("/Login");
    //     }
    // } 

    async function logOut() {
        localStorage.removeItem("user");
        window.location.reload();
    }
    // useEffect(() => {
    //     isUser();
    //   }, []);
    

    return (
        <>
        {/* Main Div */}
        <div className="container mt-5">
          <div className="row">
            {/* Logout Button */}
            <div className="col-12">
              {logoutBtn && (
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    logOut();
                  }}
                >
                  Log Out
                </button>
              )}
            </div>
            {/* Add New Book Form */}
            {isAdmin && (
              <div className="col-6">
                <h1 className="form-label">Add New Book</h1>
                <input
                  className="form-control mt-2"
                  id="title"
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={temp.title}
                  onChange={handleChange}
                />
                <input
                  id="author"
                  className="form-control mt-2"
                  type="text"
                  placeholder="Author"
                  name="author"
                  value={temp.author}
                  onChange={handleChange}
                />
                <input
                  id="price"
                  className="form-control mt-2"
                  type="text"
                  placeholder="Price"
                  name="price"
                  value={temp.price}
                  onChange={handleChange}
                />
                <input
                  id="quantity"
                  className="form-control mt-2"
                  type="number"
                  placeholder="Quantity"
                  name="quantity"
                  value={temp.number}
                  onChange={handleChange}
                />
                {token && (
                  <button
                    className="btn btn-primary mt-3"
                    onClick={(e) => handleChange(e)}
                  >
                    Add Book
                  </button>
                )}
              </div>
            )}
            {/* Search Bar */}
            <div className="col-12 m-2">
              <input
                className="form-control"
                name="search"
                placeholder="Search"
                // value={find.search}
                onChange={(e) => {
                  search(e);
                }}
              />
            </div>
            {/* Display All books in Table */}
            {!searchStatus && (
              <div className="col-12">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="col">Title</th>
                      <th className="col">Author</th>
                      <th className="col">Price</th>
                      <th className="col">Quantity</th>
                      {user && <th className="col">Add to Cart</th>}
                      {isAdmin && <th className="col">Edit</th>}
                      {isAdmin && <th className="col">Delete</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {BookList.map((books) => (
                      <tr key={books._id}>
                        <td className="col">{books.title}</td>
                        <td className="col">{books.author}</td>
                        <td className="col">{books.price}</td>
                        <td className="col">{books.quantity}</td>
                        {isAdmin && (
                          <td className="col">
                            <button className="btn btn-primary">+</button>
                          </td>
                        )}
                        {isAdmin && (
                          <td className="col">
                            <button
                              className="btn btn-danger"
                              onClick={(e) => removeBook(books._id)}
                            >
                              X
                            </button>
                          </td>
                        )}
                        {user && (
                          <td className="col">
                            <button className="btn btn-primary">+</button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {searchStatus && (
              <div className="col-12">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="col">Title</th>
                      <th className="col">Author</th>
                      <th className="col">Price</th>
                      <th className="col">Quantity</th>
                      {user && <th className="col">Add to Cart</th>}
                      {isAdmin && <th className="col">Edit</th>}
                      {isAdmin && <th className="col">Delete</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {tempBookList.map((books) => (
                      <tr key={books._id}>
                        <td className="col">{books.title}</td>
                        <td className="col">{books.author}</td>
                        <td className="col">{books.price}</td>
                        <td className="col">{books.quantity}</td>
                        {isAdmin && (
                          <td className="col">
                            <button className="btn btn-primary">+</button>
                          </td>
                        )}
                        {isAdmin && (
                          <td className="col">
                            <button
                              className="btn btn-danger"
                              onClick={(e) => removeBook(books._id)}
                            >
                              X
                            </button>
                          </td>
                        )}
                        {user && (
                          <td className="col">
                            <button className="btn btn-primary">+</button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </>
    )
}

export default User
