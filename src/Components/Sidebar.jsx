import '../App.css';

// handle constants and equations with more than two variables

const Sidebar = ({savedVars}) => {
  function copytext(e){
    var copyVar = Number(e.target.parentElement.childNodes[3].innerText);
    navigator.clipboard.writeText(copyVar);
  }

  return (
    <aside className="Sidebar">
      <ul>
        {savedVars.map((variable, id) => (
          <li key={id}><strong onClick={(e)=>copytext(e)}>+ </strong>{variable.title} : <i>{variable.variable}</i></li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
