import React, { Component, createRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios"
import "./Upload.css";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Upload extends Component {
  constructor(props) {
    super(props);

    this.extractFormData = this.extractFormData.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.imgPreviewImag = createRef();
  }

  extractFormData = function(form) {
    const formData = new FormData(document.querySelector(form));
    let values = {};
    for (var pair of formData.entries()) {
      if (values[pair[0]]) {
        if (!(values[pair[0]] instanceof Array)) {
          values[pair[0]] = new Array(values[pair[0]]);
        }
        values[pair[0]].push(pair[1]);
      } else {
        values[pair[0]] = pair[1];
      }
    }
    return values;
  };

  generatePreviewData = file => {
    const fr = new FileReader();
    return new Promise((resolve, reject) => {
      fr.addEventListener("load", e => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        img.src = fr.result;
        img.setAttribute("class", "preview");
        div.appendChild(img);
        resolve(div);
      });
      fr.addEventListener("error", e => {
        reject();
      });
      fr.readAsDataURL(file);
    });
  };

  removeAllChildren = el => {
    while (el.childElementCount) {
      el.removeChild(el.children[0]);
    }
  };

  renderCollection = (collection, container) => {
    this.removeAllChildren(container);
    Promise.all(collection.map(this.generatePreviewData)).then(imgs =>
      imgs.map((img, i) => {
        img.setAttribute("index", i);
        img.addEventListener("click", e => {
          collection.splice(i, 1);
          this.renderCollection(collection, container);
        });
        container.appendChild(img);
      })
    );
  };

  state = {

    // Initially, no file is selected
    selectedFile: null
  };

  // On file select (from the pop up)
  onFileChange = event => {

    // Update the state
    this.setState({ selectedFile: event.target.files[0] });

    let fileCollection = [];

    const formData = this.extractFormData("#my-form");
    console.log(formData);

    while (fileCollection.length) {
      fileCollection.pop();
    }

    // [].slice.call(formData.pictures).map(f => fileCollection.push(f));
    Array.from(event.target.files).map(f => fileCollection.push(f));
    this.renderCollection(fileCollection, this.imgPreviewImag.current);
  };

  // On file upload (click the upload button)
  onFileUpload = (file) => {
    var headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			"token": cookies.get("session")
		}

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("myFile", file);

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    // axios.post("http://localhost:9001/upload-file", formData);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload-file`, {
			file: formData
		}, {headers : headers}).then(res => {
			console.log(res);
			alert("Uploaded")
		}).catch(err => {
			if (err.response.status === 401 || err.response.status === 403) {
				alert("Invalid session/authentication error");
			} else {
				alert("Invalid file");
			}
			console.log(err);
		});
	}


  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
        </div>
      );
    }
  };

  render() {
    return (
      <div>
          <h3>
            Upload your assignment here:
          </h3>
          <div>
            <form action="" className="myForm" id="my-form">
              <label>
                Course Name:
                <input type="text" name="course_name" />
              </label>
              <label>
                Assignment Name:
                <input type="text" name="assignment_name" />
              </label>
              <label>
                Page Number:
                <input type="text" name="page_number" />
              </label>
              <input type="file" multiple onChange={this.onFileChange} />
            </form>
            <button onClick={this.onFileUpload}>
              Upload
            </button>
          </div>
        {this.fileData()}
        <div ref={this.imgPreviewImag} />
      </div>
    );
  }
}

export default Upload;
