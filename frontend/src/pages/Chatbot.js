import React, { useState, useEffect, useRef } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { FaComments } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import AiAvatar from '../assets/images/AI-avatar.png';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { user: input }]);
    setInput('');
    // Simulated bot response
    setTimeout(() => {
      setMessages((prev) => [...prev, { bot: 'Some Error Occurred! Please Try Again' }]);
    }, 1000);
  };

  const styles = {
    floatingButton: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#007bff',
      color: '#fff',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      zIndex: 1000,
    },
    modalStyle: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
      height: '600px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    },
    header: {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
    },
    status: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    chatArea: {
      flexGrow: 1,
      padding: '1rem',
      overflowY: 'auto',
      backgroundColor: '#f9f9f9',
    },
    inputArea: {
      display: 'flex',
      padding: '10px',
      borderTop: '1px solid #ddd',
      backgroundColor: '#fff',
    },
    input: {
      flexGrow: 1,
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      marginRight: '10px',
      outline: 'none',
    },
    sendButton: {
      padding: '10px 15px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    message: {
      marginBottom: '10px',
    },
    botMessage: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
    },
    userMessage: {
      textAlign: 'right',
    },
    messageBubble: {
      padding: '10px',
      borderRadius: '10px',
      maxWidth: '70%',
    },
    botBubble: {
      backgroundColor: '#f1f1f1',
    },
    userBubble: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
  };

  return (
    <div>
      <div style={styles.floatingButton} onClick={handleOpen}>
        <FaComments size={30} />
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box style={styles.modalStyle}>
          <div style={styles.header}>
            <Typography variant="h6">Chat with us</Typography>
            <div style={styles.status}>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  backgroundColor: 'green',
                  borderRadius: '50%',
                  display: 'inline-block',
                }}
              />
              <Typography>Online</Typography>
            </div>
            <AiOutlineClose size={20} style={{ cursor: 'pointer' }} onClick={handleClose} />
          </div>
          <div style={styles.chatArea}>
            {messages.map((msg, index) => (
              <div key={index} style={styles.message}>
                {msg.bot ? (
                  <div style={{ ...styles.botMessage, ...styles.messageBubble, ...styles.botBubble }}>
                    <img src={AiAvatar} alt="Bot" style={{ width: '30px', borderRadius: '50%' }} />
                    <Typography>{msg.bot}</Typography>
                  </div>
                ) : (
                  <div
                    style={{
                      ...styles.userMessage,
                      ...styles.messageBubble,
                      ...styles.userBubble,
                    }}
                  >
                    <Typography>{msg.user}</Typography>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              style={styles.input}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} style={styles.sendButton}>
              Send
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ChatBot;
