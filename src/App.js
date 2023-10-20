import "./App.css";
import Quotes from "./components/Quotes";
import Weather from "./components/Weather";

function App() {

/*   async function update(args) {
    const result = await window.Ubridge.Updatebridge(args);
    console.log(result, "2");
  } */


  return (
    <div className="grid gap-16">
      <p>  "CurrentVersion : "0.1.0" </p>
      <Weather />
      <Quotes/>
    </div>
  );
}
 
export default App;
