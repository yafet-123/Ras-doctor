import {useEffect,useState} from 'react'
import Container from 'react-bootstrap/Container';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { AiOutlineSend } from 'react-icons/ai';
import axios from "axios";

export default function Prescription({mrn}){
	const router = useRouter();
   	const [PatientId, setPatientId] = useState(mrn)
	const [Medication,setMedication] = useState("")
	const [Strength,setStrength] = useState("")
	const [AmountToBeTaken, setAmountToBeTaken] = useState("")
	const [Frequency,setFrequency]= useState("")
	const [Route,setRoute] = useState("")
	const [HowMuch, setHowMuch] = useState("")
	const [Refills,setRefills]= useState("")
	const [Note, setNote] = useState("")
   	const cookies = new Cookies();
    const accesstoken = cookies.get('token')
   	const apiURL = "https://hmsapiserver.herokuapp.com/api/v1"
   	const authaxios = axios.create({
      	baseURL : apiURL,
      	headers :{
        	Authorization : `Bearer ${accesstoken} `
      	}
   	})

	const handlesubmit = async (e)=>{
      	e.preventDefault()
      	await authaxios.post(`${apiURL}/prescription/`,{
        	PatientId:parseInt(PatientId),
    		Medication: Medication,
    		Strength: Strength,
    		AmountToBeTaken: AmountToBeTaken,
    		Frequency: Frequency,
    		Route: Route,
    		HowMuch: HowMuch,
    		Refills: Refills,
    		Note: Note,
    		clinic: 2,
    		CreatedBy: 2,
    		IsActive: true
     	}).then(function (response) {
        	console.log(response)
         	router.reload()
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
                           <FloatingLabel controlId="floatingInput" label="Medication">
                               <Form.Control 
                                 type="text" 
                                 placeholder="Medication" 
                                 value = {Medication}
                                 onChange={(e) => setMedication(e.target.value)}
                              />
                            </FloatingLabel>
                        </Col>

                        <Col sm>
                           <FloatingLabel controlId="floatingInput" label="Strength">
                               <Form.Control 
                                 type="text" 
                                 placeholder="Strength" 
                                 value = {Strength}
                                 onChange={(e) => setStrength(e.target.value)}
                              />
                            </FloatingLabel>
                        </Col>

                        <Col sm>
                           <FloatingLabel controlId="floatingInput" label="Amount To Be Taken">
                               <Form.Control 
                                 type="text" 
                                 placeholder="Amount To Be Taken" 
                                 value = {AmountToBeTaken}
                                 onChange={(e) => setAmountToBeTaken(e.target.value)}
                              />
                            </FloatingLabel>
                        </Col>
			  		</Row>

			  		<Row className="my-3">
			  			<Col sm>
                           <FloatingLabel controlId="floatingInput" label="Frequency">
                               <Form.Control 
                                 type="text" 
                                 placeholder="Frequency" 
                                 value = {Frequency}
                                 onChange={(e) => setFrequency(e.target.value)}
                              />
                            </FloatingLabel>
                        </Col>

                        <Col sm>
                           <FloatingLabel controlId="floatingInput" label="Route">
                               <Form.Control 
                                 type="text" 
                                 placeholder="Route" 
                                 value = {Route}
                                 onChange={(e) => setRoute(e.target.value)}
                              />
                            </FloatingLabel>
                        </Col>

                        <Col sm>
                           <FloatingLabel controlId="floatingInput" label="How Much">
                               <Form.Control 
                                 type="text" 
                                 placeholder="How Much" 
                                 value = {HowMuch}
                                 onChange={(e) => setHowMuch(e.target.value)}
                              />
                            </FloatingLabel>
                        </Col>

                        <Col sm>
                           <FloatingLabel controlId="floatingInput" label="Refills">
                               <Form.Control 
                                 type="text" 
                                 placeholder="Refills" 
                                 value = {Refills}
                                 onChange={(e) => setRefills(e.target.value)}
                              />
                            </FloatingLabel>
                        </Col>
			  		</Row>

			  		<Row className="my-3">
			  			<Col sm>
                        	<FloatingLabel controlId="floatingTextarea2" label="Note">
                           		<Form.Control
                              		as="textarea"
                              		placeholder="Note"
                              		style={{ height: '200px' }}
                              		value={Note}
                              		onChange={(e) => setNote(e.target.value)}
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
