// SignUp.jsx
import React, {useState, useEffect } from 'react';
import'./SignUp.css'


const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

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
        console.log("password->", password);
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

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission

        // Perform validation before submitting the form
        validatePassword(password);
        validatePhoneNumber(phoneNumber);

        // If there are no errors, you can proceed with form submission
        if (!passwordError && !phoneNumberError) {
            // Perform form submission logic here
            console.log('Form submitted successfully');
            //and route to home page
        } else {
            console.log('Form has errors, cannot submit.');
        }
    
    };


    return (
        <>
            <div className="wrapper">

                <span className="rotate-bg"></span>
                <span className="rotate-bg2"></span>

                <div className="form-box login">

                    <h2 className="title animation" style={{ '--i': 0, '--j': 21 , color: "#002844" }}>Login</h2>

                    <form action="#">

                        <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            <label htmlFor="">Username</label>
                            <i className='bx bxs-user'></i>
                        </div>

                

                        <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
                        <input type="password" value={password} onChange={handlePasswordChange} required />
                        <label htmlFor="">Password</label>
                           {/* <i className='bx bxs-lock-alt'></i>*/}
                              {/* Toggle password visibility icon */}
                        <span className="toggle-password" onClick={handleTogglePasswordVisibility}>
                     <i className={showPassword ? 'bx bxs-hide' : 'bx bxs-show'}></i>
                  </span>
                        </div>

                        <button type="submit" className="btn animation" style={{ '--i': 3, '--j': 24 }}>Login</button>

                        <div className="linkTxt animation" style={{ '--i': 5, '--j': 25 }}>
                            <p>Don't have an account? <a href="#" className="register-link">Sign Up</a></p>
                        </div>

                    </form>
                </div>

                <div className="info-text login">
                    <h2 className="animation" style={{ '--i': 0, '--j': 20 }}><img src="images/white_logo.png" alt="yarab"style={{ width: '80px', height: '80px', marginRight: '10px' }} /> <br/><br/> Welcome Back!</h2>
                    <p className="animation" style={{ '--i': 1, '--j': 21 }}>Brain Tumor Segmentation Community.</p>
                </div>

                <div className="form-box register">

                    <h2 className="title animation" style={{ '--i': 17, '--j': 0 , color: "#002844"}}>Sign Up</h2>

                    <form action="#" onSubmit={handleSubmit}>

                        <div className="input-box animation" style={{ '--i': 18, '--j': 1 }}>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            <label htmlFor="">Username</label>
                            <i className='bx bxs-user'></i>
                        </div>

                        <div className="input-box animation" style={{ '--i': 19, '--j': 2 }}>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <label htmlFor="">Email</label>
                            <i className='bx bxs-envelope'></i>
                        </div>

                       <div className="input-box animation" style={{ '--i': 21, '--j': 4 }}>
                               <input type="tel" onChange={handlePhoneNumberChange} required />
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
                        <input type={showPassword ? 'text' : 'password'} onChange={handlePasswordChange} required />
                            <label htmlFor="">Password</label>
                            {/*<i className='bx bxs-lock-alt'></i>*/}
                            <div className="error-message-container">
                               {passwordError && <span className="error-message">{passwordError}</span>}
                            </div>
                              {/* Toggle password visibility icon */}
                        <span className="toggle-password" onClick={handleTogglePasswordVisibility}>
                     <i className={showPassword ? 'bx bxs-hide' : 'bx bxs-show'}></i>
                </span>
                        </div>
                       

                        <button type="submit" className="btn animation" style={{ '--i': 21, '--j': 4 ,marginTop: '10px'}} >Sign Up</button>

                        <div className="linkTxt animation" style={{ '--i': 22, '--j': 5 }}>
                            <p>Already have an account? <a href="#" className="login-link">Login</a></p>
                        </div>

                    </form>
                </div>

                <div className="info-text register">
                    
                    <h2 className="animation" style={{ '--i': 17, '--j': 0 }} ><img src="images/white_logo.png" alt="yarab"style={{ width: '80px', height: '80px', marginRight: '10px' }} /> <br/><br/>  Welcome BTS</h2>
                    <p className="animation" style={{ '--i': 18, '--j': 1 }}>Brain Tumor Segmentation Community</p>
                </div>

            </div>
        </>
    );
};

export default SignUp;
