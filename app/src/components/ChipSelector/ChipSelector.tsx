import { useState } from 'react';
import FilterInput from '../FilterInput/FilterInput';
import Chip from '../Chip/Chip';
import { ChipSelectorType } from '../../utils/enums';
import { ChipType } from '../../utils/enums';
import { Arguments, Subcommands } from '../../utils/package-mapper';
import { Props as ChipProps } from '../Chip/Chip';
import { commandAdd, commandRemove } from '../../slices/packageMapperSlice';
import { useAppDispatch } from '../../hooks/react-redux';
import './ChipSelector.scss';

interface Props {
  title: string,
  type: ChipSelectorType,
  chipData: Subcommands | Arguments,
  isSingleSelect?: boolean,
}

interface SelectedChipsState {
  [name: string]: string,
}

function ChipSelector(props: Props) {
  const dispatch = useAppDispatch();
  const { isSingleSelect = true } = props;
  const [filter, setFilter] = useState('');
  // used for single select
  const [selectedChip, setSelectedChip] = useState({ name: '', path: '' });
  // used for multi select
  const [selectedChips, setSelectedChips] = useState({} as SelectedChipsState);

  const handleChange = (input: string) => setFilter(input);

  const singleSelect = (name: string, path: string) => {
    const { name: currName, path: currPath } = selectedChip;
    if (!path) return; // ignore chips that don't have a path
    if (currPath) dispatch(commandRemove(currPath));
    if (name === currName) {
      setSelectedChip({ name: '', path: '' });
    } else {
      dispatch(commandAdd(path));
      setSelectedChip({ name , path });
    }
  }

  const multiSelect = (name: string, path: string) => {
    if (!path) return; // ignore chips that don't have a path
    if (selectedChips[name]) {
      dispatch(commandRemove(selectedChips[name]));
      const { [name]: chip, ...otherChips } = selectedChips;
      setSelectedChips(otherChips);
    } else {
      dispatch(commandAdd(path));
      setSelectedChips({...selectedChips, [name]: path })
    }
  }

  const handleChipClick = (name: string, path: string) => {
    if (isSingleSelect) singleSelect(name, path);
    else multiSelect(name, path);
  }

  const Chips = Object.entries(props.chipData).map(([name, obj]) => {
    const isArgument = props.type === ChipSelectorType.ARGUMENTS;
    const chipProps: ChipProps = {
      name,
      path: obj.path,
      handleClick: handleChipClick,
      ...(isArgument && { 
        type: ChipType.ARG,
        placeholder: obj.value,
        isEditable: false,
      })
    };
    return name.includes(filter) ? (
      <Chip {...chipProps} key={obj.path} />
    ) : null;
  });

  return (
    <div className="ChipSelector">
      <div className="ChipSelector__title">{props.title}</div>
      <div className="ChipSelector__type">{props.type}</div>
      <FilterInput className="ChipSelector__filterInput" onChange={handleChange} />
      <div className="ChipSelector__chips">
        <div className="ChipSelector__chipWrapper">
          {Chips}
        </div>
      </div>
    </div>
  );
}

export default ChipSelector;
