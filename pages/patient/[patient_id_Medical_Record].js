import Header from '../components/Header'
import {AiOutlineRight} from 'react-icons/ai'
import Link from 'next/link'
import { useRouter } from "next/router";
import axios from "axios";
import {useEffect,useState } from 'react'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import AddMedicalRecord from '../components/addMedicalRecord'
import MedicalCertificate from '../components/MedicalCertificate'
import Prescription from '../components/prescription'

export async function getServerSideProps(context) {
	const {params,req,res,query} = context
	const {patient_id_Medical_Record} = params
	const accesstoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOjIsInVzZXIiOiJ5YWZldCIsImlhdCI6MTY1NDk2MTA1OSwiZXhwIjoxNjU3NTUzMDU5fQ.R7RiM9OF1XeVW-uba7rIuHT1K9JEp5R-BFTtEW4bgD4"
	const apiURL = "https://hmsapiserver.herokuapp.com/api/v1"
	const authaxios = axios.create({
		baseURL : apiURL,
		headers :{
			Authorization : `Bearer ${accesstoken} `
		}
	})
	const data = await authaxios.get(`${apiURL}/docdashboard/${patient_id_Medical_Record}`)
  	return {
    	props: {
	    	patient:data.data,
	    }, // will be passed to the page component as props
	}
}

