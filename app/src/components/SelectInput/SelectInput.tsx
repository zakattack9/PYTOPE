import './SelectInput.scss';

interface Props {
  className?: string,
}

function SelectInput(props: Props) {
  return (
    <select className={`SelectInput ${props.className || ''}`}>
      <option value='test'>test</option>
      <option value='test1'>test1</option>
      <option value='test2'>test2</option>
      <option value='test3'>test3</option>
    </select>
  );
}

export default SelectInput;
