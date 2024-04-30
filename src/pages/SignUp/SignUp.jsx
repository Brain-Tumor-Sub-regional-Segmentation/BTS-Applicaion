// SignUp.jsx
import React, { useEffect } from 'react';
import'./SignUp.css'

const SignUp = () => {
    useEffect(() => {
        const wrapper = document.querySelector('.wrapper');
        const registerLink = document.querySelector('.register-link');
        const loginLink = document.querySelector('.login-link');

        const handleRegisterClick = () => {
            wrapper.classList.add('active');
        };

        const handleLoginClick = () => {
            wrapper.classList.remove('active');
        };

        registerLink.addEventListener('click', handleRegisterClick);
        loginLink.addEventListener('click', handleLoginClick);

        return () => {
            registerLink.removeEventListener('click', handleRegisterClick);
            loginLink.removeEventListener('click', handleLoginClick);
        };
    }, []);

    return (
        <>
            <div className="wrapper">

                <span className="rotate-bg"></span>
                <span className="rotate-bg2"></span>

                <div className="form-box login">

                    <h2 className="title animation" style={{ '--i': 0, '--j': 21 , color: "#002844" }}>Login</h2>

                    <form action="#">

                        <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
                            <input type="text" required />
                            <label htmlFor="">Username</label>
                            <i className='bx bxs-user'></i>
                        </div>

                

                        <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
                        <input type="password" 
                           validation={{
                            required: {
                              value: true,
                              message: 'required',
                            },
                            minLength: {
                              value: 6,
                              message: 'min 6 characters',
                            },
                          }}
                                required />
                            <label htmlFor="">Password</label>
                            <i className='bx bxs-lock-alt'></i>
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

                    <form action="#">

                        <div className="input-box animation" style={{ '--i': 18, '--j': 1 }}>
                            <input type="text" required />
                            <label htmlFor="">Username</label>
                            <i className='bx bxs-user'></i>
                        </div>

                        <div className="input-box animation" style={{ '--i': 19, '--j': 2 }}>
                            <input type="email" required />
                            <label htmlFor="">Email</label>
                            <i className='bx bxs-envelope'></i>
                        </div>

                       <div className="input-box animation" style={{ '--i': 21, '--j': 4 }}>
                               <input type="tel" required />
                               <label htmlFor="">Phone Number</label>
                               <i className='bx bxs-phone'></i>
                        </div>
                       <div className="input-box animation" style={{ '--i': 22, '--j': 5 }}>
                            <input type="text" required />
                            <label htmlFor="">Doctor ID</label>
                            <i className='bx bxs-id-card'></i>
                        </div>
                        <div className="input-box animation" style={{ '--i': 20, '--j': 3 }}>
                            <input type="password" required />
                            <label htmlFor="">Password</label>
                            <i className='bx bxs-lock-alt'></i>
                        </div>

                        <button type="submit" className="btn animation" style={{ '--i': 21, '--j': 4 }}>Sign Up</button>

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
