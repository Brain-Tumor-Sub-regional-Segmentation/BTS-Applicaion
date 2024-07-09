<div align="center"> 

# Brain Tumor Segmentation Application


<a href="logo" target="_blank" rel="noreferrer">
  <img src="https://github.com/5aliha-3ala-Allah/BTS/blob/main/public/images/logo.png" alt="React" width="150" height="150"/>
</a>

We have developed a user-friendly application with a React-based front end integrated with a real-time database. We chose Firebase for deployment to ensure accessibility and facilitate testing and visualization of tumor regions, catering specifically to doctors and other users. The enhanced model VVV net is deployed using the Hugging Face Hub.

<a href="https://reactjs.org/" target="_blank" rel="noreferrer">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="40" height="40"/>
</a><a href="https://firebase.google.com/" target="_blank" rel="noreferrer">
  <img src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" alt="Firebase" width="40" height="40"/>
</a><a href="https://huggingface.co/" target="_blank" rel="noreferrer">
  <img src="https://huggingface.co/front/assets/huggingface_logo-noborder.svg" alt="Hugging Face" width="40" height="40"/>
</a>
</div>

---
# Demo
https://github.com/5aliha-3ala-Allah/BTS-Applicaion/assets/77179015/51b1412c-90a4-43c1-b65b-63940eeb1aa4

# Features and Workflow

**1. Accounts and Patient Management**

  - Doctor Accounts: Each doctor has an account and maintains a list of patients.
  - Patient Records: Each patient can have multiple image processing records.

**2. Image Selection**

- MRI Selection: Doctors can select a medical image (MRI) for a specific patient.

**3. Processing**

- Initiation: Doctors initiate image processing.
Processing Unit: The image is processed based on selected parameters.
- Segmentation Result: The result is a segmented image highlighting areas of interest.

**4. Storage**

- Firebase Storage: The processed image is stored in Firebase Storage for future reference.

**5. Interface and Notification**

- Display: The segmented image is displayed to the doctor.
Adjustments: Doctors can request updates or adjust parameters if needed.
Overall, this application streamlines medical image processing, segmentation, and storage for healthcare professionals, enhancing patient management and care.

# Firebase Database Collections

**1. Doctors Collection**

- Stores detailed information about medical practitioners.
Fields: email, name, phone number, unique doctorID.

**2. Patients Collection**

- Holds detailed records of individual patients.

- **Fields:** allergies, birthday (timestamp), doctorID (linking to the respective doctor), gender (Boolean), lastModified (timestamp), medicalHistory, medications, name, phone number.

**3. Patient-Trigrams Collection**

- Stores trigram information associated with patients for efficient indexing and searching.

- **Fields:** Boolean value indicating presence.

**4. Processes Collection**

- Manages records related to medical procedures or processes performed for patients.

- **Fields:** date (timestamp), flair and seg URLs (pointing to MRI images stored in Google Cloud Storage), name of the process, notes, patientID (linking to the respective patient document).




# Model Deployment 
- The model is deployed on Hugging Face Spaces. To access the model and perform inference, send a POST request to the following public endpoint with the 4 NIfTI files representing the 4 MRI modalities:
`https://brats24-vvv-chain-model.hf.space/segment/` . The response will take 40 to 50 seconds as the inference is done on CPU.

- **Demo** A Colab notebook is available for clients to try the endpoint and view the segmentation of the input MRI files: https://colab.research.google.com/drive/1WdvdGIPdQ05GNWoOHW_lDl2R75GZVPH-?usp=sharing
