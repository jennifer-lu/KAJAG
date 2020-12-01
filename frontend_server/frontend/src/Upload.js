import React, { createRef } from "react";
import ReactDOM from "react-dom";

import "./Upload.css";

class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.extractFormData = this.extractFormData.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);

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

  // saveImage = function(file, filename, ref, callbacks) {
  //   if (!ref) ref = firebase.storage().ref();
  //   if (!callbacks) callbacks = {};
  //   if (mimes[file.type].extensions[0]) {
  //     callbacks.success = callbacks.success || console.log;
  //     callbacks.progress = callbacks.progress || console.log;
  //     callbacks.error = callbacks.error || console.error;

  //     // Create the file metadata
  //     var metadata = {
  //       contentType: file.type
  //     };

  //     // Upload file and metadata to the object
  //     var uploadTask = ref
  //       .child(filename + "." + mimes[file.type].extensions[0])
  //       .put(file, metadata);
  //     uploadTask.on(
  //       "state_changed",
  //       callbacks.progress,
  //       callbacks.error,
  //       callbacks.success
  //     );

  //     return uploadTask.then(function(snapshot) {
  //       return snapshot.ref.getDownloadURL();
  //     });
  //   }
  // };

  // sendData = (text, files) =>
  //   Promise.all(
  //     files.map(file =>
  //       this.saveImage(
  //         file,
  //         +new Date() + "_" + Math.random(),
  //         allImagesRef,
  //         progress
  //       )
  //     )
  //   ).then(values =>
  //     userImagesRef.child(user.uid).push({
  //       status: text,
  //       pictures: values,
  //       timestamp: +new Date()
  //     })
  //   );

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

  onChangeFile(e) {
    let fileCollection = [];

    const formData = this.extractFormData("#my-form");
    console.log(formData);

    while (fileCollection.length) {
      fileCollection.pop();
    }

    // [].slice.call(formData.pictures).map(f => fileCollection.push(f));
    Array.from(e.target.files).map(f => fileCollection.push(f));
    this.renderCollection(fileCollection, this.imgPreviewImag.current);
  }

  render() {
    return (
      <div>
        <center>
          <form action="" className="myForm" id="my-form">
            <label htmlFor="pictures">Upload Files</label>
            <input
              name="pictures"
              type="file"
              id="pictures"
              accept="image/*"
              multiple
              onChange={this.onChangeFile}
            />
          </form>

          <div ref={this.imgPreviewImag} />
        </center>
      </div>
    );
  }
}

export default function App() {
  return <Upload />;
}
