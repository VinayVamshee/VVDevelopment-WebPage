// import './style.css'
// import { useRef } from 'react'
// import Srinivas from './Images/SrinivasRao.png'
// import { Link } from 'react-router-dom'
// import emailjs from '@emailjs/browser';

// export default function Footer() {

//     const form = useRef();

//     const SendFeedback = (e) => {
//         e.preventDefault();
//         alert("hi")

//         emailjs.sendForm('service_aqzdeqk', 'template_otrzcir', form.current, 'ss9CQ81YavvBu3-nr')
//             .then((result) => {
//                 console.log(result.text);
//             }, (error) => {
//                 console.log(error.text);
//             });
//     }

//     return (
//         <div className='Footer'>
//             <div className="container-fluid bg-dark">
//                 <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 ">
//                     <span className="mb-3 mb-md-0 text-light">© 2023 Company, Inc</span>
//                     <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
//                         <li className="ms-3">
//                             <Link to='/' className="btn btn-outline-light">Home</Link>
//                         </li>
//                         <li className="ms-3"><button className="btn btn-outline-light" type="button" data-bs-toggle="modal" data-bs-target="#AdminInfoModal">Admin Info</button></li>
//                         <li className="ms-3">
//                             <Link to='/About' className="btn btn-outline-light">About</Link>
//                         </li>
//                         <li className="ms-3"><button type="button" data-bs-toggle="modal" data-bs-target="#FeedbackModal" className="btn btn-outline-light">Feedback</button></li>
//                     </ul>
//                 </footer>
//             </div>


//             <div className="modal fade" id="FeedbackModal" tabIndex="-1" aria-labelledby="FeedbackModalLabel" aria-hidden="true">
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                     <form ref={form} onSubmit={SendFeedback}>
//                         <div className="modal-header">
//                             <h1 className="modal-title fs-5" id="FeedbackModalLabel">Feedback</h1>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body text-center ">
//                                 <label>Name :</label>
//                                 <input type='text' name='name' style={{width:'300px'}}></input>
//                                 <label>Email :</label>
//                                 <input type='text' name='email' style={{width:'300px'}}></input>
//                                 <label>Phone No :</label>
//                                 <input type='number' name='number' style={{width:'300px'}}></input>
//                                 <label>Feedback :</label>
//                                 <input type='text' name='message' style={{width:'300px'}}></input>
//                         </div>
//                         <div className="modal-footer">
//                             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                             <button type="submit" className="btn btn-primary">Send</button>
//                         </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>


//             <div className="modal fade" id="AdminInfoModal" tabIndex="-1" aria-labelledby="AdminInfoModalLabel" aria-hidden="true">
//                 <div className="modal-dialog">
//                     <div className="modal-content-Admin">
//                         <div className="modal-header">
//                             <h1 className="modal-title fs-5" style={{ fontFamily: 'impact' }} id="AdminInfoModalLabel">About Admin</h1>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body-Admin">
//                             <div className='details'>
//                                 <div className="detailhead">Name :</div> Pechetti Srinivas Rao<br />
//                                 <div className="detailhead">Designation :</div> Vigilance Cheif Enquiry Inspector<br />
//                                 <div className="detailhead">Contact No. :</div> 9752375075<br />
//                                 <div className="detailhead">Email :</div> rao7473@gmail.com<br />
//                             </div>
//                             <div>
//                                 <img src={Srinivas} alt='...' />
//                             </div>
//                         </div>
//                         <div className="modal-footer">
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
