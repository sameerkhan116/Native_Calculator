const PRESS_NUM = 'PRESS_NUM';
const ENTER = 'ENTER';
const OPERATION = 'OPERATION';
const CLEAR = 'CLEAR';
const SWAP = 'SWAP';
const TOGGLE_NEGATIVE = 'TOGGLE_NEGATIVE';

const initialState = { stack: [], inputState: 'replace' };

export const pressNum = n => ({
  type: PRESS_NUM,
  payload: n,
});

export const enter = () => ({
  type: ENTER,
});

export const operation = op => ({
  type: OPERATION,
  payload: op,
});

export const clear = () => ({
  type: CLEAR,
});

export const swap = () => ({
  type: SWAP,
});

export const toggleNegative = idx => ({
  type: TOGGLE_NEGATIVE,
  payload: idx,
});

// inputState can be append | replace | push
const doOperation = (x, y, op) => {
  if (op === 'pow') return y ** x;
  else if (op === '-') return y - x;
  else if (op === '+') return y + x;
  else if (op === '*') return y * x;
  else if (op === '/') return y / x;
};

const switchNegative = x => x * -1;

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_NEGATIVE:
      return {
        ...state,
        stack: state.stack.map((x, i) => (payload === i ? switchNegative(x) : x)),
      };
    case SWAP:
      return {
        stack: [state.stack[1], state.stack[0], ...state.stack.slice(2)],
        inputState: 'push',
      };
    case CLEAR:
      return initialState;
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
