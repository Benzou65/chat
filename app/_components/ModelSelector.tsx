import { Option, Select, Label, Box } from './styledHtml';

export enum Model {
  GPT35 = 'gpt-3.5-turbo',
  GPT3516k = 'gpt-3.5-turbo-16k',
  GPT35Turbo = 'gpt-3.5-turbo-0125',
  GPT4 = 'gpt-4',
  GPT4o = 'gpt-4o',
  GPT4Turbo = 'gpt-4-1106-preview',
  GPT4TurboVision = 'gpt-4-1106-vision-preview',
}

export const models = [
  {
    name: 'GPT-4o',
    value: Model.GPT4o,
  },
  {
    name: 'GPT-3.5 Turbo',
    value: Model.GPT35Turbo,
  },
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
