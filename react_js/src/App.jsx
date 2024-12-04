import "./App.css";
import RenderData from "./components/RenderData";

function App() {
  return (
    <>
      <div className="text-center flex justify-center w-full mb-5 mt-3">
        <h1>Task Management</h1>
      </div>
      <RenderData />
    </>
  );
}

export default App;
