import { IQuery } from "@lib/database/models";

let inputCount = 0;
let outputCount = 0;

const makeQuery = () => {
  const query: IQuery = {
    input: `test text input ${inputCount}`,
    output: {
      choices: [
        { text: `test text output ${outputCount}` },
        { text: `test text output ${outputCount + 1}` },
      ],
    },
  };

  inputCount += 1;
  inputCount += 2;

  return query;
};

export default makeQuery;
