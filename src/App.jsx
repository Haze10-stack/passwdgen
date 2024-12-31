import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setlength] = useState(8);
  const [num, setnum] = useState('true');
  const [char, setchar] = useState('true');
  const [passwd, setpasswd] = useState("");
  const passwdRef = useRef(null);

  const passwordgenerator = useCallback(() => {
    let passwd = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (num) str += '0123456789';
    if (char) str += '!@#$%^&*';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      passwd += str.charAt(char);
    }
    setpasswd(passwd);
  }, [length, num, char, setpasswd]);

  const copyPasswordToClipboard = useCallback(() => {
    passwdRef.current?.select();
    window.navigator.clipboard.writeText(passwd);
  }, [passwd]);

  useEffect(() => {
    passwordgenerator();
  }, [length, num, char, passwordgenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto rounded-lg px-6 py-4 my-3 text-orange-500 bg-gray-800 shadow-md">
        <h1 className="text-white text-center text-xl font-bold my-4">Password Generator</h1>
        <div className="flex rounded-lg overflow-hidden mb-4">
          <input 
            type="text"
            value={passwd}
            className="w-full py-2 px-4 outline-none bg-white text-gray-800 placeholder-gray-400 transition-all"
            placeholder="Password"
            readOnly
            ref={passwdRef}
          />
          <button className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range"
              min={8}
              max={12}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setlength(e.target.value); }}
            />
            <label>length: {length}</label>
          </div> 
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox"
              defaultChecked={num}
              id='numberinput'
              onChange={() => {
                setnum((prev) => !prev);
              }}
            />
            <label>number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={char}
              id="characterInput"
              onChange={() => {
                setchar((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
