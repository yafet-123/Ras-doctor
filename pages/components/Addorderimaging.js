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
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function Addorderimaging({mrn, radrequest}) {
   const router = useRouter();
   const MRI = radrequest.mri
   const CT = radrequest.ct
   const XRAY = radrequest.xray
   const US = radrequest.us
   const [PatientId, setPatientId] = useState(mrn)
   const [RequestId,setRequestId] = useState([])
   const [AdditionalInformation,setAdditionalInformation] = useState("")
   const cookies = new Cookies();
   const accesstoken = cookies.get('token')
   const apiURL = "https://hmsapiserver.herokuapp.com/api/v1"
   const authaxios = axios.create({
      baseURL : apiURL,
      headers :{
         Authorization : `Bearer ${accesstoken} `
      }
   })

   console.log(RequestId)
   const handlesubmit = async (e)=>{
      e.preventDefault()
      await authaxios.post(`${apiURL}/orderimaging/`,{
         PatientId,
         RequestId,
         AdditionalInformation
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
                        <FloatingLabel controlId="floatingTextarea2" label="Additional Information">
                           <Form.Control
                              as="textarea"
                              placeholder="Additional Information"
                              style={{ height: '200px' }}
                              value = {AdditionalInformation}
                              onChange={(e) => setAdditionalInformation(e.target.value)}
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

