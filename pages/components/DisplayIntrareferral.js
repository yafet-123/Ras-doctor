import { useRouter } from "next/router";
import axios from "axios";
import {useEffect,useState } from 'react'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

export default function DisplayIntrareferral({intrareferral}) {
   	return (
      <div className="">
        <Container>
        	{intrareferral.map((data,index)=>(
        		<div key={index} className="bg-white border my-3 rounded">
	            	<Row className="p-3">
						<Col md={3} >
							<h5>Created By</h5>
							<p>{data.CreatedBy}</p>
						</Col>
						<Col md={3}>
							<h5>Created Date</h5>
							<p>{data.CreatedDate}</p>
						</Col>

						<Col md={3}>
							<h5>Clinic</h5>
							<p>{data.Clinic}</p>
						</Col>

						<Col md={3} >
							<h5>Clinic Refered To</h5>
							<p>{data.ClinicReferedTo}</p>
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