import { Fragment, useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'


import Alert from 'react-bootstrap/Alert'
const LoginForm = () => {
    const {loginUser} = useContext(AuthContext);

    const initAlertState = {
        info: false,
        type: '',
        message: ''
    }
    const [alert, setAlert] = useState(initAlertState)
    
    // Take formData state
    const [usernameForm, setUserLoginForm] = useState('')
    const [passwordForm, setPasswordLoginForm] = useState('')

    const onChangeUserForm = (event) => {
        setUserLoginForm(event.target.value)
    }
    const onChangePasswordForm = (event) => {
        setPasswordLoginForm(event.target.value)
    }
    const loginForm = {
        username: usernameForm,
        password: passwordForm
    }
    
    const login = async (event) => {
        event.preventDefault();
        try {
            let loginData = await loginUser(loginForm)
            console.log(loginData)
            if(!loginData.success){
                setAlert({
                    info: true,
                    type: "danger",
                    message: loginData.message
                })
                setTimeout(() => {setAlert(initAlertState)},3000)
            }
            console.log(loginData)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <Fragment>
            {alert.info ? <Alert variant={alert.type}>{alert.message}</Alert> : null }
            <Form className='mb-3' onSubmit={login}>
            <Form.Group className='mb-3 mt-5' >
                <Form.Control type="text" placeholder='Username' name='username' value={login.username}  onChange={onChangeUserForm} required/>
            </Form.Group>
            <Form.Group>
                <Form.Control type='password' placeholder='Password' name='password' value={loginForm.password} onChange={onChangePasswordForm} required/>
            </Form.Group>
            <Button variant='info' type='submit' size='sm' className='.bg-info mt-3 px-4'>Login</Button>
        </Form> 
        <p>
            Don't have an account?   
            <Link to="/register">
                <Button variant='info' size='sm' className='ml-4'>
                    Register
                </Button>
            </Link>
        </p>
        </Fragment>
    )
}
export default LoginForm;