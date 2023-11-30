// src/components/Dashboard.js
import React from 'react';
import FileUpload from './FileUpload';
import AnswerQuestion from './AskQuestion'
import './App.css'; // Import the CSS
import FileList from './FileList';

const Dashboard = ({ user }) => {
  return (
    <div>
      <div className="container">
      <h1>Welcome to the Dashboard</h1>
      <p>Email: {user.email}</p>
      <h1>Fine-tuned ChatGPT</h1>
      <h2>You can upload your personal files to fine tune </h2>
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
