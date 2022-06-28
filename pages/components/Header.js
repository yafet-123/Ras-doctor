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
import Image from "next/image"
export default function Header(){
  	const [User,setUser] = useState("")
	const cookies = new Cookies();
	const router = useRouter()
	
	const handleSignOut = ()=>{
		cookies.remove("token", { path: '/' })
		cookies.remove("user", { path: '/' })
		cookies.remove("role", { path: '/' })
		router.push('/login')
	}
	return(
		<div>
			<Navbar expand="lg" fixed="top" sticky="top">
		      	<Container>
		        	<Navbar.Brand href="#home">
		        		<Image
        					alt="Mountains"
        					src="/images/logo.png"
        					width = {50}
        					height={50}
        					className="rounded float-start NavbarImage"
        					quality={100}
      					/>
		        	</Navbar.Brand>
		        	<Navbar.Toggle aria-controls="basic-navbar-nav" />
		        	<Navbar.Collapse id="basic-navbar-nav">
			          	<Nav className="me-auto">
			            	<Nav.Link href="/patients">Patient</Nav.Link>
			            	
			          	</Nav>

			          	<Nav>
				            <InputGroup>
						        <DropdownButton
						          title="Yafet"
						          id="input-group-dropdown-2"
						          align="end"
						          variant="primary"
						          className="text-lg-start text-uppercase w-25 "
						        >
						        	<Dropdown.Item href="#" className="d-flex justify-content-between align-items-center">
						        		
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
