import { Switch, Route, Redirect } from 'react-router-dom';
import PageBar from '../PageBar/PageBar';
import Toolbar from '../ToolBar/ToolBar';
import PackageMapper from '../../pages/PackageMapper/PackageMapper';
import TestDesigner from '../../pages/TestDesigner/TestDesigner';
import TestRunner from '../../pages/TestRunner/TestRunner';
import Overlay from '../Overlay/Overlay';
import './App.scss';

// used only for testing redux store interactions w/package mapper
import { mapping } from '../../data/testPackageMapping';
import { useAppDispatch } from '../../hooks/react-redux';
import { loadPackage } from '../../slices/packageMapperSlice';

function App() {
  // this logic should go into the package select component
  const dispatch = useAppDispatch();
  dispatch(loadPackage(mapping))

  window.onbeforeunload = (e) => {
    localStorage.clear(); // clear localStorage on reload
  };

  return (
    <div className='App'>
      <Overlay />
      <Toolbar />
      <PageBar />

      <Switch>
        <Route path='/package-mapper'>
          <PackageMapper />
        </Route>

        <Route path='/test-designer'>
          <TestDesigner />
        </Route>

        <Route path='/test-runner'>
          <TestRunner />
        </Route>

        {/* Default base path and all unrecognized paths to package mapper interface */}
        <Route path='/'>
          <Redirect to='/package-mapper' />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
