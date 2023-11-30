# Fine-tuned-ChatGPT

This project lets users to login and uploaded their own personal files to fine-tune the ChatGPT3.5 model by using LangChain.


## Installation

### Go to backend
Install the required packages
```
pip install langchain openai chromadb tiktoken unstructured
```
Add a file called `constants.py` to use your own [OpenAI API key](https://platform.openai.com/account/api-keys)
```
APIKEY = "YOUR KEY"
```
run 
```
python3 app.py
```
to start the backend server.  

### Go to frontend 

run
```
npm install
```
then run 
```
npm start
```

Snapshot of the page:
<img width="939" alt="Screenshot 2023-11-30 at 2 27 02 PM" src="https://github.com/JingyaoGu1/Fine-tuned-ChatGPT/assets/43628019/e54a3787-ec43-4443-82e8-6d59a7b1ffd3">


