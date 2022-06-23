import {useEffect,useState} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {BiLogOut} from 'react-icons/bi'
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'

export default function Header(){
  	const [User,setUser] = useState("")
	const cookies = new Cookies();
	const router = useRouter()
	useEffect(()=>{
		setUser(cookies.get('user'))
	},[])

	const handleSignOut = ()=>{
		cookies.remove("token", { path: '/' })
		cookies.remove("user", { path: '/' })
		cookies.remove("role", { path: '/' })
		router.push('/login')
	}
	return(
		<div>
			<Navbar className="bg-white" expand="lg" fixed="top" sticky="top">
		      	<Container>
		        	<Navbar.Brand href="#home">
		        		<img src="./images/logo.png" className="rounded float-start NavbarImage" alt="..." />
		        	</Navbar.Brand>
		        	<Navbar.Toggle aria-controls="basic-navbar-nav" />
		        	<Navbar.Collapse id="basic-navbar-nav">
			          	<Nav className="me-auto">
			            	<Nav.Link href="/patients">Patient</Nav.Link>
			            	
			          	</Nav>

			          	<Nav>
				            <InputGroup>
						        <DropdownButton
						          variant="outline-secondary"
						          title="Yafet"
						          id="input-group-dropdown-2"
						          align="end"
						          variant="primary"
						          className="text-lg-start text-uppercase w-25 "
						        >
						        	<Dropdown.Item href="#" className="d-flex justify-content-between align-items-center">
						        		<img 
						        			src="https://i.kinja-img.com/gawker-media/image/upload/gd8ljenaeahpn0wslmlz.jpg" 
						        			width="50px"
						        			height="50px"
						        			className="rounded-circle" 
						        			alt="..."
						        		/>

						        		Yafet
						        	</Dropdown.Item>
						        	<Dropdown.Divider />
						        	<Dropdown.Item href="#" onClick={handleSignOut} className="d-flex justify-content-between align-items-center">
						        		<BiLogOut />
						        		Logout
						        	</Dropdown.Item>
        						</DropdownButton>
      						</InputGroup>
				        </Nav>
		        	</Navbar.Collapse>
		      </Container>
    		</Navbar>
		</div>
	)
}
