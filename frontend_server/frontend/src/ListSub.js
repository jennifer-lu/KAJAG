import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios"
import Cookies from 'universal-cookie';

import DOMPurify from 'dompurify';
var html_tablify = require('html-tablify');

const cookies = new Cookies();

export default function ListSub() {

	const [table, setTable] = useState("")

	var headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		"token": cookies.get("session")
	};
	
	async function makeTable() {
		var table = axios.get(`${process.env.REACT_APP_BACKEND_URL}/list`, {headers : headers}).then(res => {
			let tableData = res.data.data;
			var html_tab = html_tablify.tablify({data : tableData});
			return html_tab;
		}).catch(err => {
			console.log(err);
		});
		return table;
	}
	
	makeTable().then(table => {
		setTable(table);
		console.log(table);
	})
	
	return (
		<div className="content" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(table)}}></div>
	);
}
