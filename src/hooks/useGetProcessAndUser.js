import { doc, getDoc } from "firebase/firestore";
import { database } from "../config/firebase-config"; 
import { useParams } from "react-router-dom";
export const useGetProcessAndUser = () => {
    let processID = useParams().id;

    let getProcesses = async () => {
        try {
            const processDocRef = doc(database, 'processes', processID);
            const processDocSnap = await getDoc(processDocRef);

            if (processDocSnap.exists()) {
                const process = processDocSnap.data();

                // Fetch user data using patientID from process
                const userDocRef = doc(database, 'patients', process.patientID);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const user = userDocSnap.data();

                    // Download FLAIR and SEG files if URLs are present
                    if (process.flair && process.seg) {
                        const flairBuffer = await downloadFile(process.flair);
                        const segBuffer = await downloadFile(process.seg);

                        // // console.log('Downloaded FLAIR and SEG files');

                        return { process, user, flairBuffer, segBuffer };
                    } else {
                        // // console.log('FLAIR or SEG URL not found in process document');
                        return { process, user };
                    }
                } else {
                    // // console.log('User document not found');
                    return null;
                }
            } else {
                // // console.log('Process document not found');
                return null;
            }
        } catch (error) {
            // // console.error('Error fetching process and user:', error);
            return null;
        }
    };

    const downloadFile = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const arrayBuffer = await response.arrayBuffer();
            return arrayBuffer; // Return ArrayBuffer directly
        } catch (error) {
            // // console.error('Error downloading file:', error);
            throw error;
        }
    };
    return { getProcesses };
};
