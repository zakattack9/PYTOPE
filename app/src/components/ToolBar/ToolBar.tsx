import ToolBarItem from './ToolBarItem';
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
  let toolBarItems = Object.entries(TOOL_BAR_ITEMS).map(([name, options]) => (
    <ToolBarItem name={name} options={options} />
  ));

  return (
    <nav className='ToolBar'>
      {toolBarItems}
    </nav>
  );
}

export default ToolBar;
