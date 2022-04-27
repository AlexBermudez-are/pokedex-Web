import React from 'react'
import { ReactComponent as Linkedin } from '../../Assets/Icons/linkedin.svg'
import { ReactComponent as Github } from '../../Assets/Icons/github.svg'
import { ReactComponent as Portfolio } from '../../Assets/Icons/portfolio.svg'
import './Footer.css'

const Footer = () => {
    return (
        <div className='container-Footer-Component'>
            <section className="get-In-Touch">
                <p>GET IN TOUCH:</p>
            </section>
            <section className="icons-Container">
                <a href="https://www.linkedin.com/in/edwin-alexis-berm%C3%BAdez-0379621b6/" target="_blank" rel="noopener noreferrer">
                <Linkedin className='linkedin' />
                </a>
                <a href="http://github.com/AlexBermudez-are" target="_blank" rel="noopener noreferrer">
                    <Github className='github' />
                </a>
                <a
                    href="https://portfolio-alexis-bermudez.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer">
                    <Portfolio className='portfolio' />
                </a>
            </section>
        </div>
    )
}

export default Footer