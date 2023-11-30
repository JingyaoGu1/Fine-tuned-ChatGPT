// src/components/Dashboard.js
import React from 'react';
import FileUpload from './FileUpload';
import AnswerQuestion from './AskQuestion'
import './App.css'; // Import the CSS
import FileList from './FileList';

const Dashboard = ({ user }) => {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>Email: {user.email}</p>
      <div className="container">
      <h1>Fine-tuned ChatGPT</h1>
      <div className="chatbox">
        <FileUpload />
        <FileList />
      </div>
      <div className="chatbox">
        <AnswerQuestion />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
