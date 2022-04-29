import './TestDetails.scss';

interface Props {
  name: string,
  numBlocks: number,
}

function TestDetails(props: Props) {
  return (
    <div className="TestDetails">
      <div className="TestDetails__name">{props.name}</div>
      <div className="TestDetails__blocks">Contains {props.numBlocks} commands</div>
    </div>
  );
}

export default TestDetails;
