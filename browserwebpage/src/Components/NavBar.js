import './style.css'
import React, { useState, useEffect } from 'react'
import { useRef } from 'react'
import Srinivas from './Images/SrinivasRao3.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import emailjs from '@emailjs/browser';

const ThemeStored = () => {
    let Theme = localStorage.getItem('Theme');
    if (Theme) {
        return (
            JSON.parse(localStorage.getItem('Theme'))
        )
    }
    else {
        return [];
    }
}

export default function NavBar() {

    const navigate = useNavigate();
    const location = useLocation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const AddAdmin = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://vv-development-web-page-server.vercel.app/Register', { username, password })
                .then(result => console.log(result))
                .catch(error => console.log(error))
            alert('User Registration Successful')
        } catch (error) {
            console.log(error);
        }
    }

    const CheckAdmin = async (e) => {
        e.preventDefault();
        axios.post('https://vv-development-web-page-server.vercel.app/Login', { username, password })
            .then(result => {
                if (result.data === 'Login Successful') {
                    alert('Login Successful')
                    navigate('/AdministratorPage')
                }
                else if ('Please Check the Password') {
                    alert('Incorrect Password')
                }
                else {
                    alert('Error')
                }
            })
            .catch(error => console.log(error))
    }

    const [Theme, setTheme] = useState(ThemeStored);
    const ChangeTheme = () => {
        if (Theme === 'light-theme') {
            setTheme('dark-theme');
        }
        else {
            setTheme('light-theme')
        }
        window.location.reload();
    }

    useEffect(() => {
        localStorage.setItem('Theme', JSON.stringify(Theme))
    }, [Theme]);

    const form = useRef();

    const SendFeedback = (e) => {
        e.preventDefault();
        alert("hi")

        emailjs.sendForm('service_aqzdeqk', 'template_otrzcir', form.current, 'ss9CQ81YavvBu3-nr')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    return (
        <div className='NavBar'>
            <div className='Navigation'>
                <Link to='/' className="btn btn-outline-secondary">Home</Link>
                <button className="btn btn-outline-secondary" type="button" data-bs-toggle="modal" data-bs-target="#AdminInfoModal">Admin Info</button>
                <Link to='/About' className="btn btn-outline-secondary">About</Link>
                <button type="button" data-bs-toggle="modal" data-bs-target="#FeedbackModal" className="btn btn-outline-secondary">Feedback</button>
            </div>

            <div className='LogIn'>
                <button className='btn btn-outline-secondary mx-1' onClick={ChangeTheme}>Theme</button>
                {
                    location.pathname === '/AdministratorPage' ?
                        <button className='btn btn-success mx-3' type="button" data-bs-toggle="modal" data-bs-target="#RegisterModal">
                            Add New Admin
                        </button>
                        :
                        null
                }
                {
                    location.pathname === '/AdministratorPage' ?
                        <Link to='/' className='btn btn-info'>Admin Logout</Link>
                        :
                        <button className='btn btn-danger' type="button" data-bs-toggle="modal" data-bs-target="#LoginModal">
                            Login
                            <i className="fa-solid fa-right-to-bracket ms-2 fa-lg" />
                        </button>
                }
            </div>
            
            {/* Login Modal */}
            <div className="modal fade" id="LoginModal" tabIndex="-1" aria-labelledby="LoginModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header p-5 pb-4 border-bottom-0">
                            <h1 className="fw-bold mb-0 fs-2" style={{ fontFamily: '' }}>Admin</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body p-5 pt-0">
                            <form id='LoginForm' onSubmit={CheckAdmin}>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control rounded-3" id="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="" data-temp-mail-org="0" />
                                    <label htmlFor="floatingInput">Username</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control rounded-3" id="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Log In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Register Modal */}
            <div className="modal fade" id="RegisterModal" tabIndex="-1" aria-labelledby="RegisterModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header p-5 pb-4 border-bottom-0">
                            <h1 className="fw-bold mb-0 fs-2" style={{ fontFamily: '' }}>Register New Admin</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body p-5 pt-0">
                            <form id='RegisterForm' onSubmit={AddAdmin}>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control rounded-3" id="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="" data-temp-mail-org="0" />
                                    <label htmlFor="floatingInput">Username</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control rounded-3" id="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="" />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" data-bs-dismiss="modal" type="submit">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback Modal */}
            <div className="modal fade" id="FeedbackModal" tabIndex="-1" aria-labelledby="FeedbackModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form ref={form} onSubmit={SendFeedback}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="FeedbackModalLabel">Feedback</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Please Share any Website Suggestion to Add to this Web Page<br/>
                                and Give Your Feedback..!
                                <label>Name :</label>
                                <input type='text' name='name' style={{ width: '300px' }}></input>
                                <label>Email :</label>
                                <input type='text' name='email' style={{ width: '300px' }}></input>
                                <label>Phone No :</label>
                                <input type='number' name='number' style={{ width: '300px' }}></input>
                                <label>Feedback :</label>
                                <input type='text' name='message' style={{ width: '400px',height:'100px' }}></input>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* outline-secondary */}
            <div className="modal fade" id="AdminInfoModal" tabIndex="-1" aria-labelledby="AdminInfoModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content-Admin">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" style={{ fontFamily: 'impact' }} id="AdminInfoModalLabel">About Admin</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body-Admin">
                            <div className='details'>
                                <div className="detailhead">Name :</div> Pechetti Srinivas Rao<br />
                                <div className="detailhead">Designation :</div>Cheif Enquiry Inspector/ HQ/SECR/Bilaspur<br />
                                <div className="detailhead">Contact No. :</div> 9752375075<br />
                                <div className="detailhead">Email :</div> cvipsecr@gmail.com<br />
                            </div>
                            <div>
                                <img src={Srinivas} alt='...' />
                            </div>
                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
