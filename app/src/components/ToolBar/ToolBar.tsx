import ToolBarItem from './ToolBarItem';
import ToolBarTheme from '../ToolBarTheme/ToolBarTheme';
import './ToolBar.scss';
import ToolBarExport from '../ToolBarExport/ToolBarExport';

interface ToolBarItems {
  [name: string]: Array<string>
}

const TOOL_BAR_ITEMS: ToolBarItems = {
  'Import': [
    'Test Environment Config',
  ],
  'Export': [
    'Test Environment Config',
    'Tests to Python unittests',
  ],
  'Manage': [
    'Uploaded Docker Images',
    'Uploaded Package Mappings',
  ], 
  'Theme': [],
  'Help': [],
}
#test

function ToolBar() {
  const handleClick = (option: string) => {
    console.log(option);
  }

  const toolBarItems = Object.entries(TOOL_BAR_ITEMS).map(([name, options]) => {
    if (name === 'Theme')
      return <ToolBarTheme key={name} />;
    else if(name === 'Export') {
      return <ToolBarExport key={name} />;
    }
    else 
      return <ToolBarItem name={name} options={options} onClick={handleClick} key={name} />;
  
  });

  return (
    <nav className='ToolBar'>
      {toolBarItems}
    </nav>
  );
}

export default ToolBar;
