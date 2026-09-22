import { ExecutionStep } from '../../types/dsa';

export function generateStackSteps(): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  let stepIdx = 0;

  const stack: number[] = [];
  const lines = [
    'class Stack {',
    '  push(val) { this.items.push(val); }',
    '  pop() { return this.items.pop(); }',
    '  peek() { return this.items[this.items.length - 1]; }',
    '}',
  ];

  const operations = [
    { op: 'push', val: 10, line: 2 },
    { op: 'push', val: 20, line: 2 },
    { op: 'push', val: 30, line: 2 },
    { op: 'peek', line: 4 },
    { op: 'pop', line: 3 },
    { op: 'push', val: 40, line: 2 },
  ];

  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 1,
    codeSnippet: lines[0],
    explanation: 'Initializing empty Stack data structure with LIFO (Last In First Out) semantics.',
    variables: { size: 0, items: [] },
    callStack: ['new Stack()'],
    visualState: {
      type: 'stack',
      data: [],
      pointers: { top: null },
    },
  });

  operations.forEach((action) => {
    if (action.op === 'push' && action.val !== undefined) {
      stack.push(action.val);
      steps.push({
        stepIndex: stepIdx++,
        lineNumber: action.line,
        codeSnippet: lines[action.line - 1],
        explanation: `PUSH OPERATION: Adding ${action.val} to the top of the stack. Stack depth is now ${stack.length}.`,
        variables: { pushedValue: action.val, top: action.val, size: stack.length },
        callStack: [`stack.push(${action.val})`],
        visualState: {
          type: 'stack',
          data: [...stack],
          pointers: { top: stack.length - 1 },
          highlights: { [stack.length - 1]: 'active' },
        },
      });
    } else if (action.op === 'pop') {
      const removed = stack.pop();
      steps.push({
        stepIndex: stepIdx++,
        lineNumber: action.line,
        codeSnippet: lines[action.line - 1],
        explanation: `POP OPERATION: Removing topmost element (${removed}) from the stack. Remaining elements: [${stack.join(', ')}].`,
        variables: { poppedValue: removed, top: stack.length > 0 ? stack[stack.length - 1] : null, size: stack.length },
        callStack: ['stack.pop()'],
        visualState: {
          type: 'stack',
          data: [...stack],
          pointers: { top: stack.length > 0 ? stack.length - 1 : null },
          highlights: {},
        },
      });
    } else if (action.op === 'peek') {
      const topVal = stack[stack.length - 1];
      steps.push({
        stepIndex: stepIdx++,
        lineNumber: action.line,
        codeSnippet: lines[action.line - 1],
        explanation: `PEEK OPERATION: Inspecting topmost element without removing it. Value is ${topVal}.`,
        variables: { peekValue: topVal, top: topVal, size: stack.length },
        callStack: ['stack.peek()'],
        visualState: {
          type: 'stack',
          data: [...stack],
          pointers: { top: stack.length - 1 },
          highlights: { [stack.length - 1]: 'comparing' },
        },
      });
    }
  });

  return steps;
}

export function generateQueueSteps(): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  let stepIdx = 0;
  const queue: (string | number)[] = [];

  const lines = [
    'class Queue {',
    '  enqueue(val) { this.items.push(val); }',
    '  dequeue() { return this.items.shift(); }',
    '  front() { return this.items[0]; }',
    '}',
  ];

  const operations = [
    { op: 'enqueue', val: 'A', line: 2 },
    { op: 'enqueue', val: 'B', line: 2 },
    { op: 'enqueue', val: 'C', line: 2 },
    { op: 'dequeue', line: 3 },
    { op: 'enqueue', val: 'D', line: 2 },
  ];

  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 1,
    codeSnippet: lines[0],
    explanation: 'Initializing empty Queue with FIFO (First In First Out) semantics.',
    variables: { size: 0, items: [] },
    callStack: ['new Queue()'],
    visualState: {
      type: 'queue',
      data: [],
      pointers: { front: null, rear: null },
    },
  });

  operations.forEach((action) => {
    if (action.op === 'enqueue' && action.val !== undefined) {
      queue.push(action.val);
      steps.push({
        stepIndex: stepIdx++,
        lineNumber: action.line,
        codeSnippet: lines[action.line - 1],
        explanation: `ENQUEUE: Added '${action.val}' at rear of the queue. Front is '${queue[0]}', Rear is '${action.val}'.`,
        variables: { enqueued: action.val, front: queue[0], rear: action.val, size: queue.length },
        callStack: [`queue.enqueue('${action.val}')`],
        visualState: {
          type: 'queue',
          data: [...queue],
          pointers: { front: 0, rear: queue.length - 1 },
          highlights: { [queue.length - 1]: 'active' },
        },
      });
    } else if (action.op === 'dequeue') {
      const removed = queue.shift();
      steps.push({
        stepIndex: stepIdx++,
        lineNumber: action.line,
        codeSnippet: lines[action.line - 1],
        explanation: `DEQUEUE: Served and removed '${removed}' from the FRONT. New front is '${queue[0]}'.`,
        variables: { dequeued: removed, front: queue[0], rear: queue[queue.length - 1], size: queue.length },
        callStack: ['queue.dequeue()'],
        visualState: {
          type: 'queue',
          data: [...queue],
          pointers: { front: 0, rear: queue.length - 1 },
          highlights: { 0: 'comparing' },
        },
      });
    }
  });

  return steps;
}
