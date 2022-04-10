import "./TestGroup.scss";
import { useState } from "react";
import TestDesigner from "../../pages/TestDesigner/TestDesigner";

export interface Props {
  testGroupName: string;
  tests: TestInfo[];
}

//block that will contain all the tests in a group
const TestGroup = (props: Props) => {
  return (
    <div className="TestGroup">
      {props.testGroupName}
      {props.tests.map((arrElement, arrIndex) => {
        return TestBlock(
          arrElement.testName,
          arrElement.testStatus,
          arrElement.testContent,
          arrIndex
        );
      })}
    </div>
  );
};

const TestBlock = (
  testName: string,
  testStatus: string,
  testContent: string,
  index: number
) => {
  const [testStatusHook, setTestStatusHook] = useState(testStatus);

  const StatusLight = () => {
    if (testStatusHook === "error") {
      return <div className="TestGroup__RedCircle" />;
    } else if (testStatusHook === "running" || testStatusHook === "pending") {
      return <div className="TestGroup__YellowCircle" />;
    } else if (testStatusHook === "success") {
      return <div className="TestGroup__GreenCircle" />;
    }
  };

  return (
    <div key={testName + index} className="TestGroup__testBlock">
      <div className="TestGroup__testBlockTopBar">
        {StatusLight()}
        {testName}
      </div>
      <div className="TestGroup__testOutput">{testContent}</div>
    </div>
  );
};

export class TestInfo {
  testName: string;
  testStatus: string;
  testContent: string;
  constructor(testName: string, testStatus: string, testContent: string) {
    this.testName = testName;
    this.testStatus = testStatus;
    this.testContent = testContent;
  }

  //runTest function goes here, it will make webhook calls using testname or similar
}

export default TestGroup;
