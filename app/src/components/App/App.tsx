import { Switch, Route, Redirect } from 'react-router-dom';
import PageBar from '../PageBar/PageBar';
import Toolbar from '../ToolBar/ToolBar';
import PackageMapper from '../../pages/PackageMapper/PackageMapper';
import TestDesigner from '../../pages/TestDesigner/TestDesigner';
import TestRunner from '../../pages/TestRunner/TestRunner';
import './App.scss';

function App() {
  return (
    <div className="App">
      <PageBar />
      <Toolbar />

      <Switch>
        <Route path="/package-mapper">
          <PackageMapper />
        </Route>

        <Route path="/test-designer">
          <TestDesigner />
        </Route>

        <Route path="/test-runner">
          <TestRunner />
        </Route>

        {/* Default base path and all unrecognized paths to package mapper interface */}
        <Route path="/">
          <Redirect to="/package-mapper" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
