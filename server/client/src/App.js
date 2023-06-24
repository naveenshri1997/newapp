import React, { createContext, useReducer } from 'react'
import "./App.css";
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Signup from './components/Signup'
import Logout from './components/Logout'
import Errorpage from './components/Errorpage';

import { initialState, reducer } from './reducer/UseReducer';
export const UserContext = createContext();
const Routhing = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} >
      </Route>
      <Route path='/about' element={<About />} >
      </Route>
      <Route path='/contact' element={<Contact />} >
      </Route>
      <Route path='/login' element={<Login />} >
      </Route>
      <Route path='/signup' element={<Signup />} >
      </Route>
      <Route path='/logout' element={<Logout />} >
      </Route>
      <Route path="*" element={<Errorpage />} >
      </Route>

    </Routes>
  )
}
const App = () => {
  const [state, dispatch] = useReducer(reducer,initialState)
  return (
    <>
      <UserContext.Provider value={{state,dispatch}}>
        <Navbar />
        <Routhing />
      </UserContext.Provider>
    </>
  )
}

export default App;