import "./App.css";
import Quotes from "./components/Quotes";
import Weather from "./components/Weather";

function App() {
  
  return (
    <div className="grid gap-16">
      <Weather />
      <Quotes />
    </div>
  );
}

export default App;
