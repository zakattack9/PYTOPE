import "./TestRunner.scss";
import TestGroup, { TestInfo } from "../../components/TestGroup/TestGroup";

function TestRunner() {
  var temp = new TestInfo(
    "Test git submodule",
    "error",
    "Standard Error (stderr)",
    "> ERROR"
  );
  var temp2 = new TestInfo(
    "Test git submodule2",
    "running",
    "Currently Running",
    "> RUNNING"
  );

  var exampleArray: TestInfo[] = [temp, temp2];
  var exampleArray2: TestInfo[] = [temp2, temp];
  var blockArray: TestInfo[][] = [exampleArray, exampleArray2];
  var nameArray: string[] = ["testGroup1", "testGroup2"];

  return (
    <div className="TestRunner">
      {blockArray.map((arrElement, arrIndex) => {
        return (
          <TestGroup testGroupName={nameArray[arrIndex]} tests={arrElement} />
        );
      })}
    </div>
  );
}

export default TestRunner;
