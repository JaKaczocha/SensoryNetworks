import './App.css'
import { BrowserRouter as Router, Routes, Route, Link }from 'react-router-dom';
import NotFound from './components/NotFound';
import Charts from './components/Charts';
import DataTest from './components/DataTest';


function App() {
   return (
       <Router>
        
           
           <Routes>
              <Route path="/charts" element={<Charts />} />
              <Route path="/datatest" element={<DataTest />} />
               <Route path="/" element={<Charts />} />
               <Route path="*" element={<NotFound />} />
              
           </Routes>
       </Router>
 );
}
export default App