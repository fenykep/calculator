import '../App.css';

import { useEffect } from "react";


const InputsCont = ({equation}) => {

  useEffect(()=>{
    var azo = document.querySelector('.InputCol');
    if(azo){
      azo.childNodes.forEach((i)=>i.value='');
    }
  },[equation])

  function calculate(idB){
    var azo = document.querySelectorAll('.InputCol')[idB];
    var result = document.querySelector('.result');
    var variables = [];

    azo.childNodes.forEach((i)=>variables.push(Number(i.value)));
    result.innerText = equation[idB]['algo'](variables);
  }

  if(typeof equation!='undefined'){
    return (
      <div className="InputsCont">
        {equation.map((eqi, idB) => (
          <div className="InputCol" key={idB}>
            {eqi['vars'].map((equation, ids) => (
                <input onChange={()=>calculate(idB)} key={ids} type="number" placeholder={equation} />
            ))}
          </div>
        ))}
      </div>
    );
  }
  else{
    return <h1>Go Evan!</h1>
  }
}

export default InputsCont;
