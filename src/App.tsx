import "./App.css";
import { PostForm } from "./components/PostForm";
import { createFirebaseClientApp } from "./lib/firebase";

function App() {
  createFirebaseClientApp();

  return (
    <div className="flex justify-center pt-12">
      <PostForm />
    </div>
  );
}

export default App;
