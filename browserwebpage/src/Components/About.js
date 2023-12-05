import './style.css'
import React from 'react'
import VinayVamshee from './Images/VinayVamshee.jpg'

export default function About() {
    return (
        <div className='About'>
            <div className='section1'>
                <h1>About The Developer</h1>
            </div>
            <div className="row" style={{ width: '100%' }}>
                <div className="Aboutcard">
                    <img src={VinayVamshee} alt="img" style={{ height: '450px', width: '400px',objectFit:'contain',borderRadius:'50%',  animation: 'SlideBottom 1s forwards' }} />
                    <div className="Aboutcontainer">
                        <h2 className='d-flex justify-content-center mt-2' style={{ fontFamily: 'impact' }}>Vinay Vamshee</h2>
                        <p className="Abouttitle">FullStack Developer</p>
                        <p className='carddescription' style={{ fontFamily: 'monospace' }}>
                            Greetings! I am a third-year Computer Science - IOT student at VIT Vellore, specializing in Web Development.<br />
                            My academic focus revolves around mastering the intricacies of web technologies,
                            where I have passionately contributed as a Frontend Developer in a team project centered on Event Management. <br/><br/>With a commitment to crafting seamless and user-friendly web experiences, I leverage the latest tools and frameworks to bring ideas to life.<br /><br/>
                            Beyond my academic pursuits, my interest extends to the latest advancements in mobile and laptop technologies, exploring the components that drive innovation in the digital realm.<br /> <br/>As a dedicated web developer, I am enthusiastic about staying at the forefront of advancements in the field. Let's collaborate to build impactful and cutting-edge web solutions!
                        </p>
                        <div className='section2'>
                            <h5>About The WebSite</h5>
                            <p>
                            The primary purpose of this website is to streamline your online experience by providing easy access to your essential, favorite, and everyday websites. Designed with user convenience in mind, our platform aims to simplify navigation, saving you time and effort in reaching the destinations that matter most to you. Whether it's accessing important tools, favorite entertainment hubs, or daily information sources, our website is dedicated to enhancing your online accessibility and ensuring a seamless digital journey.
                            </p>
                            <h5>Privacy Assurance</h5>
                        <p>
                        "Rest assured, your data remains private – this website does not store any of your information."
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
