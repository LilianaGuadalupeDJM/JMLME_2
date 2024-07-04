import {  ConfigProvider } from 'antd'
import './App.css'
import LayoutComponent from './components/Layout/index.jsx'
import { DatePicker, Button } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/'
import { AuthProvider } from './context/AuthContext.jsx'




function App() {

  return (
    <AuthProvider>
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#7A83E1'
      }
    }}
    >
      
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>  
    </ConfigProvider>
    </AuthProvider>
  )
}

export default App
