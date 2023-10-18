import "./App.css";
import Quotes from "./components/Quotes";
import Weather from "./components/Weather";

function App() {
  async function clicked(args) {
    const result = await window.myApp.sayHello(args);
    console.log(result, "3");
  }

  return (
    <div className="grid gap-16">
      <Weather />
      <Quotes />
      <button onClick={() => clicked("I am from APP process")}>
        CLICK HERE
      </button>
    </div>
  );
}

export default App;
