import { css } from '@/styled-system/css';

type DownloadButtonProps = {
  filename: string;
  base64Image: string;
};

const DownloadButton: React.FC<DownloadButtonProps> = ({ filename, base64Image }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = base64Image;
    link.download = filename;
    link.click();
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleDownload();
      }}
      className={css({
        backgroundColor: 'blue.900',
        color: 'white',
        borderRadius: '8px',
        paddingX: '8px',
        paddingY: '4px',
        height: '32px',

        _hover: {
          cursor: 'pointer',
        },
      })}
    >
      Download
    </button>
  );
};

export default DownloadButton;
