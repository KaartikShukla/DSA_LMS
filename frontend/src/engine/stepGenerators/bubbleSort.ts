import { ExecutionStep } from '../../types/dsa';

export function generateBubbleSortSteps(initialArr: number[] = [64, 34, 25, 12, 22, 11, 90]): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  const arr = [...initialArr];
  const n = arr.length;
  let stepIdx = 0;

  const lines = [
    'function bubbleSort(arr) {',
    '  let n = arr.length;',
    '  for (let i = 0; i < n - 1; i++) {',
    '    let swapped = false;',
    '    for (let j = 0; j < n - i - 1; j++) {',
    '      if (arr[j] > arr[j + 1]) {',
    '        let temp = arr[j];',
    '        arr[j] = arr[j + 1];',
    '        arr[j + 1] = temp;',
    '        swapped = true;',
    '      }',
    '    }',
    '    if (!swapped) break;',
    '  }',
    '  return arr;',
    '}',
  ];

  const sortedIndices = new Set<number>();

  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 1,
    codeSnippet: lines[0],
    explanation: `Starting bubbleSort on unsorted array of ${n} elements.`,
    variables: { n },
    callStack: ['bubbleSort(arr)'],
    visualState: {
      type: 'array',
      data: [...arr],
      pointers: {},
      highlights: {},
    },
  });

  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 2,
    codeSnippet: lines[1],
    explanation: `Initialize n = arr.length (${n}).`,
    variables: { n },
    callStack: ['bubbleSort(arr)'],
    visualState: {
      type: 'array',
      data: [...arr],
      pointers: {},
      highlights: {},
    },
  });

  for (let i = 0; i < n - 1; i++) {
    steps.push({
      stepIndex: stepIdx++,
      lineNumber: 3,
      codeSnippet: lines[2],
      explanation: `Outer loop pass i = ${i}. Elements after index ${n - 1 - i} are already locked in sorted positions.`,
      variables: { i, n },
      callStack: ['bubbleSort(arr)'],
      visualState: {
        type: 'array',
        data: [...arr],
        pointers: { i },
        highlights: Object.fromEntries([...sortedIndices].map((idx) => [idx, 'sorted'])),
      },
    });

    let swapped = false;

    steps.push({
      stepIndex: stepIdx++,
      lineNumber: 4,
      codeSnippet: lines[3],
      explanation: `Set swapped = false. If no elements are swapped during this pass, the array is already sorted.`,
      variables: { i, swapped: false },
      callStack: ['bubbleSort(arr)'],
      visualState: {
        type: 'array',
        data: [...arr],
        pointers: { i },
        highlights: Object.fromEntries([...sortedIndices].map((idx) => [idx, 'sorted'])),
      },
    });

    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        stepIndex: stepIdx++,
        lineNumber: 5,
        codeSnippet: lines[4],
        explanation: `Inner loop j = ${j}. Comparing pair at indices ${j} and ${j + 1}.`,
        variables: { i, j, 'arr[j]': arr[j], 'arr[j+1]': arr[j + 1] },
        callStack: ['bubbleSort(arr)'],
        visualState: {
          type: 'array',
          data: [...arr],
          pointers: { j, 'j+1': j + 1 },
          highlights: {
            [j]: 'comparing',
            [j + 1]: 'comparing',
            ...Object.fromEntries([...sortedIndices].map((idx) => [idx, 'sorted'])),
          },
        },
      });

      steps.push({
        stepIndex: stepIdx++,
        lineNumber: 6,
        codeSnippet: lines[5],
        explanation: `Checking condition: arr[${j}] (${arr[j]}) > arr[${j + 1}] (${arr[j + 1]}). ${
          arr[j] > arr[j + 1] ? 'TRUE -> Needs swap!' : 'FALSE -> Already in relative order.'
        }`,
        variables: { i, j, 'arr[j]': arr[j], 'arr[j+1]': arr[j + 1] },
        callStack: ['bubbleSort(arr)'],
        visualState: {
          type: 'array',
          data: [...arr],
          pointers: { j, 'j+1': j + 1 },
          highlights: {
            [j]: 'comparing',
            [j + 1]: 'comparing',
            ...Object.fromEntries([...sortedIndices].map((idx) => [idx, 'sorted'])),
          },
        },
      });

      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;

        steps.push({
          stepIndex: stepIdx++,
          lineNumber: 7,
          codeSnippet: lines[6],
          explanation: `Store temporary: temp = arr[${j}] (${temp}).`,
          variables: { i, j, temp },
          callStack: ['bubbleSort(arr)'],
          visualState: {
            type: 'array',
            data: [...arr],
            pointers: { j, 'j+1': j + 1 },
            highlights: {
              [j]: 'swapped',
              [j + 1]: 'swapped',
              ...Object.fromEntries([...sortedIndices].map((idx) => [idx, 'sorted'])),
            },
          },
        });

        steps.push({
          stepIndex: stepIdx++,
          lineNumber: 8,
          codeSnippet: lines[7],
          explanation: `SWAPPING: arr[${j}] receives arr[${j + 1}] (${arr[j]}).`,
          variables: { i, j, temp, swapped: true },
          callStack: ['bubbleSort(arr)'],
          visualState: {
            type: 'array',
            data: [...arr],
            pointers: { j, 'j+1': j + 1 },
            highlights: {
              [j]: 'swapped',
              [j + 1]: 'swapped',
              ...Object.fromEntries([...sortedIndices].map((idx) => [idx, 'sorted'])),
            },
          },
        });

        steps.push({
          stepIndex: stepIdx++,
          lineNumber: 10,
          codeSnippet: lines[9],
          explanation: `Set swapped = true. Elements ${arr[j]} and ${arr[j + 1]} have been swapped!`,
          variables: { i, j, swapped: true },
          callStack: ['bubbleSort(arr)'],
          visualState: {
            type: 'array',
            data: [...arr],
            pointers: { j, 'j+1': j + 1 },
            highlights: {
              [j]: 'active',
              [j + 1]: 'active',
              ...Object.fromEntries([...sortedIndices].map((idx) => [idx, 'sorted'])),
            },
          },
        });
      }
    }

    sortedIndices.add(n - 1 - i);

    steps.push({
      stepIndex: stepIdx++,
      lineNumber: 13,
      codeSnippet: lines[12],
      explanation: `End of pass ${i}. Element at index ${n - 1 - i} (${arr[n - 1 - i]}) has bubbled up into its final sorted position.`,
      variables: { i, swapped },
      callStack: ['bubbleSort(arr)'],
      visualState: {
        type: 'array',
        data: [...arr],
        pointers: {},
        highlights: Object.fromEntries([...sortedIndices].map((idx) => [idx, 'sorted'])),
      },
    });

    if (!swapped) {
      steps.push({
        stepIndex: stepIdx++,
        lineNumber: 13,
        codeSnippet: lines[12],
        explanation: `Array is already completely sorted! Breaking early (O(n) best-case optimization).`,
        variables: { swapped: false },
        callStack: ['bubbleSort(arr)'],
        visualState: {
          type: 'array',
          data: [...arr],
          pointers: {},
          highlights: Object.fromEntries(arr.map((_, idx) => [idx, 'sorted'])),
        },
      });
      break;
    }
  }

  // Mark all sorted
  arr.forEach((_, idx) => sortedIndices.add(idx));

  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 15,
    codeSnippet: lines[14],
    explanation: `Bubble Sort finished successfully! Returning sorted array: [${arr.join(', ')}].`,
    variables: { sortedArray: arr },
    callStack: ['bubbleSort(arr)'],
    visualState: {
      type: 'array',
      data: [...arr],
      pointers: {},
      highlights: Object.fromEntries(arr.map((_, idx) => [idx, 'sorted'])),
    },
  });

  return steps;
}
