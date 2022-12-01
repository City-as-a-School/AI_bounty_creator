import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
//import CityasaschoolLogo from '../assets/buildspace-logo.png';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>ARK | City as a School</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Access all human Knowledge in the blink of an AI</h1>
          </div>
          <div className="header-subtitle">
            <h2>Ask a question, get a course in seconds</h2>
          </div>
        </div>
      </div>
      <div className="prompt-container">
        <textarea
          placeholder="start typing here"
          className="prompt-box"
          value={userInput}
          onChange={onUserChangedText}
        />

        <div className="prompt-buttons">
          <a className={isGenerating ? 'generate-button loading' : 'generate-button'} 
            onClick={callGenerateEndpoint}
          >
            <div className="generate">
            {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
             
            </div>
          </a>
        </div>

        <div className="output">
          <div className="output-header-container">
            <div className="output-header">
              <h3>Output</h3>
            </div>
          </div>
          <div className="output-content">
            <p>{apiOutput}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