export default function IndividualPatient({patient}){
	console.log(patient)
	const patientMedicalRecord = patient['all']
	const ptientMRN = patient['info'].MRN
	return(
		<div className="w-100">
			<Header/>
			<Tab.Container id="left-tabs-example" defaultActiveKey="first">
	      		<Row>
			        <Col sm={2}>
			          <Nav variant="pills" className="flex-column ">
			            <Nav.Item>
			              <Nav.Link eventKey="first">Display Medical Record</Nav.Link>
			            </Nav.Item>
			            <Nav.Item>
			              <Nav.Link eventKey="second">Add Medical Record</Nav.Link>
			            </Nav.Item>
			            <Nav.Item>
			              <Nav.Link eventKey="third">Write Prescription</Nav.Link>
			            </Nav.Item>
			            <Nav.Item>
			              <Nav.Link eventKey="fourth">Write sick leave</Nav.Link>
			            </Nav.Item>
			          </Nav>
			        </Col>
			        <Col sm={10}>
			          <Tab.Content>
			            <Tab.Pane eventKey="first">
			            	<Container >
								<div className="bg-white border my-3 rounded">
									<Row className="p-3">
										<Col md={4} className="text-center">
											<p>MRN</p>
											<p>{patient['info'].MRN}</p>
										</Col>

										<Col md={4} className="text-center">
											<p>Name</p>
											<p>{patient['info'].Name}</p>
										</Col>

										<Col md={4} className="text-center">
											<p>Age</p>
											<p>{patient['info'].DateOfBirth}</p>
										</Col>

									</Row>

									<Row className="p-3">

										<Col md={4} className="text-center">
											<p>Gender</p>
											<p>{patient['info'].Gender}</p>
										</Col>

										<Col md={4} className="text-center">
											<p>Phone Number</p>
											<p>{patient['info'].PhoneNumber}</p>
										</Col>

										<Col md={4} className="text-center">
											<p>Occupation</p>
											<p>{patient['info'].Occupation}</p>
										</Col>
									</Row>
								</div>
								{patientMedicalRecord.map((data,index)=>(
									<div key={index} className="bg-white border my-3 rounded">
										<Row className="p-3">
											<Col md={4} >
												<h5>Created By</h5>
												<p>{data.CreatedBy}</p>
											</Col>
											<Col md={4}>
												<h5>Created Date</h5>
												<p>{data.CreatedDate}</p>
											</Col>

											<Col md={4}>
												<h5>Clinic</h5>
												<p>{data.Clinic}</p>
											</Col>
										</Row>

										<Row className="p-3">
											<Col md={12}>
												<h5>History</h5>
												<p>{data.History}</p>
											</Col>
										</Row>

										<Row className="p-3">
											<Col md={6}>
												<h5>Diagnosis</h5>
												<p>{data.Diagnosis}</p>
											</Col>

											<Col md={6}>
												<h5>Management</h5>
												<p>{data.Management}</p>
											</Col>

										</Row>

										<div className="p-3">
											<h4>Physical Examination</h4>
											<Row className="p-3">
												<Col md={4}>
													<h5>GeneralAppearance</h5>
													<p>{data.PhysicalExamination.GeneralAppearance}</p>
												</Col>

												<Col md={4}>
													<h5>CNS</h5>
													<p>{data.PhysicalExamination.CNS}</p>
												</Col>

												<Col md={4}>
													<h5>CVS</h5>
													<p>{data.PhysicalExamination.CVS}</p>
												</Col>
											</Row>

											<Row className="p-3">
											
												<Col md={4}>
													<h5>HEENT</h5>
													<p>{data.PhysicalExamination.HEENT}</p>
												</Col>

												<Col md={4}>
													<h5>MSS</h5>
													<p>{data.PhysicalExamination.MSS}</p>
												</Col>

												<Col md={4}>
													<h5>Abdomen</h5>
													<p>{data.PhysicalExamination.Abdomen}</p>
												</Col>
											</Row>

											<Row className="p-3">									

												<Col md={4}>
													<h5>Integumentary</h5>
													<p>{data.PhysicalExamination.Integumentary}</p>
												</Col>

												<Col md={4}>
													<h5>Gynecological</h5>
													<p>{data.PhysicalExamination.Gynecological}</p>
												</Col>
												
												<Col md={4}>
													<h5>Neonatal</h5>
													<p>{data.PhysicalExamination.Neonatal}</p>
												</Col>
											</Row>

											<Row className="p-3">
												<Col md={4}>
													<h5>Height</h5>
													<p>{data.PhysicalExamination.Height}</p>
												</Col>

												<Col md={4}>
													<h5>Obstetrics</h5>
													<p>{data.PhysicalExamination.Obstetrics}</p>
												</Col>

												<Col md={4}>
													<h5>Weight</h5>
													<p>{data.PhysicalExamination.Weight}</p>
												</Col>
											</Row>

											<Row className="p-3">
												<Col md={4}>LGS
													<h5>LGS</h5>
													<p>{data.PhysicalExamination.LGS}</p>
												</Col>

												<Col md={4}>
													<h5>RespiratorySystem</h5>
													<p>{data.PhysicalExamination.RespiratorySystem}</p>
												</Col>

												<Col md={4}>
													<h5>GUS</h5>
													<p>{data.PhysicalExamination.GUS}</p>
												</Col>
											</Row>
										</div>

										<div className="p-3">
											<h4>VitalSign</h4>
											<Row className="p-3">									
												<Col md={3}>
													<h5>BP</h5>
													<p>{data.VitalSign.BP}</p>
												</Col>

												<Col md={3}>
													<h5>BT</h5>
													<p>{data.VitalSign.BT}</p>
												</Col>

												<Col md={2}>
													<h5>PR</h5>
													<p>{data.VitalSign.PR}</p>
												</Col>

												<Col md={2}>
													<h5>RR</h5>
													<p>{data.VitalSign.RR}</p>
												</Col>

												<Col md={2}>
													<h5>SPO2</h5>
													<p>{data.VitalSign.SPO2}</p>
												</Col>
											</Row>
										</div>
									</div>
								))}			
							</Container>
			            </Tab.Pane>
			            <Tab.Pane eventKey="second">
			              <AddMedicalRecord MRN={ptientMRN}/>
			            </Tab.Pane>
			            <Tab.Pane eventKey="third">
			              <Prescription MRN={ptientMRN}/>
			            </Tab.Pane>
			            <Tab.Pane eventKey="fourth">
			              <MedicalCertificate MRN={ptientMRN}/>
			            </Tab.Pane>
			          </Tab.Content>
			        </Col>
	      		</Row>
    		</Tab.Container>			
		</div>
	)	
}





