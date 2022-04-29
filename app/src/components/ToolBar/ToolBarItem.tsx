import './ToolBarItem.scss';

interface Props {
  name: string;
  options: Array<string>;
  onClick: (option: string) => void,
}

function ToolBarItem(props: Props) {
  let toolBarOptions = props.options.map(option => (
    <div className='ToolBarItem__option' key={option} onClick={(() => props.onClick(option))}>
      {option}
    </div> 
  ));

  return (
    <div className='ToolBarItem'>
      <div className='ToolBarItem__name'>{props.name}</div>
      <div className='ToolBarItem__options'>
        {toolBarOptions} 
      </div>
    </div>
  );
}

export default ToolBarItem;
