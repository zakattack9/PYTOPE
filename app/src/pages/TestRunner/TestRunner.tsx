import "./TestRunner.scss";
import TestGroup, { TestInfo } from "../../components/TestGroup/TestGroup";
import { useAppSelector, useAppDispatch } from "../../hooks/react-redux";

function TestRunner() {
  const dispatch = useAppDispatch();
  const testDesignerState = useAppSelector((state) => state.testDesigner);
  const { currBlocks } = testDesignerState;

  var blockArray: TestInfo[][] = [];
  var nameArray: string[] = [];

  const imageBlocks = currBlocks?.docker_images;
  const testDesigns = currBlocks?.test_designs;

  const testDesignConversion =
    imageBlocks && testDesigns
      ? testDesigns.map((imageName, index) => {
          nameArray.push(imageName);
          var testArray: TestInfo[] = [];
          imageBlocks[imageName].tests.forEach((testName) => {
            var tempTestInfo = new TestInfo(
              testName,
              "pending",
              "Pending Run",
              ""
            );
            testArray.push(tempTestInfo);
          });
          blockArray.push(testArray);
        })
      : null;

  // var temp = new TestInfo(
  //   "Test git submodule",
  //   "error",
  //   "Standard Error (stderr)",
  //   "> ERROR"
  // );
  // var temp2 = new TestInfo(
  //   "Test git submodule2",
  //   "running",
  //   "Currently Running",
  //   "> RUNNING"
  // );

  // var exampleArray: TestInfo[] = [temp, temp2];
  // var exampleArray2: TestInfo[] = [temp2, temp];
  // var blockArray: TestInfo[][] = [exampleArray, exampleArray2];
  // var nameArray: string[] = ["testGroup1", "testGroup2"];

  return (
    <div className="TestRunner">
      {blockArray.map((arrElement, arrIndex) => {
        return (
          <TestGroup testGroupName={nameArray[arrIndex]} tests={arrElement} />
        );
      })}{" "}
    </div>
  );
}

export default TestRunner;
