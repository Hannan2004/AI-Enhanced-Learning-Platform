import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Here you can add the code to send the form data to your server
        alert('Your enquiry has been submitted!');
    };

    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>

            <style>{`
                .contact-container {
                    font-family: 'Arial', sans-serif;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 30px;
                    background-color: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
                }

                h1 {
                    text-align: center;
                    color: #6a0dad;
                    font-size: 28px;
                    margin-bottom: 20px;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                label {
                    font-size: 16px;
                    color: #6a0dad;
                    margin-bottom: 10px;
                    display: block;
                }

                input, textarea {
                    width: 100%;
                    padding: 12px;
                    border: 2px solid #6a0dad;
                    border-radius: 8px;
                    font-size: 16px;
                    background-color: #f7f2ff;
                    color: #333;
                }

                input:focus, textarea:focus {
                    outline: none;
                    border-color: #9a31e6;
                    box-shadow: 0 0 6px rgba(106, 13, 173, 0.5);
                }

                button {
                    width: 100%;
                    padding: 14px;
                    background-color: #6a0dad;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 18px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                button:hover {
                    background-color: #9a31e6;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(106, 13, 173, 0.2);
                }
            `}</style>
        </div>
    );
};

export default Contact;