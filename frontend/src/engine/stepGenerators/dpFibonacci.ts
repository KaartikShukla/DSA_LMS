import { ExecutionStep } from '../../types/dsa';

export function generateDPFibonacciSteps(n: number = 7): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  let stepIdx = 0;

  const lines = [
    'function fibonacciDP(n) {',
    '  if (n <= 1) return n;',
    '  let dp = new Array(n + 1);',
    '  dp[0] = 0;',
    '  dp[1] = 1;',
    '  for (let i = 2; i <= n; i++) {',
    '    dp[i] = dp[i - 1] + dp[i - 2];',
    '  }',
    '  return dp[n];',
    '}',
  ];

  const dp: (number | null)[] = new Array(n + 1).fill(null);

  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 1,
    codeSnippet: lines[0],
    explanation: `Starting bottom-up Tabulation for Fibonacci(n = ${n}). We will solve each subproblem once and store its result.`,
    variables: { n },
    callStack: [`fibonacciDP(${n})`],
    visualState: {
      type: 'dp_table',
      data: [...dp],
      pointers: {},
      highlights: {},
    },
  });

  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 3,
    codeSnippet: lines[2],
    explanation: `Allocate DP table array of size ${n + 1} initialized with null values.`,
    variables: { n, tableSize: n + 1 },
    callStack: [`fibonacciDP(${n})`],
    visualState: {
      type: 'dp_table',
      data: [...dp],
      pointers: {},
      highlights: {},
    },
  });

  dp[0] = 0;
  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 4,
    codeSnippet: lines[3],
    explanation: `BASE CASE 1: dp[0] = 0. The 0th Fibonacci number is defined as 0.`,
    variables: { 'dp[0]': 0 },
    callStack: [`fibonacciDP(${n})`],
    visualState: {
      type: 'dp_table',
      data: [...dp],
      pointers: { 'i=0': 0 },
      highlights: { 0: 'sorted' },
    },
  });

  dp[1] = 1;
  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 5,
    codeSnippet: lines[4],
    explanation: `BASE CASE 2: dp[1] = 1. The 1st Fibonacci number is defined as 1.`,
    variables: { 'dp[0]': 0, 'dp[1]': 1 },
    callStack: [`fibonacciDP(${n})`],
    visualState: {
      type: 'dp_table',
      data: [...dp],
      pointers: { 'i=1': 1 },
      highlights: { 0: 'sorted', 1: 'sorted' },
    },
  });

  for (let i = 2; i <= n; i++) {
    steps.push({
      stepIndex: stepIdx++,
      lineNumber: 6,
      codeSnippet: lines[5],
      explanation: `Loop iteration i = ${i}. Computing dp[${i}] from previously solved subproblems dp[${i - 1}] and dp[${i - 2}].`,
      variables: { i, 'dp[i-1]': dp[i - 1], 'dp[i-2]': dp[i - 2] },
      callStack: [`fibonacciDP(${n})`],
      visualState: {
        type: 'dp_table',
        data: [...dp],
        pointers: { current: i, 'i-1': i - 1, 'i-2': i - 2 },
        highlights: {
          [i - 1]: 'comparing',
          [i - 2]: 'comparing',
          [i]: 'active',
        },
      },
    });

    const sum = (dp[i - 1] as number) + (dp[i - 2] as number);
    dp[i] = sum;

    steps.push({
      stepIndex: stepIdx++,
      lineNumber: 7,
      codeSnippet: lines[6],
      explanation: `RECURRENCE: dp[${i}] = dp[${i - 1}] (${dp[i - 1]}) + dp[${i - 2}] (${dp[i - 2]}) = ${sum}. Stored in table!`,
      variables: { i, 'dp[i]': sum, calculation: `${dp[i - 1]} + ${dp[i - 2]} = ${sum}` },
      callStack: [`fibonacciDP(${n})`],
      visualState: {
        type: 'dp_table',
        data: [...dp],
        pointers: { current: i },
        highlights: {
          [i]: 'swapped',
        },
      },
    });
  }

  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 9,
    codeSnippet: lines[8],
    explanation: `TABULATION COMPLETE! Returning dp[${n}] = ${dp[n]}. Achieved O(n) linear time complexity instead of exponential O(2^n)!`,
    variables: { result: dp[n], 'dp[n]': dp[n] },
    callStack: [`fibonacciDP(${n})`],
    visualState: {
      type: 'dp_table',
      data: [...dp],
      pointers: { result: n },
      highlights: { [n]: 'found' },
    },
  });

  return steps;
}
