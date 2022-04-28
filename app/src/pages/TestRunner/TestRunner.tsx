import { useState, FormEvent } from "react";
import TestGroup, { TestInfo } from "../../components/TestGroup/TestGroup";
import RunButton from "../../components/RunButton/RunButton";
import { useAppSelector } from "../../hooks/react-redux";
import { socket } from "../../context/socket";
import "./TestRunner.scss";

function TestRunner() {
  const testDesignerState = useAppSelector((state) => state.testDesigner);
  const { currBlocks } = testDesignerState;

  const [finalToggle, setFinalToggle] = useState(false);
  const [loading, setLoading] = useState("Pending");
  const [returnArray, setReturnArray] = useState<TestInfo[][]>();
  const [returnNameArray, setReturnNameArray] = useState<string[]>();
  //Reset variables on redux store change

  var blockArray: TestInfo[][] = [];
  var nameArray: string[] = [];
  var finalArray: TestInfo[][] = [];
  var finalNameArray: string[] = [];

  const imageBlocks = currBlocks?.docker_images;
  const testDesigns = currBlocks?.test_designs;

  const testDesignConversion =
    imageBlocks && testDesigns
      ? testDesigns.map((imageName, index) => {
          nameArray.push(imageName);
          var testArray: TestInfo[] = [];
          imageBlocks[imageName].tests.forEach((testName) => {
            var tempTestInfo = new TestInfo(testName, loading, loading, "");
            testArray.push(tempTestInfo);
          });
          blockArray.push(testArray);
        })
      : null;

  var received_data = "";
  const handleClick = function (socket: any, e: FormEvent<HTMLDivElement>) {
    console.log("attempting to run tests");
    socket.emit("run_tests");
    socket.on("no_tests_found", () => {
      console.log("no tests found");
    });

    socket.once("test_finished", (data: any) => {
      console.log(
        "Test result from backend:",
        String.fromCharCode.apply(null, Array.from(new Uint8Array(data)))
      );
      received_data = data;
      console.log(received_data);
    });
  };

  interface JSONData {
    [image: string]: {
      [test: string]: string;
    };
  }

  socket.on("test_finished", (testResults: any) => {
    let temp = JSON.parse(testResults);
    let jsonData: JSONData = temp;
    console.log(jsonData);
    Object.entries(jsonData).forEach((image) => {
      const [key, value] = image;
      finalNameArray.push(key);
      let testArray: TestInfo[] = [];
      Object.entries(value).forEach((test) => {
        const [key, value] = test;
        let tempTestInfo;
        if (value === "FAIL") {
          tempTestInfo = new TestInfo(`${key}`, "error", "Failed", "");
        } else {
          tempTestInfo = new TestInfo(`${key}`, "success", "OK", "");
        }
        testArray.push(tempTestInfo);
      });
      finalArray.push(testArray);
    });
    setFinalToggle(true);
    console.log(finalArray);
    setReturnArray(finalArray);
    setReturnNameArray(finalNameArray);
  });

  const sendJSON = async () => {
    try {
      setLoading("running");
      await socket.emit("send_json", "test.json", JSON.stringify(currBlocks));
      await socket.emit("run_tests");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="TestRunner">
      <div className="TestRunner__bar">
        <RunButton
          className="TestRunner__runBtn"
          text="Run"
          onClick={sendJSON}
        />
      </div>
      {finalToggle
        ? returnArray?.map((arrElement, arrIndex) => {
            return (
              <TestGroup
                testGroupName={returnNameArray ? returnNameArray[arrIndex] : ""}
                tests={arrElement}
              />
            );
          })
        : blockArray?.map((arrElement, arrIndex) => {
            return (
              <TestGroup
                testGroupName={nameArray[arrIndex]}
                tests={arrElement}
              />
            );
          })}
    </div>
  );
}

export default TestRunner;
