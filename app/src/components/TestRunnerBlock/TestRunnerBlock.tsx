import "./TestRunnerBlock.scss";

export interface Props {
  testBlockName: string;
  tests: TestInfo[];
}

const TestRunnerBlock = (props: Props) => {
  return (
    <div className="TestRunnerBlock">
      {testBlock(
        props.tests[0].testName,
        props.tests[0].testStatus,
        props.tests[0].testContent
      )}
      <></>
    </div>
  );
};

const testBlock = (
  testName: string,
  testStatus: string,
  testContent: string
) => {
  return (
    <div className="TestRunnerBlock__testBlock">
      <div className="TestRunnerBlock__testStatusLight">{testStatus}</div>
      <div className="TestRunnerBlock__testOutput">{testContent}</div>
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

export default TestRunnerBlock;
