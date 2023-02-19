import React from 'react'
import './admin.css'
import User from '../Users/User'

// import Axios  from 'axios'
import TablePagination from '@mui/material/TablePagination';
import { useState,useEffect,useRef } from 'react'
import { useUser } from "../../context/user-context";
import { useNavigate } from 'react-router-dom';

const Admin = () => {

    const [users,setUsers] = useState([])
    const [books,setBooks] = useState([])
    const [userPage,setUserPage] = useState(0)
    const [bookPage,setBookPage] = useState(0)
    const [userRowsPerPage,setUserRowsPerPage] = useState(2)
    const [bookRowsPerPage,setBookRowsPerPage] = useState(2)
    const {user,isAdmin,logoutUser} = useUser()
    const navigate = useNavigate();
    
    const handleLogout =(email,password)=>{
        logoutUser()
      }

    const getUsers = async()=>{
        let result = await fetch("http://localhost:3000/Users/all/:pageNumber/:limit",{
          method: 'get',
        //   body: JSON.stringify({name,email,password}),
          headers:{
            'Content-Type': ' application/json'
          }
        })
        result = await result.json();
        console.log(result.users)
        setUsers(result.users)
        localStorage.setItem('user',JSON.stringify(result))
    }
    const getBooks = async()=>{
        let link = `http://localhost:3000/Books/all`
        let result = await fetch(link)
        console.log(result)
        result = await result.json();
        console.log(result.books)
        setBooks(result.books)
        localStorage.setItem('user',JSON.stringify(result))
    }

    useEffect(() => {
        getBooks();
    }, []);
    useEffect(() => {
        getUsers();
    }, []);

    // useEffect(() => {
    //     if (!user) {
    //         navigate("/")
    //     } else if (isAdmin) {
    //         // navigate("/admin/books/add")
    //         console.log("qwerty")
    //     }else {
    //         console.log("user is guest")
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [user, isAdmin])
    
      const handleUserChangeRowsPerPage = (e) => {
        setUserRowsPerPage(e.target.value);
        setUserPage(0);
      };
    
      const handleBookChangeRowsPerPage = (e) => {
        setBookRowsPerPage(e.target.value);
        setBookPage(0);
      };

  return (
    <>
    {isAdmin ? <div className="container">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
            {(userRowsPerPage>0
                ? users.slice(userPage * userRowsPerPage, userPage * userRowsPerPage+ userRowsPerPage):users
            ).map((item)=>{
                return <>
                <tr>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                </tr>
                </>
            })}
            </tbody>
        </table>
        <TablePagination
        rowsPerPageOptions={[2, 5, 10]}
        component="div"
        count={books.length}
        rowsPerPage={userRowsPerPage}
        page={userPage}
        onPageChange={(e,newPage)=>setUserPage(newPage)}
        onRowsPerPageChange={handleUserChangeRowsPerPage}
      />
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>ISBN</th>
                    <th>Author</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
            {(bookRowsPerPage>0
                ? books.slice(bookPage * bookRowsPerPage, bookPage * bookRowsPerPage+ bookRowsPerPage):books
            ).map((item)=>{
                return <>
                <tr>
                    <td>{item._id}</td>
                    <td>{item.title}</td>
                    <td>{item.ISBN}</td>
                    <td>{item.author}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                </tr>
                </>
            })}
            </tbody>
        </table>
        <TablePagination
        rowsPerPageOptions={[2, 5, 10]}
        component="div"
        count={books.length}
        rowsPerPage={bookRowsPerPage}
        page={bookPage}
        onPageChange={(e,newPage)=>setBookPage(newPage)}
        onRowsPerPageChange={handleBookChangeRowsPerPage}
      />
    </div>:<User/>}
  
      </>
    )}

export default Admin



// const getAuthors = async()=>{
    //     let result = await fetch("http://localhost:3000/Authors/all/:pageNumber/:limit")
    //     result = await result.json();
    //     console.log(result.Authors)
    //     setAuthors(result.Authors)
    //     localStorage.setItem('user',JSON.stringify(result))
    // }
    // useEffect(() => {
    //     getAuthors();
    //   }, []);