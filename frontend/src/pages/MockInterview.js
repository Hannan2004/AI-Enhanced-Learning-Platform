import React, { useState } from 'react';

const MockInterview = () => {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');

    // Handle text input for the user question
    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    // Submit the form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userInput) {
            alert('Please enter a question!');
            return;
        }

        const formData = new FormData();
        formData.append('userInput', userInput);

        try {
            const response = await fetch('http://localhost:3001/start-interview', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setResponse(data.interviewResponse);
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong, please try again later.');
        }
    };

    return (
        <div className="container">
            <h1>Mock Interview Chatbot</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="userInput">Your Question:</label>
                    <textarea
                        id="userInput"
                        value={userInput}
                        onChange={handleInputChange}
                        rows="4"
                        placeholder="Ask me anything about your career..."
                    ></textarea>
                </div>

                <button type="submit">Ask</button>
            </form>

            {/* Display the Interview Response */}
            {response && (
                <div className="response">
                    <h3>Chatbot Response:</h3>
                    <p>{response}</p>
                </div>
            )}

            <style>{`
                .container {
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                h1 {
                    text-align: center;
                    color: #333;
                }

                .input-container {
                    margin-bottom: 20px;
                }

                label {
                    font-size: 14px;
                    color: #555;
                    margin-bottom: 8px;
                    display: inline-block;
                }

                textarea {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 16px;
                    resize: vertical;
                }

                button {
                    width: 100%;
                    padding: 12px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                button:hover {
                    background-color: #0056b3;
                }

                .response {
                    margin-top: 30px;
                    padding: 20px;
                    background-color: #e9f7fe;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 123, 255, 0.1);
                }

                .response h3 {
                    color: #0056b3;
                    margin-bottom: 10px;
                }

                .response p {
                    color: #333;
                }
            `}</style>
        </div>
    );
};

export default MockInterview;