import './DownloadButton.scss';
import '../../websocket/websocket.js';

interface Props {
  className?: string,

}

function DownloadButton(props: Props) {
  var websocket = require("../../websocket/websocket.js")
  return (
    <div className={`DownloadButton ${props.className || ''}`}>
      <input type="file" id={props.className} className="DownloadButton__input" hidden/>
      <input type="file" name = "file" onClick={websocket.FileDownload()} id={props.className} className="DownloadButton__input" hidden/>
      <label htmlFor={props.className} className="DownloadButton__label">Download</label>
    </div>
  );
}
export default DownloadButton;