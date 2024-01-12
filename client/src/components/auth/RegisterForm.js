import { Fragment, useContext} from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import Alert from "react-bootstrap/Alert"

const RegisterForm = () => {
    const navigate = useNavigate();

    const {registerUser} = useContext(AuthContext)


    const [userForm, setUserForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })
    const {username, password, confirmPassword} = userForm;
    console.log({
        password,
        confirmPassword
    })
    const initAlertState = {
        info: false,
        type: '',
        message: ''
    }
    const [alert, setAlert] = useState(initAlertState);

    const onChangeRegisterForm = (event) => {
        setUserForm({
            ...userForm,
            [event.target.name]: event.target.value
        })
    }

    const register = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            setAlert({
                info: true,
                type: "danger",
                message: "Nhập lại mật khẩu"
            })
            setTimeout(() => setAlert(initAlertState), 4000)
            return 
        } else {
        try {
            let registerData = await registerUser({
                username: username,
                password: password
            })
            console.log(registerData)
            
            if(!registerData.success){
                setAlert({
                    info: true,
                    type: "danger",
                    message: registerData.message
                })
                setTimeout(() => {setAlert(initAlertState)},3000)
            }
            console.log(registerData)
        } catch (error) {
            console.log(error)
        }
        }
        
    }

    return (
        <Fragment>
        {alert.info ? <Alert variant={alert.type}>{alert.message}</Alert> : null}
        <Form className='mb-3'>
        <Form.Group className='mb-3 mt-5' >
            <Form.Control type="text" placeholder='Username' name='username' value={username} onChange={onChangeRegisterForm} required/>
        </Form.Group>
        <Form.Group>
            <Form.Control type='password' placeholder='Password' name='password' value={password} onChange={onChangeRegisterForm} required/>
        </Form.Group>
        <Form.Group className='mt-3'>
            <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} name='confirmPassword' onChange={onChangeRegisterForm} required/>
        </Form.Group>
        <Button variant='info' type='submit' size='sm' className='.bg-info mt-3 px-4' onClick={register}>Register</Button>
    </Form> 
    <p>
        Already have an account?  
        <Link to="/login">
            <Button variant='info' size='sm' className='ml-4'>
                Login
            </Button>
        </Link>
    </p>
    </Fragment>
    )
}
export default RegisterForm