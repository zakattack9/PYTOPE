import PageBarItem from './PageBarItem';
import './PageBar.scss';

interface PageBarItems {
  [name: string]: string
}

const PAGE_BAR_ITEMS: PageBarItems = {
  'Package Mapper': '/pytope/mapper',
  'Test Designer': '/pytope/designer',
  'Test Runner': '/pytope/runner',
}

function PageBar() {
  let pageBarItems = Object.entries(PAGE_BAR_ITEMS).map(([name, link]) => (
    <PageBarItem name={name} link={link} key={name} />
  ));

  return (
    <div className='PageBar'>
      {pageBarItems}
    </div>
  );
}

export default PageBar;
