import {useState, useEffect} from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie';

export default function AddIntrareferral({mrn, clinic}) {
   const router = useRouter();
   const [PatientId, setPatientId] = useState(mrn)
   const [Clinic,setClinic] = useState("")
   const [ClinicReferTo,setClinicReferTo] = useState("")
   const [Note,setNote] = useState("")
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
      await authaxios.post(`${apiURL}/intrareferral/`,{
         PatientId,
         Clinic: 5,
         ClinicReferTo:parseInt(ClinicReferTo),
         Note
      }).then(function (response) {
         console.log(response)
         router.reload()
      }).catch(function (error) {
         console.log(error);
      });
   }
   return (
      <div className="">
         <form onSubmit={handlesubmit} className="bg-light pt-3">
            <Container>
                  <Row className="my-3">
                     <Col sm>
                        <FloatingLabel controlId="floatingSelect" label="Patient Status">
                           <Form.Select 
                              aria-label="Floating label select example"
                              value = {ClinicReferTo}
                              onChange={(e) => setClinicReferTo(e.target.value)}
                           >
                              <option></option>
                              {clinic.map((data,index)=>(
                                 <option key={index} value={data.id}>{data.ClinicName}</option>
                              ))}
                           </Form.Select>
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
                              value = {Note}
                              onChange={(e) => setNote(e.target.value)}
                           />
                        </FloatingLabel>
                     </Col>
                  </Row>
               <Button type="submit" variant="primary">Submit</Button>
            </Container>
         </form >
      </div>
  )
}

