// import React, { useState } from 'react';
// import axios from 'axios';

// const AskQuestion = () => {
//   const [query, setQuery] = useState('');
//   const [answer, setAnswer] = useState('');

//   const handleQueryChange = (event) => {
//     setQuery(event.target.value);
//   };

//   const handleSubmit = async () => {
//     if (!query) {
//       alert('Please enter a question!');
//       return;
//     }

//     try {
//       const response = await axios.post('http://127.0.0.1:5000/ask', { query });
//       setAnswer(response.data.answer);
//     } catch (error) {
//       console.error('Error asking question:', error);
//       alert('Error asking question');
//     }
//   };

//   return (
//     <div>
//       <input type="text" value={query} onChange={handleQueryChange} placeholder="Ask a question" />
//       <button onClick={handleSubmit}>Ask</button>
//       <p className="answer">Answer: {answer}</p>
//     </div>
//   );
// };

// export default AskQuestion;

import React, { useState } from 'react';
import axios from 'axios';

const AskQuestion = () => {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async () => {
    if (!query) {
      alert('Please enter a question!');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/ask', { query });
      setChatHistory([...chatHistory, { question: query, answer: response.data.answer }]);
      setQuery(''); // Clear the query input after submitting
    } catch (error) {
      console.error('Error asking question:', error);
      alert('Error asking question');
    }
  };

  const clearChatHistory = () => {
    setChatHistory([]);  // Clear the chat history state
  };

  return (
    <div>
      <div>
        {chatHistory.map((item, index) => (
          <div key={index} className="chat-item">
            <p className="question">Q: {item.question}</p>
            <p className="answer">A: {item.answer}</p>
          </div>
        ))}
      </div>
      <input type="text" value={query} onChange={handleQueryChange} placeholder="Ask a question" />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={clearChatHistory}>Clear Chat History</button>
    </div>
  );
};

export default AskQuestion;
