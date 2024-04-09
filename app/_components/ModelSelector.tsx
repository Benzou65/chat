import { Option, Select, Label, Box } from './styledHtml';

export enum Model {
  GPT35 = 'gpt-3.5-turbo',
  GPT3516k = 'gpt-3.5-turbo-16k',
  GPT4 = 'gpt-4',
  GPT4Turbo = 'gpt-4-1106-preview',
  GPT4TurboVision = 'gpt-4-1106-vision-preview',
}

export const models = [
  {
    name: 'GPT-3.5',
    value: Model.GPT35,
  },
  {
    name: 'GPT-3.5 - 16k',
    value: Model.GPT3516k,
  },
  {
    name: 'GPT-4',
    value: Model.GPT4,
  },
  {
    name: 'GPT-4 Turbo',
    value: Model.GPT4Turbo,
  },
  // {
  //   name: 'GPT-4 Turbo Vision',
  //   value: Model.GPT4TurboVision,
  // },
];

type Props = {
  onSelect: (model: Model) => void;
};

export const ModelSelector = ({ onSelect }: Props) => {
  return (
    <Box display="flex">
      <Label
        htmlFor="model-select"
        color="white"
        paddingRight="8px"
        display="none"
        sm={{ display: 'block' }}
      >
        Model:
      </Label>
      <Select
        name="models"
        id="model-select"
        onChange={(e) => onSelect((e.target as HTMLSelectElement).value as Model)}
        backgroundColor={'#FFFFFF'}
      >
        {models.map((model) => (
          <Option key={model.value} value={model.value}>
            {model.name}
          </Option>
        ))}
      </Select>
    </Box>
  );
};
