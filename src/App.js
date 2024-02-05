import "./App.css";
import Calendar from "./components/Calendar";
import TodoWrapper from "./components/TodoWrapper";

function App() {
  return (
    <div className="App">
      <section>
        <TodoWrapper />
      </section>
      <section><Calendar/></section>
    </div>
  );
}

export default App;
