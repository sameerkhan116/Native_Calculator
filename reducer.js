const PRESS_NUM = 'PRESS_NUM';
const ENTER = 'ENTER';
const OPERATION = 'OPERATION';

export const pressNum = n => ({ type: PRESS_NUM, payload: n });
export const enter = () => ({
  type: ENTER,
});
export const operation = op => ({
  type: OPERATION,
  payload: op,
});

// inputState can be append | replace | push
const doOperation = (x, y, op) => {
  if (op === 'pow') return y ** x;
  else if (op === '-') return y - x;
  else if (op === '+') return y + x;
  else if (op === '*') return y * x;
};

export const reducer = (state = { stack: [], inputState: 'replace' }, { type, payload }) => {
  switch (type) {
    case OPERATION:
      return {
        stack: [`${doOperation(parseFloat(state.stack[0]), parseFloat(state.stack[1]), payload)}`, ...state.stack.slice(2)],
        inputState: 'push',
      };
    case ENTER:
      return {
        stack: [state.stack[0] || '0', ...state.stack],
        inputState: 'replace',
      };
    case PRESS_NUM:
      if (state.inputState === 'replace') {
        return {
          stack: [payload, ...state.stack.slice(1)],
          inputState: 'append',
        };
      } else if (state.inputState === 'append') {
        return {
          stack: [(state.stack[0] || '0') + payload, ...state.stack.slice(1)],
          inputState: 'append',
        };
      } else if (state.inputState === 'push') {
        return {
          stack: [payload, ...state.stack],
          inputState: 'append',
        };
      }
      break;
    default:
      return state;
  }
};
