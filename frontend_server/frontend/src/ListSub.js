import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function ListSub() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function validateForm() {
		return username.length > 0 && password.length > 0;
	}

	async function handleSubmit(event) {
		var headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			"token": cookies.get("session")
		};
		console.log(headers);
		event.preventDefault();
		console.log("button_press");
		axios.get(`${process.env.REACT_APP_BACKEND_URL}/list`, {headers : headers}).then(res => {
			console.log(res);
		}).catch(err => {
			console.log(err);
		});
	}

	return (
		<div className="ListSub">
			<Form onSubmit={handleSubmit}>
				<Button block size="lg" type="submit">
					ListSub
				</Button>
			</Form>
		</div>
	);
}
