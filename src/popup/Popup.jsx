import React, { useState, useRef } from 'react';
import './Popup.css';

const Popup = ({ onClose }) => {
  const [nameError, setNameError] = useState('');
  const [fileError, setFileError] = useState('');
  const processName = useRef(null);
  function checkContainsT1(files) {
    for (let i = 0; i < files.length; i++) {
      if (files[i].name.toLowerCase().includes('t1')) {
        return true;
      }
    }
    return false;
  }
  function checkContainsT1CE(files) {
    for (let i = 0; i < files.length; i++) {
      if (files[i].name.toLowerCase().includes('t1ce')) {
        return true;
      }
    }
    return false;
  }
  function checkContainsT2(files) {
    for (let i = 0; i < files.length; i++) {
      if (files[i].name.toLowerCase().includes('t2')) {
        return true;
      }
    }
    return false;
  }
  function checkContainsFlair(files) {
    for (let i = 0; i < files.length; i++) {
      if (files[i].name.toLowerCase().includes('flair')) {
        return true;
      }
    }
    return false;
  }
  function handleSubmit(event) {
    console.log('submit');
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    // Validate name field
    if (processName.current.value === '') {
      setNameError('Process Name is required');
      return;
    } else {
      setNameError('');
    }
    // Validate files
    const fileUpload = document.getElementById('file-upload');
    const files = fileUpload.files;
    if (files.length !== 4) {
      setFileError('Please upload four files');
      return;
    } else {
      setFileError('');
    }


    let err = false;
    let error = '';
    
    if (!checkContainsT1(files)) {
      error += 'T1 not found ';
      err = true;
    }
    if (!checkContainsT1CE(files)) {
      error += 'T1CE not found ';
      err = true;
    }
    if (!checkContainsFlair(files)) {
      error += 'FLAIR not found ';
      err = true;
    }
    if (!checkContainsT2(files)) {
      error += 'T2 not found';
      err = true;
    }

    if (err) {
      setFileError(error);
      return;
    } else {
      setFileError('');
    }
    console.log(data);
    form.reset();
  }

  return (
    <div className="popup-container">
      <div className="popup">
        <button id="modal-close-button" onClick={onClose}>X</button>
        <form id="mri-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-25">
              <label htmlFor="process-name" id="name-label">
                Process Name:
              </label>
            </div>
            <div className="col-75">
              <input ref={processName} type="text" className="popUpInput" placeholder="Process name" required />
              {nameError && <span className="error">{nameError}</span>}
            </div>
          </div>
          <div className="row">
            <div className='col-25'>
              <label htmlFor="disabledLabel">Upload MRI:</label>
            </div>
            <div className="col-75">
              <input type="text" value={"Enter 3 modalities"} id="file-textbox" className='popUpInput disabledPopUpInput' disabled />
              <label htmlFor="file-upload" className="custom-file-upload" id="file">
                <i className="fa fa-cloud-upload"></i> Browse Files
              </label>
            </div>
            <input id="file-upload" type="file" multiple />

          </div>
          <div className="row">
            {fileError && <span className="error">{fileError}</span>}
          </div>
          <div className='row'>
            <div className='btnDiv'>
              <input id="submit" type="submit" value={"Submit"} className='submitBtn' />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
