import "./TestRunner.scss";
import TestRunnerBlock, {
  TestInfo,
} from "../../components/TestRunnerBlock/TestRunnerBlock";

function TestRunner() {
  var temp = new TestInfo("Test git submodule", "completed", "> ERROR");
  var exampleArray: TestInfo[] = [temp];

  return (
    <div className="TestRunner">
      <TestRunnerBlock testBlockName="example1" tests={exampleArray} />
    </div>
  );
}

export default TestRunner;
