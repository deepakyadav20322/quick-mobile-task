import React from 'react'
import { Route, Routes } from 'react-router'
import Login from './components/LoginPage'
import SellPage from './components/SellPage'
import AdminPage from './components/AdminPage'
import ProtectedLayout from './components/Protected'

function App() {


  return (
   <>
   <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<SellPage />} />
    <Route
            path="/admin"
            element={
              <ProtectedLayout>
                <AdminPage />
              </ProtectedLayout>
            }
          />
   </Routes>
   </>
  )
}

export default App
