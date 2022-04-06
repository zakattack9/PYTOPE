import "./TestRunner.scss";
import TestGroup, { TestInfo } from "../../components/TestGroup/TestGroup";

function TestRunner() {
  var temp = new TestInfo("Test git submodule", "error", "> ERROR");
  var exampleArray: TestInfo[] = [temp];

  return (
    <div className="TestRunner">
      {/* needs mapping here */}
      <TestGroup testGroupName="example1" tests={exampleArray} />
    </div>
  );
}

export default TestRunner;
