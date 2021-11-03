import PageBarItem from './PageBarItem';
import './PageBar.scss';

interface PageBarItems {
  [name: string]: string
}

const PAGE_BAR_ITEMS: PageBarItems = {
  'Package Mapper': '/package-mapper',
  'Test Designer': '/test-designer',
  'Test Runner': '/test-runner',
}

function PageBar() {
  let pageBarItems = Object.entries(PAGE_BAR_ITEMS).map(([name, link]) => (
    <PageBarItem name={name} link={link} />
  ));

  return (
    <div className='PageBar'>
      {pageBarItems}
    </div>
  );
}

export default PageBar;
