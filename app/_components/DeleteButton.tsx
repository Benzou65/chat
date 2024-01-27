import { css } from '@/styled-system/css';

type Props = {
  onDelete: () => void;
};

export const DeleteButton = ({ onDelete }: Props) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
      className={css({
        backgroundColor: 'red.900',
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
      Delete
    </button>
  );
};
