import { NeuralNetwork } from 'brain.js';

const train = [
  { input: { r: 0.0, g: 0.0, b: 0.0 }, output: { white: 1 } },
  { input: { r: 1.0, g: 1.0, b: 1.0 }, output: { black: 1 } },
  { input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 } },
  { input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 } },
  { input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 } },
  { input: { r: 0.07, g: 0.34, b: 0.0 }, output: { white: 1 } },
  { input: { r: 1.0, g: 0.5, b: 0.5 }, output: { black: 1 } }
];

type IOutput = {
  black: number;
  white: number;
};
const net = new NeuralNetwork();
net.train(train);

const hexToRgb = (
  hex: string
): {
  [key: string]: number;
} => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) ?? [];
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
};

const isBackDark = (hex: string) => {
  const color = Object.keys(hexToRgb(hex)).reduce(
    (acc, key) => ({ ...acc, [key]: hexToRgb(hex)[key] / 255 }),
    {}
  );
  const output = net.run(color) as IOutput;
  if (output.black > output.white) {
    return '#000000';
  }
  return '#fff';
};

export default isBackDark;
