import { useState } from 'react';
import { useSquid } from '@squidcloud/react';
import './AskAI.css';
import LoadingIndicator from './LoadingIndicator';
import { useUser } from '@clerk/clerk-react';

function AskAI() {
  const {user} = useUser()
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const squid = useSquid();

  const handleQuery = async (text: string) => {
    if (!text) return;
    setLoading(true);
    const email = user?.primaryEmailAddress?.emailAddress
    const modifiedText = text + ' Consider only those database entries where email equals ' + email + '. Do not refer to the email in the response.'
    console.log('modifiedText:', modifiedText)
    const result = await squid.executeFunction('askQuestion', modifiedText);
    setResult(result);
    setText('');
    setLoading(false);
  };

  const closeResult = () => {
    setResult('');
  };

  return (
    <div className="container">
      <h3>Ask a Question!</h3>
      <form onSubmit={(e) => {e.preventDefault(); handleQuery(text)}}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {loading ? (
          <LoadingIndicator />
        ) : (
          <button type='submit'>Ask</button>
        )}
      </form>
      {result && (
        <div className="result-container">
          <textarea value={result} rows={4} />
          <button onClick={closeResult} className="close-button"></button>
        </div>
      )}
    </div>
  );
}

export default AskAI;