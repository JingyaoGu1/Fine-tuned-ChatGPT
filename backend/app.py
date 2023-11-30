import os
import sys
import openai
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from langchain.chains import ConversationalRetrievalChain
from langchain.chat_models import ChatOpenAI
from langchain.document_loaders import DirectoryLoader
from langchain.embeddings import OpenAIEmbeddings
from langchain.indexes import VectorstoreIndexCreator
from langchain.indexes.vectorstore import VectorStoreIndexWrapper
from langchain.vectorstores import Chroma
import constants
from flask_cors import CORS  # Import CORS
from werkzeug.utils import secure_filename

# Flask app setup
app = Flask(__name__)
CORS(app)  # If CORS is needed

# OpenAI API key
os.environ["OPENAI_API_KEY"] = constants.APIKEY
PERSIST = False

# Directory to store uploaded resumes
UPLOAD_FOLDER = 'path/to/uploaded/resumes'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'resume' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['resume']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({'message': 'File uploaded successfully'}), 200
    
@app.route('/files', methods=['GET'])
def list_files():
    files = []
    for filename in os.listdir(app.config['UPLOAD_FOLDER']):
        path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if os.path.isfile(path):
            files.append(filename)
    return jsonify(files)

@app.route('/clear-files', methods=['POST'])
def clear_files():
    for filename in os.listdir(app.config['UPLOAD_FOLDER']):
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if os.path.isfile(file_path):
            os.remove(file_path)
    return jsonify({'message': 'All files have been deleted'})


@app.route('/ask', methods=['POST'])
def ask_question():
    query = request.json.get('query')
    if not query:
        return jsonify({'error': 'No query provided'}), 400

    # Initialize chain with updated data
    loader = DirectoryLoader(UPLOAD_FOLDER)
    print('files uploaded:', loader)
    if PERSIST:
        index = VectorstoreIndexCreator(vectorstore_kwargs={"persist_directory": "persist"}).from_loaders([loader])
    else:
        index = VectorstoreIndexCreator().from_loaders([loader])

    print(index)
    
    chain = ConversationalRetrievalChain.from_llm(
      llm=ChatOpenAI(model="gpt-3.5-turbo"),
      retriever=index.vectorstore.as_retriever(search_kwargs={"k": 1}),
    )
    

    chat_history = []  # Assuming a new session for each API call
    result = chain({"question": query, "chat_history": chat_history})
    return jsonify({'answer': result['answer']}), 200

if __name__ == '__main__':
    app.run(debug=True)
