import './UploadButton.scss';

interface Props {
  className?: string,
  // onChange: function
}

function UploadButton(props: Props) {
  return (
    <div className={`UploadButton ${props.className || ''}`}>
      <input type="file" id={props.className} className="UploadButton__input" hidden/>
      <label htmlFor={props.className} className="UploadButton__label">Upload</label>
    </div>
  );
}

export default UploadButton;
