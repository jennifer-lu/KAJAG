// import React from 'react'
// import axios, { post } from 'axios';
//
// class Upload extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.state ={
//       file:null
//     }
//     this.onFormSubmit = this.onFormSubmit.bind(this)
//     this.onChange = this.onChange.bind(this)
//     this.fileUpload = this.fileUpload.bind(this)
//   }
//
//   onFormSubmit(e){
//     e.preventDefault() // Stop form submit
//     this.fileUpload(this.state.file).then((response)=>{
//       console.log(response.data);
//     })
//   }
//
//   onChange(e) {
//     this.setState({file:e.target.files[0]})
//   }
//
//   async fileUpload(file){
//     const url = 'http://localhost:9001/upload-file';
//     const formData = new FormData();
//     formData.append('file',file)
//     const config = {
//         headers: {
//             'content-type': 'multipart/form-data'
//         }
//     }
//     return post(url, formData);
//   }
//
//   render() {
//     return (
//       <form onSubmit={this.onFormSubmit}>
//         <h1>File Upload</h1>
//         <input type="file" onChange={this.onChange} />
//         <button type="submit">Upload</button>
//       </form>
//    )
//   }
// }
//
// export default Upload

import axios from 'axios';
import React,{Component} from 'react';

class Upload extends Component {

  state = {

    // Initially, no file is selected
    selectedFile: null
  };

  // On file select (from the pop up)
  onFileChange = event => {

    // Update the state
    this.setState({ selectedFile: event.target.files[0] });

  };

  // On file upload (click the upload button)
  onFileUpload = (file) => {
    var headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
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
    axios.post('http://localhost:9001/upload-file', {
			file: formData
		}, {headers : headers}).then(res => {
			console.log(res);
			alert("Uploaded")
		}).catch(err => {
			alert("Invalid file");
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
          <h1>
            TexScan
          </h1>
          <h3>
            Upload your assignment here:
          </h3>
          <div>
              <input type="file" onChange={this.onFileChange} />
              <button onClick={this.onFileUpload}>
                Upload
              </button>
          </div>
        {this.fileData()}
      </div>
    );
  }
}

export default Upload;


// import React, { createRef } from "react";
// import ReactDOM from "react-dom";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Cookies from 'universal-cookie';
// import axios from "axios"
// import "./Upload.css";
//
// const cookies = new Cookies();
//
// class Upload extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.extractFormData = this.extractFormData.bind(this);
//     this.onChangeFile = this.onChangeFile.bind(this);
//     this.imgPreviewImag = createRef();
//   }
//
//   extractFormData = function(form) {
//     const formData = new FormData(document.querySelector(form));
//     let values = {};
//     for (var pair of formData.entries()) {
//       if (values[pair[0]]) {
//         if (!(values[pair[0]] instanceof Array)) {
//           values[pair[0]] = new Array(values[pair[0]]);
//         }
//         values[pair[0]].push(pair[1]);
//       } else {
//         values[pair[0]] = pair[1];
//       }
//     }
//     return values;
//   };
//
//   generatePreviewData = file => {
//     const fr = new FileReader();
//     return new Promise((resolve, reject) => {
//       fr.addEventListener("load", e => {
//         const div = document.createElement("div");
//         const img = document.createElement("img");
//         img.src = fr.result;
//         img.setAttribute("class", "preview");
//         div.appendChild(img);
//         resolve(div);
//       });
//       fr.addEventListener("error", e => {
//         reject();
//       });
//       fr.readAsDataURL(file);
//     });
//   };
//
//   // saveImage = function(file, filename, ref, callbacks) {
//   //   if (!ref) ref = firebase.storage().ref();
//   //   if (!callbacks) callbacks = {};
//   //   if (mimes[file.type].extensions[0]) {
//   //     callbacks.success = callbacks.success || console.log;
//   //     callbacks.progress = callbacks.progress || console.log;
//   //     callbacks.error = callbacks.error || console.error;
//
//   //     // Create the file metadata
//   //     var metadata = {
//   //       contentType: file.type
//   //     };
//
//   //     // Upload file and metadata to the object
//   //     var uploadTask = ref
//   //       .child(filename + "." + mimes[file.type].extensions[0])
//   //       .put(file, metadata);
//   //     uploadTask.on(
//   //       "state_changed",
//   //       callbacks.progress,
//   //       callbacks.error,
//   //       callbacks.success
//   //     );
//
//   //     return uploadTask.then(function(snapshot) {
//   //       return snapshot.ref.getDownloadURL();
//   //     });
//   //   }
//   // };
//
//   // sendData = (text, files) =>
//   //   Promise.all(
//   //     files.map(file =>
//   //       this.saveImage(
//   //         file,
//   //         +new Date() + "_" + Math.random(),
//   //         allImagesRef,
//   //         progress
//   //       )
//   //     )
//   //   ).then(values =>
//   //     userImagesRef.child(user.uid).push({
//   //       status: text,
//   //       pictures: values,
//   //       timestamp: +new Date()
//   //     })
//   //   );
//
//   removeAllChildren = el => {
//     while (el.childElementCount) {
//       el.removeChild(el.children[0]);
//     }
//   };
//
//   renderCollection = (collection, container) => {
//     this.removeAllChildren(container);
//     Promise.all(collection.map(this.generatePreviewData)).then(imgs =>
//       imgs.map((img, i) => {
//         img.setAttribute("index", i);
//         img.addEventListener("click", e => {
//           collection.splice(i, 1);
//           this.renderCollection(collection, container);
//         });
//         container.appendChild(img);
//       })
//     );
//   };
//
//   onChangeFile(e) {
//     let fileCollection = [];
//
//     const formData = this.extractFormData("#my-form");
//     console.log(formData);
//
//     while (fileCollection.length) {
//       fileCollection.pop();
//     }
//
//     // [].slice.call(formData.pictures).map(f => fileCollection.push(f));
//     Array.from(e.target.files).map(f => fileCollection.push(f));
//     this.renderCollection(fileCollection, this.imgPreviewImag.current);
//   }
//
//   course = "";
//   assignment = "";
//   page = "";
//
//   handleSubmit(event) {
// 		var headers = {
// 			'Accept': 'application/json',
// 			'Content-Type': 'application/json',
// 		}
//
// 		event.preventDefault();
// 		console.log("button_press");
// 		axios.post('http://localhost:9001/login-point', {
// 			password: course,
// 			assignment: assignment,
//       page: page
// 		}, {headers : headers}).then(res => {
// 			console.log(res);
// 			cookies.set("session", {
// 				token: res.data.token
// 			});
// 			alert("Signed in ")
// 		}).catch(err => {
// 			alert("Wrong password");
// 			console.log(err);
// 		});
// 	}
//
//   render() {
//     return (
//       <div>
//         <center>
//           <form action="" className="myForm" id="my-form">
//             <label>
//               Course Name:
//               <input type="text" name="course_name" />
//             </label>
//             <label>
//               Assignment Name:
//               <input type="text" name="assignment_name" />
//             </label>
//             <label>
//               Page Number:
//               <input type="text" name="page_number" />
//             </label>
//             <input name="pictures" type="file" id="pictures" accept="image/*" multiple onChange={this.onChangeFile} />
//             <input type="submit" value="Submit" />
//           </form>
//           <div ref={this.imgPreviewImag} />
//         </center>
//       </div>
//     );
//   }
// }
//
// export default function App() {
//   return <Upload />;
// }
