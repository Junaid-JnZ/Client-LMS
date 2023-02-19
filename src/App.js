import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import NotFound from './components/NotFound/NotFound';
import Signup from './components/Sign-In_up/Signup'
import Login from  './components/Sign-In_up/Login'
import ProtectedRoutes from './protectedRoute'
import Admin from './components/Admin/Admin'
import User from './components/Users/User'
import { UserProvider } from './context/user-context';
function App() {
 
  const userAllowedMap = {
    1: ['/admin'],
    2: ['/librarian'],
    3: ['/user'],
  }
  
  return (
    // <UserProvider>
      <Router>
        <div className="App">
          <Navbar/>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Login/>}/>
              <Route exact path="/SignUp" element={<Signup/>}/>
              <Route exact path="/Login" element={<Login/>}/>
              <Route exact path="/Admin" element={<Admin/>}/>
              <Route exact path="/User" element={<User/>}/>
              <Route element = {<ProtectedRoutes/>}>
                <Route exact path="/Home" element={<Navbar/>}/>
              </Route>
              <Route path ="*" element = {<NotFound/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    // </UserProvider>

  )
}

export default App
// <NotFound/>
// <Navbar />