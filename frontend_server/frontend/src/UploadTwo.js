import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios"
import Cookies from 'universal-cookie';
const cookies = new Cookies();
//import "./UploadTwo.css";

export default function UploadTwo() {
	const [sub, setSub] = useState("");
	const [assignment, setAssignment] = useState("");
	const [page, setPage] = useState("");
	const [course, setCourse] = useState("");
	const [question, setQuestion] = useState("");

	function validateForm() {
		console.log("a=" + assignment.length + " page = " + page + " course.length = " + course.length);
		console.log(Number.isInteger(+page));
		return assignment.length > 0 && Number.isInteger(+page) && course.length > 0;
	}

	function handleFile(event){
		setSub(event.target.files[0]);
	}
	async function handleSubmit(event) {
		console.log(event);
		var headers = {
			'Content-Type': 'multipart/form-data',
			"token": cookies.get("session")
		};
		event.preventDefault();
		var data = new FormData();
		data.append("sub", sub);
		data.append("course", course);
		data.append("assignment", assignment);
		data.append("page", page);
		data.append("question", question);
		console.log(sub);
		axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload-file`, data, {headers : headers}).then(res => {
			console.log(res);
			alert("Signed in ")
		}).catch(err => {
			alert("Wrong password");
			console.log(err);
		});
	}

	return (
		<div>
			<h3>
				Upload your assignment here:
			</h3>
			<div className="UploadTwo">
				<Form onSubmit={handleSubmit}>
					<Form.Group size="lg" controlId="course">
						<Form.Label>Course</Form.Label>
						<Form.Control
						autoFocus
						type="text"
						onChange={(e) => setCourse(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="assignment">
						<Form.Label>Assignment</Form.Label>
						<Form.Control
						autoFocus
						type="text"
						onChange={(e) => setAssignment(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="page">
						<Form.Label>Page</Form.Label>
						<Form.Control
						autoFocus
						type="number"
						onChange={(e) => setPage(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="question">
						<Form.Label>Question</Form.Label>
						<Form.Control
						autoFocus
						type="number"
						onChange={(e) => setQuestion(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="sub">
						<Form.Label>File</Form.Label>
						<Form.Control
						autoFocus
						type="file"
						onChange={handleFile}
						/>
					</Form.Group>
					<Button block size="lg" type="submit" disabled={!validateForm()}>
						UploadTwo
					</Button>
				</Form>
			</div>
		</div>
	);
}
