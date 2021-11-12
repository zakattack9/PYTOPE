import FilterInput from '../FilterInput/FilterInput';
import { ChipSelectorType } from '../../utils/enums';
import './ChipSelector.scss';

interface Props {
  title: string,
  type: ChipSelectorType,
  chips: Array<string>,
}

function ChipSelector(props: Props) {
  return (
    <div className="ChipSelector">
      <div className="ChipSelector__title">{props.title}</div>
      <div className="ChipSelector__type">{props.type}</div>
      <FilterInput />
      <div className="ChipSelector__chipWrapper"></div>
    </div>
  );
}

export default ChipSelector;
