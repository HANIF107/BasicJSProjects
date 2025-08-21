import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef =useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllow) str+= "0123456789"
    if(charAllow) str+= "`~!@#$%^&*-_+=[]{}"

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char)
    }

   setPassword(pass);

  }, [length, numAllow, charAllow]) 


  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 32);
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordGenerator()
  }, [length, numAllow, charAllow, passwordGenerator])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-700 bg-gray-800'>
      <h1 className='text-white text-center my-3 text-3xl'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" value={password} ref={passwordRef} className='outline-none w-full bg-white text-xl font-semibold py-2 px-3 text-gray-400' placeholder='Password' readOnly/>
        <button onClick={copyPasswordToClipboard} className='cursor-pointer outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={32} value={length} id='range' className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}/>
          <label htmlFor="range">Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox" 
            defaultChecked={numAllow} 
            id="numberInput" 
            className='' 
            onChange={()=>{
              setNumAllow((prev)=> !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox" 
            defaultChecked={charAllow} 
            id="charInput" 
            className='' 
            onChange={()=>{
              setCharAllow((prev)=> !prev);
            }}
          />
          <label htmlFor="charInput">Characters</label>
        </div>

      </div>
    </div>
    </>
  )
}

export default App
