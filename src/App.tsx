
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Landing } from './pages/landing'
import { Compare } from './pages/compare'
import { Test } from './pages/test'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Landing />} />
          <Route path='/compare' element= {<Compare />} />
          <Route path='/test' element= {<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
