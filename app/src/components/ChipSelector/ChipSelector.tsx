import { useState, useEffect } from 'react';
import FilterInput from '../FilterInput/FilterInput';
import Chip from '../Chip/Chip';
import { ChipSelectorType } from '../../utils/enums';
import { ChipType } from '../../utils/enums';
import './ChipSelector.scss';

interface Props {
  title: string,
  type: ChipSelectorType,
  chips: Array<string>,
}

interface Chip {
  name: string,
  type?: ChipType,
  placeholder?: string,
  path: Array<string>
}

function ChipSelector(props: Props) {
  const [filter, setFilter] = useState('');

  const handleChange = (input: string) => {
    setFilter(input)
  }

  return (
    <div className="ChipSelector">
      <div className="ChipSelector__title">{props.title}</div>
      <div className="ChipSelector__type">{props.type}</div>
      <FilterInput className="ChipSelector__filterInput" onChange={handleChange} />
      <div className="ChipSelector__chipWrapper">
        <Chip name="git" type={ChipType.BASE} />
        <Chip name="submodule" />
        <Chip name="--branch" placeholder="<branch>" type={ChipType.ARG} />
        <Chip name="./a_branch" placeholder="<folder>" type={ChipType.VALUE} />
        <Chip name="git" type={ChipType.BASE} />
        <Chip name="submodule" />
        <Chip name="--branch" placeholder="<branch>" type={ChipType.ARG} />
        <Chip name="./a_branch" placeholder="<folder>" type={ChipType.VALUE} />
        <Chip name="git" type={ChipType.BASE} />
        <Chip name="submodule" />
        <Chip name="--branch" placeholder="<branch>" type={ChipType.ARG} />
        <Chip name="./a_branch" placeholder="<folder>" type={ChipType.VALUE} />
        <Chip name="git" type={ChipType.BASE} />
        <Chip name="submodule" />
        <Chip name="--branch" placeholder="<branch>" type={ChipType.ARG} />
        <Chip name="./a_branch" placeholder="<folder>" type={ChipType.VALUE} />
      </div>
    </div>
  );
}

export default ChipSelector;
