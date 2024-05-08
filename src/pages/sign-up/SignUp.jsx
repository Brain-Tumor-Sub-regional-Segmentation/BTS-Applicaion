// SignUp.jsx
import React, {useState, useEffect } from 'react';
import'./SignUp.css'
import { auth } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailInUseError, setEmailInUseError] = useState(null);
    const [wrongCredentialsError, setWrongCredentialsError] = useState(null);
   
    const navigate = useNavigate();

    // State for toggling password visibility
    const [showPassword, setShowPassword] = useState(false); 


    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    useEffect(() => {
        const wrapper = document.querySelector('.wrapper');
        const registerLink = document.querySelector('.register-link');
        const loginLink = document.querySelector('.login-link');

        const handleRegisterClick = () => {
            wrapper.classList.add('active');
            // Reset input fields when switching to sign-up form
            resetInputFields();
        };

        const handleLoginClick = () => {
            wrapper.classList.remove('active');
             // Reset input fields when switching to login form
             console.log("hello")
             resetInputFields();
             console.log(password,"ana hena");
        };

        registerLink.addEventListener('click', handleRegisterClick);
        loginLink.addEventListener('click', handleLoginClick);

        return () => {
            registerLink.removeEventListener('click', handleRegisterClick);
            loginLink.removeEventListener('click', handleLoginClick);
            
        };
    }, []);

    const resetInputFields = () => {
        setUsername('');
        setEmail('');
        setPhoneNumber('');
        setDoctorId('');
        setPassword('');
        setPasswordError('');
        setPhoneNumberError('');
    };


    /*const hashPassword = async (password) => {
        try {
            const saltRounds = 10; // Number of salt rounds
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            return hashedPassword;
        } catch (error) {
            console.error('Error hashing password:', error);
            return null;
        }
    };*/

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const handlePhoneNumberChange = (e) => {
        const newPhoneNumber = e.target.value;
        setPhoneNumber(newPhoneNumber);
        validatePhoneNumber(newPhoneNumber);
    };

    const validatePassword = (password) => {
        //console.log("password->", password);
        // Regular expression for strong password
        const strongPasswordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
        if (!password) {
            // If password is empty, clear the error message
            setPasswordError('');
        } else if (!strongPasswordRegex.test(password)) {
            // If password is not valid, set the error message
            //setPasswordError('Password must be at least 8 characters long and contain at least one digit, one letter, and one special character.');
            setPasswordError('password must be strong');
        } else {
            // If password is valid, clear the error message
            setPasswordError('');
        }
    };

    const validatePhoneNumber = (phoneNumber) => {
        
        // Regular expression for phone number validation
        const phoneNumberRegex = /^\d{11}$/;
        if (!phoneNumberRegex.test(phoneNumber)) {
            setPhoneNumberError('Please enter a valid 11-digit phone number.');
        } else {
            setPhoneNumberError('');
        }
    };

    const validateEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    // Function to handle email input change
    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        // Validate the new email format
        if (!validateEmail(newEmail)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault(); // Prevent form submission

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
            navigate("/home/patients")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    
        //     return { success: true, message: 'Login successful' };
        // } catch (error) {
        //     // Handle Firebase authentication error
        //     console.error('Error logging in:', error.code);
        //     // You can handle different error codes and display appropriate messages
        //     if (error.code === 'auth/invalid-credential') {
        //         console.log('Invalid email or password');
        //         setWrongCredentialsError('Invalid email or password')
        //         return { success: false, message: 'Invalid email or password' };
        //     } else {
        //         console.log('An error occurred while logging in');
        //         return { success: false, message: 'An error occurred while logging in' };
        //     }
        // }
    };
    
    const handleSubmitSignUp = async (e) => {
        e.preventDefault(); // Prevent form submission
    
        // Perform validation before submitting the form
        validatePassword(password);
        validatePhoneNumber(phoneNumber);
    
        // If there are no errors, you can proceed with form submission
        if (!passwordError && !phoneNumberError) {
            await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                resetInputFields()
                navigate("/home/patients")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // // You can handle different error codes and display appropriate messages
                if (error.code === 'auth/email-already-in-use') {
                    setEmailInUseError('Email is already in use');
                }
            });
        } else {
            console.log('Form has errors, cannot submit.');
        }
    };
    
    const handleSwitchToLogin = () => {
        setWrongCredentialsError('');
        setEmailInUseError('');
        // Any other necessary logic for switching to the login form
    };
    
    const handleSwitchToSignUp = () => {
        setWrongCredentialsError('');
        setEmailInUseError('');
        // Any other necessary logic for switching to the signup form
    };
    
  
    return (
        <div className="sign-up">
            <div className="wrapper">
                <span className="rotate-bg"></span>
                <span className="rotate-bg2"></span>

                <div className="form-box login">
                    <h2 className="title animation" style={{ '--i': 0, '--j': 21 , color: "#002844" }}>Login</h2>

                    <form action="#" onSubmit={handleSubmitLogin}>

                         <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
                         <input type="email" value={email} onChange={handleEmailChange} required />
                          <label htmlFor="">Email</label>
                          <i className='bx bxs-envelope'></i>
                          {emailError && <span className="error-message">{emailError}</span>}
                           </div>

                       
                        <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
                        <input type={showPassword ? 'text' : 'password'}  value={password} onChange={(e)=>setPassword(e.target.value) } required />
                        <label htmlFor="">Password</label>  
                        <span className="toggle-password" onClick={handleTogglePasswordVisibility}>
                     <i className={showPassword ? 'bx bxs-show' : 'bx bxs-hide'}></i>
                       </span>
                        </div>
                        {wrongCredentialsError && <div className="alert-message" style={{ color: 'red', marginBottom: '10px' }}>{wrongCredentialsError}</div>}

                        <button type="submit" className="btn animation" style={{ '--i': 3, '--j': 24, marginTop: '10px' }}>Login</button>

                        <div className="linkTxt animation" style={{ '--i': 5, '--j': 25 }}>
                <p>Don't have an account? <a href="#" className="register-link" onClick={handleSwitchToSignUp}>Sign Up</a></p>
            </div>

                    </form>
                </div>

                <div className="info-text login">
                    <h2 className="animation" style={{ '--i': 0, '--j': 20 }}><img src="images/white_logo.png" alt="yarab"style={{ width: '80px', height: '80px', marginRight: '10px' }} /> <br/><br/> Welcome Back!</h2>
                    <p className="animation" style={{ '--i': 1, '--j': 21 }}>Brain Tumor Segmentation Community.</p>
                </div>

                <div className="form-box register">

                    <h2 className="title animation" style={{ '--i': 17, '--j': 0 , color: "#002844"}}>Sign Up</h2>

                    <form action="#" onSubmit={handleSubmitSignUp}>

                        <div className="input-box animation" style={{ '--i': 18, '--j': 1 }}>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            <label htmlFor="">Username</label>
                            <i className='bx bxs-user'></i>
                        </div>

                        
                        <div className="input-box animation" style={{ '--i': 19, '--j': 2 }}>
                         <input type="email" value={email} onChange={handleEmailChange} required />
                          <label htmlFor="">Email</label>
                          <i className='bx bxs-envelope'></i>
                          {emailError && <span className="error-message">{emailError}</span>}
                           </div>

                       <div className="input-box animation" style={{ '--i': 21, '--j': 4 }}>
                               <input type="tel" value ={phoneNumber} onChange={handlePhoneNumberChange} required />
                               <label htmlFor="">Phone Number</label>
                               <i className='bx bxs-phone'></i>
                               {phoneNumberError && <span className="error-message">{phoneNumberError}</span>}
                               
                        </div>
                       <div className="input-box animation" style={{ '--i': 22, '--j': 5 }}>
                           <input type="text" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required />
                            <label htmlFor="">Doctor ID</label>
                            <i className='bx bxs-id-card'></i>
                        </div> 
                        <div className="input-box animation" style={{ '--i': 20, '--j': 3 }}>
                        <input type={showPassword ? 'text' : 'password'}  value={password} onChange={handlePasswordChange} required />
                            <label htmlFor="">Password</label>
                            {/*<i className='bx bxs-lock-alt'></i>*/}
                            <div className="error-message-container">
                               {passwordError && <span className="error-message">{passwordError}</span>}
                            </div>
                              {/* Toggle password visibility icon */}
                        <span className="toggle-password" onClick={handleTogglePasswordVisibility}>
                     <i className={showPassword ? 'bx bxs-show' : 'bx bxs-hide'}></i>
                </span>
                        </div>
                       
                        {emailInUseError && <div className="alert-message" style={{ color: 'red' , marginBottom: '10px'}}>{emailInUseError}</div>}
                        <button type="submit" className="btn animation" style={{ '--i': 21, '--j': 4 ,marginTop: '10px'}} >Sign Up</button>

                        <div className="linkTxt animation" style={{ '--i': 22, '--j': 5 }}>
                <p>Already have an account? <a href="#" className="login-link" onClick={handleSwitchToLogin}>Login</a></p>
            </div>

                    </form>
                </div>

                <div className="info-text register">
                    
                    <h2 className="animation" style={{ '--i': 17, '--j': 0 }} ><img src="images/white_logo.png" alt="yarab"style={{ width: '80px', height: '80px', marginRight: '10px' }} /> <br/><br/>  Welcome BTS</h2>
                    <p className="animation" style={{ '--i': 18, '--j': 1 }}>Brain Tumor Segmentation Community</p>
                </div>

            </div>
        </div>
    );
};

export default SignUp;
