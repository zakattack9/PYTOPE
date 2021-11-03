import './ToolBarItem.scss'

interface Props {
  name: string;
  options: Array<string>;
}

function ToolBarItem(props: Props) {
  let toolBarOptions = props.options.map(option => (
    <div className="ToolBarItem__option">
      {option}
    </div> 
  ));

  return (
    <div className="ToolBarItem">
      <div className="ToolBarItem__name">{props.name}</div>
      <div className="ToolBarItem__options">
        {toolBarOptions} 
      </div>
    </div>
  );
}

export default ToolBarItem;
