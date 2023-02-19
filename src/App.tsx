import "./App.css";
import { PostForm } from "./components/PostForm";
import { createFirebaseClientApp } from "./lib/firebase";

function App() {
  createFirebaseClientApp();

  return (
    <div className="App">
      <PostForm />
    </div>
  );
}

export default App;
