import {useEffect,useState} from 'react'
import Container from 'react-bootstrap/Container';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { AiOutlineSend } from 'react-icons/ai';
import axios from "axios";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export default function MedicalCertificate({MRN}) {
	const router = useRouter();
   	const [PatientId, setPatientId] = useState(MRN)
	const [Diagnosis,setDiagnosis] = useState("")
	const [Recommendation,setRecommendation] = useState("")
	const [TotalLeaveDays, setTotalLeaveDays] = useState("")
	const [Clinic,setClinic]= useState(2)
   	const cookies = new Cookies();
  	const accesstoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOjIsInVzZXIiOiJ5YWZldCIsImlhdCI6MTY1NTg3NTc4NSwiZXhwIjoxNjU4NDY3Nzg1fQ.92u5SyBuHaj_1AOzgtN5S-cjTpJyNf1tl3epGW75Ook"
   	const apiURL = "https://hmsapiserver.herokuapp.com/api/v1"
   	const authaxios = axios.create({
      	baseURL : apiURL,
      	headers :{
        	Authorization : `Bearer ${accesstoken} `
      	}
   	})
    
   	const handlesubmit = async (e)=>{
      	e.preventDefault()
      	await authaxios.post(`${apiURL}/sickleave/`,{
        	PatientId:parseInt(PatientId),
    		Diagnosis:Diagnosis,
    		Recommendation: Recommendation,
    		TotalLeaveDays: parseInt(TotalLeaveDays),
    		Clinic: parseInt(Clinic)
     	}).then(function (response) {
        	console.log(response)
         	router.push('/patients')
      	}).catch(function (error) {
        	console.log(error);
     	});
   	}
	return(
		<div>
		  	<form onSubmit={handlesubmit} className="bg-light pt-3">
		  		 <Container>
		  		 	<Row className="my-3">
                     	<Col sm>
                        	<FloatingLabel controlId="floatingTextarea2" label="Diagnosis">
                           		<Form.Control
                              		as="textarea"
                              		placeholder="Diagnosis"
                              		style={{ height: '200px' }}
                              		value={Diagnosis}
                              		onChange={(e) => setDiagnosis(e.target.value)}
                           		/>
                        	</FloatingLabel>
                     	</Col>

                     	<Col sm>
                        	<FloatingLabel controlId="floatingTextarea2" label="Recommendation">
                           		<Form.Control
                              		as="textarea"
                              		placeholder="Recommendation"
                              		style={{ height: '200px' }}
                              		value={Recommendation}
                              		onChange={(e) => setRecommendation(e.target.value)}
                           		/>
                        	</FloatingLabel>
                     	</Col>
                  	</Row>

                  	<Row className="my-3">
                     	<Col sm>
                           <FloatingLabel controlId="floatingInput" label="Total Leave Days">
                               <Form.Control 
                                 type="text" 
                                 placeholder="Total Leave Days" 
                                 value = {TotalLeaveDays}
                                 onChange={(e) => setTotalLeaveDays(e.target.value)}
                              />
                            </FloatingLabel>
                        </Col>
                  	</Row>

                  	<Button type="submit" variant="primary">Submit</Button>
		  		 </Container>
		    </form>
	    </div>

	)
}
