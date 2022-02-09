import { Switch, Route, Redirect } from 'react-router-dom';
import PageBar from '../PageBar/PageBar';
import ToolBar from '../ToolBar/ToolBar';
import PackageMapper from '../../pages/PackageMapper/PackageMapper';
import TestDesigner from '../../pages/TestDesigner/TestDesigner';
import TestRunner from '../../pages/TestRunner/TestRunner';
import NewDocker from '../NewDocker/NewDocker';
import NewTest from '../NewTest/NewTest';
import NewCommand from '../NewCommand/NewCommand';
import Overlay from '../Overlay/Overlay';
import './App.scss';

// used only for testing redux store interactions w/package mapper
import { mapping } from '../../data/testPackageMapping';
import { useAppDispatch } from '../../hooks/react-redux';
import { loadPackage } from '../../slices/packageMapperSlice';

function App() {
  // this logic should go into the package select component
  const dispatch = useAppDispatch();
  dispatch(loadPackage(mapping));

  window.onbeforeunload = (e) => {
    localStorage.clear(); // clear localStorage on reload
  };

  const BASE_PATH = '/pytope';

  return (
    <div className='App'>
      <Overlay />

      <Switch>
        <Route path={`${BASE_PATH}`}>
          <ToolBar />
          <PageBar />
          
          {/* nested switch used to prevent ToolBar and PageBar from rerendering upon switching pages */}
          <Switch>
            <Route path={`${BASE_PATH}/mapper`}>
              <PackageMapper />
            </Route>

            <Route path={`${BASE_PATH}/designer`}>
              <TestDesigner />
            </Route>

            <Route path={`${BASE_PATH}/runner`}>
              <TestRunner />
            </Route>

            {/* default path for all unrecognized paths after /pytope */}
            <Route path='/'>
              <Redirect to={`${BASE_PATH}/mapper`} />
            </Route>
          </Switch>
        </Route>

        {/* paths for creating new test designer blocks; does not render ToolBar and PageBar */}
        <Route path='/new/docker'>
          <NewDocker />
        </Route>

        <Route path='/new/test'>
          <NewTest />
        </Route>

        <Route path='/new/command'>
          <NewCommand />
        </Route>

        {/* default base path for all unrecognized paths after */ }
        <Route path='/'>
          <Redirect to={`${BASE_PATH}/mapper`} />
        </Route>
      </Switch> 
    </div>
  );
}

export default App;
