import React, { useState } from 'react';
import { FaEnvelope, FaTimes, FaPaperPlane } from 'react-icons/fa';

const MessagesSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'John Doe',
      message: 'Hi, I have a question about the job posting.',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      sender: 'Sarah Smith',
      message: 'Thank you for your response.',
      time: '1 day ago',
      unread: false
    },
    {
      id: 3,
      sender: 'Mike Johnson',
      message: 'When can we schedule an interview?',
      time: '3 days ago',
      unread: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const toggleMessages = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (id) => {
    setMessages(messages.map(message =>
      message.id === id ? { ...message, unread: false } : message
    ));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: 'You',
        message: newMessage,
        time: 'Just now',
        unread: false
      };
      setMessages([newMsg, ...messages]);
      setNewMessage('');
    }
  };

  const unreadCount = messages.filter(m => m.unread).length;

  return (
    <>
      <button className="messages-toggle" onClick={toggleMessages}>
        <FaEnvelope />
        {unreadCount > 0 && <span className="messages-badge">{unreadCount}</span>}
      </button>

      <div className={`messages-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="messages-header">
          <h3>Messages</h3>
          <button className="close-messages" onClick={toggleMessages}>
            <FaTimes />
          </button>
        </div>

        <div className="messages-list">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`message-item ${message.unread ? 'unread' : 'read'}`}
              onClick={() => markAsRead(message.id)}
            >
              <div className="message-content">
                <div className="message-header">
                  <h4>{message.sender}</h4>
                  <span className="message-time">{message.time}</span>
                </div>
                <p>{message.message}</p>
              </div>
            </div>
          ))}
        </div>

        <form className="message-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit">
            <FaPaperPlane />
          </button>
        </form>
      </div>

      {isOpen && (
        <div className="messages-overlay" onClick={toggleMessages}></div>
      )}
    </>
  );
};

export default MessagesSidebar; 
