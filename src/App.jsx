import './App.css';

import { useState } from "react";

import InputsCont from './Components/InputsCont';
import Sidebar from './Components/Sidebar';


function App() {
  const [equation, setEquation] = useState('goodluck');
  const [savedVars, setSavedVars] = useState([]);

  const equations = {
    specGrav :{
      title : 'Specific gravity of soil',
      formulas: [{
        vars : ['Ps','Pw'],
        algo : function(nums) { return nums[0] / nums[1] }
      },
      {
        vars : ['Ps','Pw'],
        algo : function(nums) { return nums[0] * nums[1] }
      },
      {
        vars : ['Ps','Pw'],
        algo : function(nums) { return nums[0] ** nums[1] }
      }]
    },
    voidRatio :{
      title : 'Specific volume',
      formulas: [{
        vars : ['Vv','Vs'],
        algo : function(nums) { return nums[0] + nums[1] }
      }]
    },
    specVol :{
      title : 'Void ratio',
      formulas: [{
        vars : ['Vt','Vs'],
        algo : function(nums) { return nums[0] ** nums[1] }
      }]
    }
  };

  var optionsArray = Object.keys(equations);
  var optionsTitleArray = [];
  optionsArray.forEach((i)=>(optionsTitleArray.push(equations[i].title)));

  document.onkeyup = function(e) {
    //0=48 9=57
    if(e.ctrlKey && e.which<=57 && e.which>=48){
      var indexer = e.which - 48; 
      var varCache = document.querySelector('ul').childNodes;
      if(varCache.length>indexer){
        navigator.clipboard.writeText(varCache[indexer].childNodes[3].innerText);
      }
    }
  };

  const handleChange = (e) => {
    setEquation(e.target.value);
    var temp0 = document.querySelector('#equation');
    document.querySelector('.whatVar').innerText = temp0.options[temp0.selectedIndex].text;
  }

  function addvar(){
    var number = Number(document.querySelector('.result').innerText);
    setSavedVars(savedVars => [
      {
        title : document.querySelector('.whatVar').innerText,
        variable : Math.round(number * 10000) / 10000
      },
      ...savedVars
    ]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Everything calculator™</h1>
      </header>
      <main>
        <p className='whatVar'>Variable to calculate: </p>
        <h1 className="result">100</h1>
        <h1 className="saveVar" onClick={()=>addvar()}>+</h1>
        <br style={{marginBottom: '40px'}}/>
        <select name="equation" id="equation" onChange={(e) => handleChange(e)}>
          {optionsArray.map((keyName, i) => (
              <option key={i} value={keyName}>{optionsTitleArray[i]}</option>
          ))}
        </select>
        <br style={{marginBottom: '20px'}}/>
        {equation==='goodluck'?<h1>Go Evan!</h1>:<InputsCont equation={equations[equation].formulas}/>}
      </main>
      <Sidebar savedVars={savedVars}/>
    </div>
  );
}

export default App;
