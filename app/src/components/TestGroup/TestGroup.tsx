import "./TestGroup.scss";
import { useState } from "react";

export interface Props {
  testGroupName: string;
  tests: TestInfo[];
}

//block that will contain all the tests in a group
const TestGroup = (props: Props) => {
  return (
    <div className="TestGroup">
      {/* needs mapping here */}
      {TestBlock(
        props.tests[0].testName,
        props.tests[0].testStatus,
        props.tests[0].testContent
      )}
      <></>
    </div>
  );
};

const TestBlock = (
  testName: string,
  testStatus: string,
  testContent: string
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
    <div className="TestGroup__testBlock">
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
