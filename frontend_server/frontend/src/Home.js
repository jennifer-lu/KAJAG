import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios"
import Cookies from 'universal-cookie';
import "./index.css";
const cookies = new Cookies();

export default class Home extends React.Component {
  render() {
    return <header class="wot">
      <div class="center pad">
        <span class="heading fade">TexScan</span>
        <br></br>
        <span class="tailing fade">Digitization simplified.</span>
      </div>
    </header>
  }
}
