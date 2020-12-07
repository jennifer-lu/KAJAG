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
			for (var i = 0; i < tableData.length; ++i){
				tableData[i].name = `<a href = \"http://localhost:9001/image?name=${tableData[i].name}\"> ${tableData[i].name} </a>`;
			}
			var html_tab = html_tablify.tablify({
				data : tableData,
				header: ["name", "author", "course", "assignment", "question", "page"]
			});
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

		<div class="back">
			<div class="form card">
				<p class="bigger">
					Files
				</p>
				<div className="content" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(table)}}></div>
			</div>
		</div>
	);
}
