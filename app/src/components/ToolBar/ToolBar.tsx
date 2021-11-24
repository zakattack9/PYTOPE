import ToolBarItem from './ToolBarItem';
import ToolBarTheme from '../ToolBarTheme/ToolBarTheme';
import './ToolBar.scss';

interface ToolBarItems {
  [name: string]: Array<string>
}

const TOOL_BAR_ITEMS: ToolBarItems = {
  'Import': [
    'Package Mapping Config',
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
  'Help': [

  ],
}

function ToolBar() {
  const handleClick = (option: string) => {
    console.log(option);
  }

  const toolBarItems = Object.entries(TOOL_BAR_ITEMS).map(([name, options]) => (
    <ToolBarItem name={name} options={options} onClick={handleClick} key={name} />
  ));

  return (
    <nav className='ToolBar'>
      {toolBarItems}
      <ToolBarTheme />
    </nav>
  );
}

export default ToolBar;
