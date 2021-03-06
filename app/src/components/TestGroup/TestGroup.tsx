import "./TestGroup.scss";

export interface Props {
  testGroupName: string;
  tests: TestInfo[];
}

//this is a UI component that holds all test blocks in a given group
const TestGroup = (props: Props) => {
  return (
    <div className="TestGroup">
      {props.testGroupName}
      {props.tests.map((arrElement, arrIndex) => {
        return TestBlock(
          arrElement.testName,
          arrElement.testStatus,
          arrElement.testContentHeader,
          arrElement.testContent,
          arrIndex
        );
      })}
    </div>
  );
};

//this is a UI component that holds individual test blocks
const TestBlock = (
  testName: string,
  testStatus: string,
  testContentHeader: string,
  testContent: string,
  index: number
) => {
  const StatusLight = () => {
    if (testStatus === "error") {
      return <div className="TestGroup__RedCircle" />;
    } else if (testStatus === "running") {
      return <div className="TestGroup__YellowCircle" />;
    } else if (testStatus === "success") {
      return <div className="TestGroup__GreenCircle" />;
    } else {
      return <div className="TestGroup__GreyCircle" />;
    }
  };

  return (
    <div key={testName + index} className="TestGroup__testBlock">
      <div className="TestGroup__TestBlockTopBar">
        {StatusLight()}
        {testName}
      </div>
      <div className="TestGroup__testContentHeader">{testContentHeader}</div>
      {/* <div className="TestGroup__testContent">{testContent}</div> */}
    </div>
  );
};

//this class holds relevant information for the test's output
export class TestInfo {
  testName: string;
  testStatus: string;
  testContentHeader: string;
  testContent: string;
  constructor(
    testName: string,
    testStatus: string,
    testContentHeader: string,
    testContent: string
  ) {
    this.testName = testName;
    this.testStatus = testStatus;
    this.testContentHeader = testContentHeader;
    this.testContent = testContent;
  }

  getTestName() {
    return this.testName;
  }

  getTestStatus() {
    return this.testStatus;
  }

  getTestContentHeader() {
    return this.testContentHeader;
  }

  getTestContent() {
    return this.testContent;
  }

  setTestName(testName: string) {
    this.testName = testName;
  }

  setTestStatus(testStatus: string) {
    this.testStatus = testStatus;
  }

  setTestContentHeader(testContentHeader: string) {
    this.testContentHeader = testContentHeader;
  }

  setTestContent(testContent: string) {
    this.testContent = testContent;
  }

  //runTest function goes here, it will make webhook calls using testname or similar
}

export default TestGroup;
