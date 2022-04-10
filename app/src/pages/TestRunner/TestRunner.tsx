import "./TestRunner.scss";
import TestGroup, { TestInfo } from "../../components/TestGroup/TestGroup";

function TestRunner() {
  var temp = new TestInfo("Test git submodule", "error", "> ERROR");
  var temp2 = new TestInfo("Test git submodule2", "running", "> RUNNING");

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
      {/* needs mapping here */}
      {/* <TestGroup testGroupName="example1" tests={exampleArray} /> */}
    </div>
  );
}

export default TestRunner;
