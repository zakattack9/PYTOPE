import { SearchIcon, CancelIcon } from '../../utils/svg';
import './FilterInput.scss';

interface Props {
  // handleInput:
}

function FilterInput(props: Props) {
  return (
    <div className="FilterInput">
      <SearchIcon className="FilterInput__searchIcon" />
      <CancelIcon className="FilterInput__cancelIcon" />
    </div>
  );
}

export default FilterInput;
