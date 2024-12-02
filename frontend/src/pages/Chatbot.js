import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { FaEllipsisV, FaTrashAlt, FaShareAlt, FaEdit } from 'react-icons/fa';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [titles, setTitles] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [currentChatIndex, setCurrentChatIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPreTypedMessages, setShowPreTypedMessages] = useState(true);
  const messagesEndRef = useRef(null);

  const keywordDictionary = [
    { keyword: 'MERN', display: 'MERN Stack' },
    { keyword: 'frontend', display: 'Frontend Development' },
    { keyword: 'backend', display: 'Backend Development' },
    { keyword: 'full stack', display: 'Full Stack Development' },
    { keyword: 'react', display: 'React' },
    { keyword: 'node', display: 'Node.js' },
    { keyword: 'express', display: 'Express' },
    { keyword: 'mongodb', display: 'MongoDB' },
    { keyword: 'python', display: 'Python' },
    { keyword: 'machine learning', display: 'Machine Learning' },
    { keyword: 'data science', display: 'Data Science' },
    { keyword: 'devops', display: 'DevOps' },
    { keyword: 'ai', display: 'AI' },
    { keyword: 'blockchain', display: 'Blockchain' },
  ];

  const preTypedMessages = ['Hello!', 'Can you help me with my career?', 'What is MERN stack?', 'Tell me about frontend development'];

  const extractTitle = (input) => {
    for (const { keyword, display } of keywordDictionary) {
      if (input.toLowerCase().includes(keyword.toLowerCase())) {
        return display;
      }
    }
    return input.split(' ').slice(0, 3).join(' ') + (input.split(' ').length > 3 ? '...' : '');
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { user: input };
    const updatedMessages = [...messages];
    if (editMode && editIndex !== null) {
      updatedMessages[editIndex] = newMessage;
      setEditMode(false);
      setEditIndex(null);
    } else {
      updatedMessages.push(newMessage);
    }
    setMessages(updatedMessages);
    setInput('');
    setShowPreTypedMessages(false);

    if (messages.length === 0 || editMode) {
      const title = extractTitle(input);
      setTitles(prevTitles => {
        const updatedTitles = [...prevTitles];
        if (currentChatIndex !== null) {
          updatedTitles[currentChatIndex] = title;
        } else {
          updatedTitles.push(title);
        }
        return updatedTitles;
      });
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/counseling', { input, context: updatedMessages });
      const geminiMessage = { gemini: response.data.response };
      setMessages(prevMessages => [...prevMessages, geminiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    if (currentChatIndex !== null) {
      setChatHistory(prevHistory => {
        const updatedHistory = [...prevHistory];
        updatedHistory[currentChatIndex] = { messages };
        return updatedHistory;
      });
    } else {
      setChatHistory(prevHistory => [...prevHistory, { messages }]);
    }
    setMessages([]);
    setTitles([]);
    setCurrentChatIndex(null);
    setEditMode(false);
    setEditIndex(null);
    setShowPreTypedMessages(true);
  };

  const loadChat = (index) => {
    const chat = chatHistory[index];
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatIndex(index);
      setShowPreTypedMessages(false);
    }
  };

  const deleteChat = (index) => {
    setChatHistory(prev => prev.filter((_, i) => i !== index));
    setTitles(prev => prev.filter((_, i) => i !== index));
    setMessages([]);
    setCurrentChatIndex(null);
    setShowPreTypedMessages(true);
  };

  const shareChat = (index) => {
    const chatUrl = `${window.location.origin}/chat/${index}`;
    navigator.clipboard.writeText(chatUrl).then(() => {
      alert('Chat URL copied to clipboard');
    }, () => {
      alert('Failed to copy URL');
    });
  };

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  const handleEdit = (index) => {
    setEditMode(true);
    setEditIndex(index);
    setInput(messages[index].user);
  };

  const handlePreTypedMessageClick = (message) => {
    setInput(message);
    setShowPreTypedMessages(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#ffffff', // Complete white background color
    },
    sidebar: {
      width: '250px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      padding: '1rem',
      borderRadius: '10px',
      margin: '2rem',
      overflowY: 'auto',
      flexShrink: 0,
    },
    content: {
      flexGrow: 1,
      padding: '2rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      margin: '2rem',
      display: 'flex',
      flexDirection: 'column',
    },
    chatHeader: {
      backgroundColor: 'rgba(0, 123, 255, 0.1)',
      padding: '1rem',
      borderRadius: '10px',
      marginBottom: '1rem',
      color: '#007bff',
    },
    chatArea: {
      flexGrow: 1,
      overflowY: 'auto',
      padding: '1rem',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '10px',
      marginBottom: '1rem',
    },
    inputArea: {
      display: 'flex',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '10px',
      padding: '1rem',
    },
    input: {
      flexGrow: 1,
      padding: '0.75rem',
      borderRadius: '10px 0 0 10px',
      border: 'none',
      outline: 'none',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#000',
    },
    sendButton: {
      padding: '0.75rem 1.5rem',
      borderRadius: '0 10px 10px 0',
      border: 'none',
      backgroundColor: '#007bff',
      color: '#fff',
      cursor: 'pointer',
    },
    message: {
      marginBottom: '1rem',
    },
    userMessage: {
      backgroundColor: 'rgba(0, 123, 255, 0.1)',
      padding: '1rem',
      borderRadius: '10px',
      textAlign: 'right',
      color: '#007bff',
    },
    geminiMessage: {
      backgroundColor: 'rgba(40, 167, 69, 0.1)',
      padding: '1rem',
      borderRadius: '10px',
      textAlign: 'left',
      color: '#28a745',
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '1rem',
    },
    loader: {
      border: '4px solid rgba(0, 0, 0, 0.1)',
      borderLeftColor: '#007bff',
      borderRadius: '50%',
      width: '36px',
      height: '36px',
      animation: 'spin 1s linear infinite',
    },
    preTypedMessages: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '1rem',
    },
    preTypedMessage: {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '0.5rem 1rem',
      borderRadius: '10px',
      margin: '0 0.5rem',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={{ marginBottom: '1rem', color: '#007bff' }}>Chat History</h2>
        <div>
          {titles.map((title, index) => (
            <div key={index} style={{ marginBottom: '1rem', cursor: 'pointer', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: '10px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' }}>
              <div onClick={() => loadChat(index)}>{title}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <FaEdit onClick={() => handleEdit(index)} style={{ cursor: 'pointer' }} />
                <FaTrashAlt onClick={() => deleteChat(index)} style={{ cursor: 'pointer' }} />
                <FaShareAlt onClick={() => shareChat(index)} style={{ cursor: 'pointer' }} />
              </div>
            </div>
          ))}
          <button
            onClick={startNewChat}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            + New Chat
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={styles.content}>
        <div style={styles.chatHeader}>
          <h2>Career Guidance Chatbot</h2>
        </div>
        {showPreTypedMessages && (
          <div style={styles.preTypedMessages}>
            {preTypedMessages.map((message, index) => (
              <div key={index} style={styles.preTypedMessage} onClick={() => handlePreTypedMessageClick(message)}>
                {message}
              </div>
            ))}
          </div>
        )}
        <div style={styles.chatArea}>
          {messages.map((msg, index) => (
            <div key={index} style={styles.message}>
              {msg.user ? (
                <div style={styles.userMessage}>
                  <strong>You:</strong> {msg.user}
                </div>
              ) : (
                <div style={styles.geminiMessage}>
                  <strong>Gemini:</strong> <ReactMarkdown>{msg.gemini}</ReactMarkdown>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div style={styles.loading}>
              <div style={styles.loader}></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div style={styles.inputArea}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            style={styles.input}
            placeholder="Hint: Start by saying Hello!!!"
          />
          <button onClick={sendMessage} style={styles.sendButton}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;