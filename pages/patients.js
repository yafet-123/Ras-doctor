import Pagination from 'react-bootstrap/Pagination';
import { useState,useEffect, useContext} from 'react'
import Header from './components/Header'
import Image from 'next/image'
import axios from "axios";
import Link from "next/link";
import {AiOutlineArrowRight} from 'react-icons/ai';
import {AiOutlineDown} from 'react-icons/ai'
import {AiOutlineSearch} from 'react-icons/ai'
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import moment from 'moment';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import {AiOutlineEye} from 'react-icons/ai';

export async function getServerSideProps({req}) {
	const accesstoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOjIsInVzZXIiOiJ5YWZldCIsImlhdCI6MTY1NTczNzM4NCwiZXhwIjoxNjU4MzI5Mzg0fQ.iyFfCyhkgsTq1vUx2q9ZYYB6hhg13glBPjHQScPQfWg"
	const apiURL = "https://hmsapiserver.herokuapp.com/api/v1"
	const authaxios = axios.create({
		baseURL : apiURL,
		headers :{
			Authorization : `Bearer ${accesstoken} `
		}
	})
	const data = await authaxios.get(`${apiURL}/patient/`)
  	return {
    	props: {
    		Allpatients:data.data,
    	}, // will be passed to the page component as props
  	}
}

export default function DisplayPatient({Allpatients}) {
	console.log(Allpatients)
	const router = useRouter();
	const [patients,setpatients] = useState(Allpatients)
	const [searchValue, setsearchValue] = useState('')
	const [searchParameter, setsearchParameter] = useState(1)
	const [placeholder,setPlaceholder] = useState("")	
	const pageNumbers = []
	const totalPatient = patients.length
	const [loading,setloading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1);
	const [postperpage, setpostperpage] = useState(15);
	const indexofLastPost = currentPage * postperpage
	const indexofFirstpost = indexofLastPost - postperpage
	const currentposts = patients.slice(indexofFirstpost,indexofLastPost)
	const [pageNumberLimit, setpageNumberLimit] = useState(5);
	const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
	const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
	const [getSearchValue,setgetSearchValue] = useState("")
	const cookies = new Cookies();

	const paginate = (num) => setCurrentPage(num)
	let items = [];
	for(let number = 1; number <= 5; number++) {
  		items.push(
    		<Pagination.Item key={number} onClick={()=> paginate(number)} >
      			{number}
    		</Pagination.Item>,
  		);
	}

	const handleSearch = async (e)=>{
		const accesstoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOjIsInVzZXIiOiJ5YWZldCIsImlhdCI6MTY1NDk2MTA1OSwiZXhwIjoxNjU3NTUzMDU5fQ.R7RiM9OF1XeVW-uba7rIuHT1K9JEp5R-BFTtEW4bgD4"
		const apiURL = "https://hmsapiserver.herokuapp.com/api/v1"
		const authaxios = axios.create({
			baseURL : apiURL,
			headers :{
				Authorization : `Bearer ${accesstoken} `
			}
		})
		const oneData = await authaxios.post(`${apiURL}/search/`,{
			"searchName": getSearchValue,
   	 		"type": e
		})

		const objOneData = oneData.data
		console.log(objOneData)
		if(Array.isArray(objOneData)){
			setpatients(objOneData)
		}else{
			const patient = []
			patient.push(objOneData)
			setpatients(patient)
			console.log(patient)
		}
	
	}
	return(
		<div className="">
			<Header />
			<div className="bg-light ">
				<div className="container">
				    <div className="">
				    	<InputGroup className="p-3">
					        <Form.Control
					        	placeholder="Search"
					          	aria-label="Search"
					          	aria-describedby="basic-addon1"
					          	className="w-25"
					          	valiue={getSearchValue}
								onChange={(e) => setgetSearchValue(e.target.value)}
					        />

					        <DropdownButton
						          variant="outline-secondary"
						          title="Search"
						          id="input-group-dropdown-2"
						          align="end"
						          variant="primary"
						          className="text-lg-start text-uppercase"
						        >
						        	<Dropdown.Item onClick={()=> handleSearch(1)}>
						        		By MRN
						        	</Dropdown.Item>

						        	<Dropdown.Item onClick={()=> handleSearch(2)}>
						        		By Name
						        	</Dropdown.Item>

						        	<Dropdown.Item onClick={()=> handleSearch(3)}>
						        		By PhoneNumber
						        	</Dropdown.Item>

						        	<Dropdown.Item onClick={()=> handleSearch(4)}>
						        		By PreviousMRN
						        	</Dropdown.Item>
        						</DropdownButton>
					    </InputGroup>
				        <div id="no-more-tables">
				            <table className="table table-borderless col-md-12 cf">
				        		<thead className="cf bg-white">
				        			<tr>
				        				<th scope="col">MRN</th>
				        				<th scope="col">Full Name</th>
				        				<th scope="col">Gender</th>
				        				<th scope="col">Age</th>
				        				<th scope="col">Phone Number</th>
				        				<th scope="col">Regestration Date</th>
				        				<th scope="col">Created By</th>
				        				<th scope="col"></th>
				        			</tr>
				        		</thead>
				        		<tbody>
				        			{currentposts.map((data,index)=>(
					        			<tr key={index} className="bg-white p-3">
					        				<td data-title="MRN" scope="row" >{data.MRN}</td>
					        				<td data-title="Full Name" >{data.Name}</td>
					        				<td data-title="Gender" >{data.Gender}</td>
					        				<td data-title="Age" >{data.DateOfBirth}</td>
					        				<td data-title="Phone Number" >{data.PhoneNumber}</td>
					        				<td data-title="Regestration Date" >{moment(data.RegistrationDate).utc().format('YYYY-MM-DD')}</td>
					        				<td data-title="Created By" >{data.CreatedBy}</td>
					        				<td>
					        					<Link
													href={{
							            				pathname: `/patient/${encodeURIComponent(data.MRN)}`,
							            				query:86,
							        				}}
												>	
													<a  
														className="btn btn-info"
													><AiOutlineEye /></a>
												</Link>
											</td>
					        			</tr>
				        			))}
				        		</tbody>
				        	</table>

				        	<Pagination>
				        		<Pagination.First />
						      	<Pagination.Prev />
						      	<Pagination>{items}</Pagination>
						      	<Pagination.Next />
						      	<Pagination.Last />
						    </Pagination>
				        </div>
				    </div>
				</div>
			</div>
		</div>
	)
}