import { useState } from 'react'
import { fadeIn } from 'react-animations'
import styled, { keyframes } from 'styled-components'
import Dnd from './Dnd'
import './App.css'

const animation = keyframes`${fadeIn}`

const BouncyDiv = styled.div`
  animation: .3s ${animation};
  animation-fill-mode: forwards;
`

const array = Array.from(Array(6))

function App() {
  const [show, setShow] = useState(false)
  const toggle = () => {
    setShow(!show)
  }

  return (
    <div>
      <div className="wrapper">
        <button onClick={toggle}>Toggle</button>
      </div>

      {show && <div className="wrapper">
        {array.map((item, index) => (
          <BouncyDiv key={index} className="item" />
        ))}
      </div>}

      <Dnd />
    </div>
  )
}

export default App
