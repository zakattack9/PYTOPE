import './UploadButton.scss';
import '../../websocket/websocket.js';

interface Props {
  className?: string,

}

function UploadButton(props: Props) {
  var websocket = require("../../websocket/websocket.js")



  return (
    <div className={`UploadButton ${props.className || ''}`}>
      <input type="file" id={props.className} className="UploadButton__input" hidden/>
      <input type="file" name = "file" onClick={websocket.FileUpload()} id={props.className} className="UploadButton__input" hidden/>
      <label htmlFor={props.className} className="UploadButton__label">Upload</label>
    </div>
  );
}
export default UploadButton;