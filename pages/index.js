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

    //if (output) {
      // If the output is not empty, display the div element
      //const divElement = document.getElementById('output-class-suggestions-container');
      //divElement.style.display = 'block' ;
    //}

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
            <h1>AI Bounty Creator</h1>
          </div>
          <div className="header-subtitle">
            <h2>Input a problem statement or feature idea and get a bounty project brief</h2>
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
            onClick={callGenerateEndpoint}>

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

          <div className="output-class-r-container">
            <div className="output-header">
              <h3>Post To A Bounty Board</h3>
            </div>
            <div className="class-cards">
              <div class="card">
                <img class="card__header" src="https://www.hw.ac.uk/programmes/img/Subjects/Computer-Science/AI-test-800x600_rdax_725x544s.jpg" alt="Product image" />
                <h3 class="card__title">Meta Crafters</h3>
                <p class="card__description">AI & Web3 Talent</p>
                <p class="card__price">Fee $0.99</p>
                <button class="card__button">Post Now </button>
              </div>

              <div class="card">
                <img class="card__header" src="https://images5.content-hci.com/commimg/myhotcourses/blog/post/myhc_89683.jpg" alt="Product image" />
                <h3 class="card__title">Gitcoin</h3>
                <p class="card__description">Developers For Opensource Projects</p>
                <p class="card__price">Fee $0.99</p>
                <button class="card__button">Post Now</button>
              </div>

              <div class="card">
                <img class="card__header" src="https://cdn.dribbble.com/userupload/2837889/file/original-324b267be5f0f3fc0b7f1242872d6e3b.jpg?resize=400x0" alt="Product image" />
                <h3 class="card__title">Polygo</h3>
                <p class="card__description">AI features and Operational Automations</p>
                <p class="card__price">Fee $0.99</p>
                <button class="card__button">Post Now</button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
