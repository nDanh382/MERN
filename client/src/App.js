import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Landing from './components/layout/Landing'
import Auth from './views/Auth';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import AuthContextProvider from './Contexts/AuthContext'
import Dashboard from './views/Dashboard';
import ProtectedRoute from './components/routing/ProtectedRoute';
import PostsProvider from './Contexts/PostsContext';
function App() {
 
  return (
  
    <AuthContextProvider>
      <PostsProvider>
        <Router>
          <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route element={<Auth/>}>
            <Route path='/login' element={<LoginForm/>}/>
            <Route path='/register' element={<RegisterForm/>}/>
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path='/dashboard' element={<Dashboard/>} />
          </Route>
      </Routes>
        </Router>
      </PostsProvider>
    </AuthContextProvider>
  )
}

export default App;
