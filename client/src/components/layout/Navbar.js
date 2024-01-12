import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'

const NavbarMenu = () => {
	const {authState, logoutUser} = useContext(AuthContext)
    const username = authState.userData.data.username;
	return (
		<Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
			<Navbar.Brand className='font-weight-bolder text-white ms-3'>
				<img
					src={learnItLogo}
					alt='learnItLogo'
					width='32'
					height='32'
				/>
				LearnIt
			</Navbar.Brand>

			<Navbar.Toggle aria-controls='basic-navbar-nav' />

			<Navbar.Collapse id='basic-navbar-nav' className='me-3'>
				<Nav className='me-auto'>
					<Nav.Link
						className='font-weight-bolder text-white'
						to='/dashboard'
						as={Link}
					>
						Dashboard
					</Nav.Link>
				</Nav>

				<Nav>
					<Nav.Link className='font-weight-bolder text-white text-uppercase  me-2' disabled>
						{ `Welcome ${username}`} 
					</Nav.Link>
					<Button
						variant='secondary'
						className='font-weight-bolder text-white'
						onClick={logoutUser}
					>
						<img
							src={logoutIcon}
							alt='logoutIcon'
							width='32'
							height='32'
							className='me-2'
						/>
						Logout
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default NavbarMenu