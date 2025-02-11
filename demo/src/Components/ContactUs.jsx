import React from 'react';
import '../styles/Home.css';

const ContactUs = () => {
    return (
        <div className="contact-section">
            <div
                className="contact-header"
                data-aos="fade-down"
                data-aos-duration="1200"
                data-aos-delay="200"
            ><h1>
                    Contact Us
                </h1>
                <p>We’d love to hear from you! Reach out us.</p>
                <p>Your thoughts mean the world to us. We’ll do our best!</p>

            </div>
            <form
                className="contact-form"
                data-aos="zoom-in"
                data-aos-duration="1200"
                data-aos-delay="400"
            >
                <div
                    className="form-group"
                >
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Your Full Name" required />
                </div>
                <div
                    className="form-group"
                >
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Your Email Address" required />
                </div>
                <div
                    className="form-group"
                >
                    <label htmlFor="message">Message</label>
                    <textarea id="message" rows="6" placeholder="Write your message here..." required></textarea>
                </div>
                <button
                    type="submit"
                    className="submit-btn"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default ContactUs;
