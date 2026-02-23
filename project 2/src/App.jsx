import './App.css'
import Navigation from "./components/Navigation/Navigation..jsx";
import ContactHeader from './components/ContactHeader/ContactHeader.jsx';
import ContactForm from './components/ContactForm/ContactForm.jsx';

function App() {
  return (
    <div className="">
      <Navigation/>
      <main className='main_container'>
        <ContactHeader/>
        <ContactForm/>
      </main>
    </div>
  )
}

export default App
