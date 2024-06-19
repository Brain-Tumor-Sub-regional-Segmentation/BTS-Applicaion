import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Popup.css';
import { ref, getDownloadURL, uploadBytesResumable,uploadBytes } from "firebase/storage";
import { storage, database } from '../../config/firebase-config';
import { collection, addDoc } from "firebase/firestore";
import dayjs from 'dayjs';
import axios from 'axios';
import { set } from 'firebase/database';

const API_URL = "https://brats24-vvv-chain-model.hf.space";
const Popup = ({ onClose }) => {
  const [nameError, setNameError] = useState('');
  const [fileError, setFileError] = useState('');
  const [progress, setProgress] = useState(0);
  const [selectedFilesNames, setSelectedFilesNames] = useState("Enter 4 modalitiessss");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState({
    flair: null,
    t1: null,
    t1ce: null,
    t2: null
  });

  const patientID = useParams().id;
  const processName = useRef(null);

  const handleFileChange = (e) => {
    const { files: selectedFiles } = e.target;
    const updatedFiles = {
      flair: null,
      t1: null,
      t1ce: null,
      t2: null
    };

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      if (file.name.toLowerCase().includes('flair')) {
        updatedFiles.flair = file;
      } else if (file.name.toLowerCase().includes('t1ce')) {
        updatedFiles.t1ce = file;
      } else if (file.name.toLowerCase().includes('t1')) {
        updatedFiles.t1 = file;
      } else if (file.name.toLowerCase().includes('t2')) {
        updatedFiles.t2 = file;
      }
    }
    console.log('Selected files:', selectedFiles);
    // let filesNames = '';
    // for (let i = 0; i < selectedFiles.length; i++) {
    //   filesNames += selectedFiles[i].name;
    //   if (i !== selectedFiles.length - 1) {
    //     filesNames += ', ';
    //   }
    // }
    setSelectedFilesNames("you have selected files.");
    setFiles(updatedFiles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    if (!processName.current.value) {
      setNameError('Process Name is required');
      return;
    } else {
      setNameError('');
    }

    const fileUpload = document.getElementById('popup-file-upload');
    const allFiles = Array.from(fileUpload.files);

    if (allFiles.length !== 4) {
      setFileError('Please upload four files');
      return;
    } else {
      setFileError('');
    }

    let err = false;
    let error = '';
    if (!files.t1) {
      error += 'T1 not found ';
      err = true;
    }
    if (!files.t1ce) {
      error += 'T1CE not found ';
      err = true;
    }
    if (!files.flair) {
      error += 'FLAIR not found ';
      err = true;
    }
    if (!files.t2) {
      error += 'T2 not found';
      err = true;
    }

    if (err) {
      setFileError(error);
      return;
    } else {
      setFileError('');
    }
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('files', files.flair, 'flair');
    formData.append('files', files.t1, 't1');
    formData.append('files', files.t1ce, 't1ce');
    formData.append('files', files.t2, 't2');
    console.log('Uploading files:', formData);
    var storageDownloadURL ;
    try {
      const response = await axios.post(`${API_URL}/segment/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
      });

      if (response.status === 200) {
        const segmentationBlob = new Blob([response.data], { type: 'application/gzip' });

        // Upload the blob to Firebase Storage
        const storageRef = ref(storage, `segmentations/${processName.current.value}-segmentation_result.nii.gz`);
        await uploadBytes(storageRef, segmentationBlob);
        storageDownloadURL = await getDownloadURL(storageRef);

        console.log('Segmentation result uploaded and available at:', storageDownloadURL);
       await uploadFlair(storageDownloadURL);
        
      } else {
        console.error('Error:', response.data);
      }
    } catch (error) {
      console.error('Error:', error.response );;
      console.error('Error:', error.response ? error.response.data : error.message);
      return;
    }

    // const uploadFiles = Object.values(files);
    // uploadFiles.forEach(file => {
    // });
 
  };
  
async function uploadFlair(storageDownloadURL) {
  const storageFlairRef = ref(storage, `processes/processname-${processName.current.value}-file-${files.flair.name}`);
  const uploadTask = uploadBytesResumable(storageFlairRef, files.flair);

  uploadTask.on('state_changed',
      (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setProgress(progress);
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
      async () => {
          try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

              const processesCollection = collection(database, 'processes');
              const docRef = await addDoc(processesCollection, {
                  patientID,
                  date: dayjs().toDate(),
                  flair: downloadURL,
                  name: processName.current.value,
                  seg: storageDownloadURL,
                  notes: ""
              });

              console.log(`Process ${docRef.id} added successfully`);
              setProgress(0);
          } catch (e) {
              console.error("Error adding document: ", e);
          } finally {
              setIsSubmitting(false);

          }
      }
  );
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
              <input type="text" value={ selectedFilesNames} id="popup-file-textbox" className='popup-popUpInput popup-disabledPopUpInput' disabled />
              <label htmlFor="popup-file-upload" className="popup-custom-file-upload" id="popup-file">
                <i className="popup-fa fa-cloud-upload"></i> Browse Files
              </label>
            </div>
            <input id="popup-file-upload" type="file" multiple onChange={handleFileChange} />
          </div>
          <div className="popup-row">
            {fileError && <span className="popup-error">{fileError}</span>}
          </div>
          <div className='popup-row'>
            <div className='popup-btnDiv'>
            {isSubmitting ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
        </div>
      ) : (
        <input
          id="popup-submit"
          type="submit"
          value={"Submit"}
          className='popup-submitBtn'
        />         )}          
            </div>

          </div>
          <div>
          <progress 
    value={progress} 
    max="100" 
    className='popup-submitBtn' 
    style={{ backgroundColor: 'white' }} 
    height="2spx"
    hidden={!isSubmitting}
/>          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
