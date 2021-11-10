import './Button.scss';

interface Props {
  name: string,
  className?: string,
  // onClick: function
}

function Button(props: Props) {
  return (
    <div className={`Button ${props.className || ''}`}>
      {props.name}
    </div>
  );
}

export default Button;
