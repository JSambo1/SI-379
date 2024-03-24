import rick from './rickross.jpeg'
import Greeting from './Greeting';

export default function App() {
  return <div>
    <Greeting name="(put your name here)"/>
    <img src={rick} alt="Rick and Morty"/>
    This is my first React Applicatoin!
  </div>
}