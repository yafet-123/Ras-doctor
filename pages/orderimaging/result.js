import Header from '../components/Header'
import SideNavbar from '../components/SideNavbar'
import {AiOutlineRight} from 'react-icons/ai'
import Link from 'next/link'
import { useRouter } from "next/router";
import axios from "axios";
import {useEffect,useState ,useRef} from 'react'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Cookies from 'universal-cookie';
import {useAuth} from '../context/AuthContext'
import styles from '../../styles/Home.module.css'
import moment from 'moment';
import style from '../../styles/SickLeavePrint.module.css'
import {useReactToPrint} from "react-to-print";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import api from '../components/api.js'

export async function getServerSideProps(context) {
	const {params,req,res,query} = context
	const patient_id_Medical_Record = query.mrn
	const token = req.cookies.token
	if (!token) {
    	return {
      		redirect: {
        		destination: '/login',
        		permanent: false,
      		},
      	}
    }
	const accesstoken = token
	const authaxios = axios.create({
		baseURL : api,
		headers :{
			Authorization : `Bearer ${accesstoken} `
		}
	})
	const data = await authaxios.get(`${api}/radiology/result/${patient_id_Medical_Record}`)
  	return {
    	props: {
	    	Imaging_Result:data.data,
	    }, // will be passed to the page component as props
	}
}


export default function ImagingResult({Imaging_Result}){
	const Imagingresult = Imaging_Result['all']
	const ptientMRN = Imaging_Result['info'].MRN

	const {currentUser} = useAuth()
	const router = useRouter();
	useEffect(()=>{
        if(!currentUser){
            router.push('/login')
        }
    },[currentUser,router])
	return(
		<div className={styles.home}>
            <SideNavbar mrn={ptientMRN}/>
            <div className={styles.homeContainer}>
				<Header />
				<Container >
					<div className="bg-white border my-3 rounded">
						<Row className="p-3">
							<Col md={4} className="text-center">
								<p>MRN</p>
								<p>{Imaging_Result['info'].MRN}</p>
							</Col>
							<Col md={4} className="text-center">
								<p>Name</p>
								<p>{Imaging_Result['info'].Name}</p>
							</Col>
							<Col md={4} className="text-center">
								<p>Age</p>
								<p>{Imaging_Result['info'].DateOfBirth}</p>
							</Col>
						</Row>

						<Row className="p-3">
							<Col md={4} className="text-center">
								<p>Gender</p>
								<p>{Imaging_Result['info'].Gender}</p>
							</Col>

							<Col md={4} className="text-center">
								<p>Phone Number</p>
								<p>{Imaging_Result['info'].PhoneNumber}</p>
							</Col>

							<Col md={4} className="text-center">
								<p>Occupation</p>
								<p>{Imaging_Result['info'].Occupation}</p>
							</Col>
						</Row>
					</div>

					{Imagingresult.map((data,index)=>(
							<div key={index} className="bg-white border my-3 rounded">
								<Row className="p-3">

									<Col md={4} >
										<h5>Created By</h5>
										<p>{data.CreatedBy}</p>
									</Col>
									<Col md={4}>
										<h5>Requested Date</h5>
										<p>{data.Requested_Date}</p>
									</Col>

									<Col md={4}>
										<h5>Clinic</h5>
										<p>{data.Clinic}</p>
									</Col>
								</Row>

								<Row className="p-3">
									<Col md={6}>
										<h5>Request</h5>
										<p>{data.Request}</p>
									</Col>

									<Col md={6}>
										<h5>Result</h5>
										<p>{data.Result}</p>
									</Col>
								</Row>
								
							</div>
						))}		
				</Container>
			</div>	
		</div>
	)	
}





