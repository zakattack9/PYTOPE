import ToolBarItem from '../ToolBar/ToolBarItem';

interface Props {
  className?: string,
}

function ToolBarExport(props: Props) {
  const EXPORT_OPTIONS = ['Test Environment Config', 'Tests to Python unittests']
  const handleClick = (option: string) => {
    if (option === 'Tests to Python unittests') {
      const link = document.createElement("a");
      link.download = "unittests";
      link.href = "http://127.0.0.1:5000/get-export/unittests";
      link.click();
    }
  }

  return (
    <ToolBarItem name="Export" options={EXPORT_OPTIONS} onClick={handleClick} />
  );
}

export default ToolBarExport;
