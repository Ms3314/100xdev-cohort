import './App.css';
import useDebounce from './hooks/useDebounce';

function App() {
  function sendDataTo() {
    console.log("Hallelujah");
  }

  const debouncedSendDataTo = useDebounce(sendDataTo, 300);

  return (
    <div>
      <input type="text" onChange={debouncedSendDataTo} />
    </div>
  );
}

export default App;

