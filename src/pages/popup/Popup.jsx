import React, { useState, useRef} from 'react';
import { useParams } from 'react-router-dom';
import './Popup.css';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage, database } from '../../config/firebase-config';
import { collection, addDoc} from "firebase/firestore";
import dayjs from 'dayjs';


const Popup = ({ onClose }) => {
  const [nameError, setNameError] = useState('');
  const [fileError, setFileError] = useState('');
  const patientID = useParams().id;
  const processName = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;

    // Validate name field
    if (!processName.current.value) {
      setNameError('Process Name is required');
      return;
    } else {
      setNameError('');
    }

    // Validate files
    const fileUpload = document.getElementById('popup-file-upload');
    const files = Array.from(fileUpload.files);
    
    // Upload files
    files.forEach(file => {
      console.log(file);
      console.log(storage);
      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.error('Upload failed', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            const processesCollection = collection(database, 'processes');
            console.log(processesCollection)
            console.log({patientID, date: dayjs().toDate(), flair: downloadURL, name: processName.current.value, seg: downloadURL})
            await addDoc(processesCollection, 
            {patientID, date: dayjs().toDate(), flair: downloadURL, name: processName.current.value, seg: downloadURL})
            .then((docRef) => {
                console.log(`Process ${docRef.id} added successfully`)
            }).catch((e) => {
                console.error("Error adding document: ", e);
            });
          });
        }
      );
    });

    console.log(Object.fromEntries(new FormData(form).entries()));
    form.reset();
  }

  return (
    <div className="popup-container">
      <div className="popup">
        <button id="popup-modal-close-button" onClick={onClose}>X</button>
        <form id="popup-mri-form" onSubmit={handleSubmit}>
          <div className="popup-row">
            <div className="popup-col-25">
              <label htmlFor="process-name" id="name-label">Process Name:</label>
            </div>
            <div className="popup-col-75">
              <input ref={processName} type="text" className="popup-popUpInput" placeholder="Process name" required />
              {nameError && <span className="popup-error">{nameError}</span>}
            </div>
          </div>
          <div className="popup-row">
            <div className='popup-col-25'>
              <label htmlFor="disabledLabel">Upload MRI:</label>
            </div>
            <div className="popup-col-75">
              <input type="text" value={"Enter 3 modalities"} id="popup-file-textbox" className='popup-popUpInput popup-disabledPopUpInput' disabled />
              <label htmlFor="popup-file-upload" className="popup-custom-file-upload" id="popup-file">
                <i className="popup-fa fa-cloud-upload"></i> Browse Files
              </label>
            </div>
            <input id="popup-file-upload" type="file" multiple />
          </div>
          <div className="popup-row">
            {fileError && <span className="popup-error">{fileError}</span>}
          </div>
          <div className='popup-row'>
            <div className='popup-btnDiv'>
              <input id="popup-submit" type="submit" value={"Submit"} className='popup-submitBtn' />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;