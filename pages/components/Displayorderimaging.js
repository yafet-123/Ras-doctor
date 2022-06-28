import { useRouter } from "next/router";
import axios from "axios";
import {useEffect,useState } from 'react'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

export default function Displayorderimaging({orderimaging}) {
   	return (
      <div className="">
        <Container>
        	{orderimaging.map((data,index)=>(
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
										<h5>Request</h5>
										<p>{data.RequestName}</p>
									</Col>
								</Row>
						</div>
          ))}
            
        </Container>
      </div>
  )
}