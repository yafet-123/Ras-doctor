import { useRouter } from "next/router";
import axios from "axios";
import {useEffect,useState } from 'react'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

export default function DisplayPrescription({prescription}) {
   	return (
      <div className="">
        <Container>
        	{prescription.map((data,index)=>(
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
									<Col md={4}>
										<h5>Medication</h5>
										<p>{data.Medication}</p>
									</Col>

									<Col md={4}>
										<h5>Strength</h5>
										<p>{data.Strength}</p>
									</Col>

									<Col md={4}>
										<h5>AmountToBeTaken</h5>
										<p>{data.AmountToBeTaken}</p>
									</Col>
								</Row>

								<Row className="p-3">
									<Col md={3}>
										<h5>Frequency</h5>
										<p>{data.Frequency}</p>
									</Col>

									<Col md={3}>
										<h5>Route</h5>
										<p>{data.Route}</p>
									</Col>

									<Col md={3}>
										<h5>HowMuch</h5>
										<p>{data.HowMuch}</p>
									</Col>

									<Col md={3}>
										<h5>Refills</h5>
										<p>{data.Refills}</p>
									</Col>
								</Row>

								<Row className="p-3">
									<Col md={12}>
										<h5>Note</h5>
										<p>{data.Note}</p>
									</Col>
								</Row>
				</div>
            ))}
            
        </Container>
      </div>
  )
}