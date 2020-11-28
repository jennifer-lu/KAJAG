import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios"
//import "./Login.css";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function validateForm() {
		console.log(`username.length = ${username.length}, password.length = ${password.length}`);
		return username.length > 0 && password.length > 0;
	}

	async function handleSubmit(event) {
		var headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}

		event.preventDefault();
		console.log("button_press");
		axios.post('http://localhost:9001/login-point', {
			username: username,
			password: password
		}, {headers : headers}).then(res => {
			console.log(res);
			console.log(res.data);
		}).catch(err => {
			console.log(err);
		});
	}

	return (
		<div className="Login">
			<Form onSubmit={handleSubmit}>
				<Form.Group size="lg" controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control
					autoFocus
					type="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					/>
				</Form.Group>
				<Form.Group size="lg" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Button block size="lg" type="submit" disabled={!validateForm()}>
					Login
				</Button>
			</Form>
		</div>
	);
}
