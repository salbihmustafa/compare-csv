import './App.css';
import React from "react";
import UploadForm from './components/UploadForm/UploadForm';

const App = () => {
  return (
    <div className="container">
        <header>Compare CSV</header>
        <div className="content">
            <UploadForm />
        </div>
    </div>
  )
}

export default App;