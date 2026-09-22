import { ExecutionStep } from '../../types/dsa';

export function generateBinarySearchSteps(
  arr: number[] = [4, 9, 15, 23, 38, 42, 57, 68, 75, 91],
  target: number = 42
): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  const lines = [
    'function binarySearch(arr, target) {',
    '  let low = 0;',
    '  let high = arr.length - 1;',
    '',
    '  while (low <= high) {',
    '    let mid = Math.floor((low + high) / 2);',
    '',
    '    if (arr[mid] === target) {',
    '      return mid; // Target element found!',
    '    } else if (arr[mid] < target) {',
    '      low = mid + 1; // Discard left half',
    '    } else {',
    '      high = mid - 1; // Discard right half',
    '    }',
    '  }',
    '',
    '  return -1; // Target not found',
    '}',
  ];

  let stepIdx = 0;
  let low = 0;
  let high = arr.length - 1;

  // Step: Entry
  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 1,
    codeSnippet: lines[0],
    explanation: `Starting binarySearch with sorted array of ${arr.length} elements to find target: ${target}.`,
    variables: { target, arrayLength: arr.length },
    callStack: [`binarySearch(arr, ${target})`],
    visualState: {
      type: 'array',
      data: [...arr],
      pointers: {},
      highlights: {},
    },
  });

  // Step: let low = 0;
  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 2,
    codeSnippet: lines[1],
    explanation: `Initialize pointer 'low = 0', marking the beginning of the search interval.`,
    variables: { low: 0, target },
    callStack: [`binarySearch(arr, ${target})`],
    visualState: {
      type: 'array',
      data: [...arr],
      pointers: { low: 0 },
      highlights: { 0: 'active' },
    },
  });

  // Step: let high = arr.length - 1;
  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 3,
    codeSnippet: lines[2],
    explanation: `Initialize pointer 'high = ${arr.length - 1}', marking the end of the search interval.`,
    variables: { low: 0, high: arr.length - 1, target },
    callStack: [`binarySearch(arr, ${target})`],
    visualState: {
      type: 'array',
      data: [...arr],
      pointers: { low: 0, high: arr.length - 1 },
      highlights: { 0: 'active', [arr.length - 1]: 'active' },
    },
  });

  let foundIndex = -1;

  while (low <= high) {
    // Step: while (low <= high)
    steps.push({
      stepIndex: stepIdx++,
      lineNumber: 5,
      codeSnippet: lines[4],
      explanation: `Check loop condition: low (${low}) <= high (${high}) is TRUE. The search space is still valid.`,
      variables: { low, high, target },
      callStack: [`binarySearch(arr, ${target})`],
      visualState: {
        type: 'array',
        data: [...arr],
        pointers: { low, high },
        highlights: { [low]: 'active', [high]: 'active' },
      },
    });

    const mid = Math.floor((low + high) / 2);

    // Step: let mid = Math.floor((low + high) / 2);
    steps.push({
      stepIndex: stepIdx++,
      lineNumber: 6,
      codeSnippet: lines[5],
      explanation: `Calculate middle index: mid = Math.floor((${low} + ${high}) / 2) = ${mid}. Element at arr[${mid}] is ${arr[mid]}.`,
      variables: { low, high, mid, target, 'arr[mid]': arr[mid] },
      callStack: [`binarySearch(arr, ${target})`],
      visualState: {
        type: 'array',
        data: [...arr],
        pointers: { low, mid, high },
        highlights: { [mid]: 'comparing', [low]: 'active', [high]: 'active' },
      },
    });

    // Step: if (arr[mid] === target)
    steps.push({
      stepIndex: stepIdx++,
      lineNumber: 8,
      codeSnippet: lines[7],
      explanation: `Compare arr[mid] (${arr[mid]}) === target (${target}).`,
      variables: { low, high, mid, target, 'arr[mid]': arr[mid] },
      callStack: [`binarySearch(arr, ${target})`],
      visualState: {
        type: 'array',
        data: [...arr],
        pointers: { low, mid, high },
        highlights: { [mid]: 'comparing' },
      },
    });

    if (arr[mid] === target) {
      foundIndex = mid;
      steps.push({
        stepIndex: stepIdx++,
        lineNumber: 9,
        codeSnippet: lines[8],
        explanation: `MATCH FOUND! arr[${mid}] equals target (${target}). Returning index ${mid}. Time Complexity achieved: O(log n).`,
        variables: { low, high, mid, target, returnIndex: mid },
        callStack: [`binarySearch(arr, ${target})`],
        visualState: {
          type: 'array',
          data: [...arr],
          pointers: { mid },
          highlights: { [mid]: 'found' },
        },
      });
      break;
    } else if (arr[mid] < target) {
      // Step: else if (arr[mid] < target)
      steps.push({
        stepIndex: stepIdx++,
        lineNumber: 10,
        codeSnippet: lines[9],
        explanation: `Condition: arr[mid] (${arr[mid]}) < target (${target}) is TRUE. Target is greater, so it must lie in the right half.`,
        variables: { low, high, mid, target },
        callStack: [`binarySearch(arr, ${target})`],
        visualState: {
          type: 'array',
          data: [...arr],
          pointers: { low, mid, high },
          highlights: { [mid]: 'comparing' },
        },
      });

      low = mid + 1;
      // Step: low = mid + 1;
      steps.push({
        stepIndex: stepIdx++,
        lineNumber: 11,
        codeSnippet: lines[10],
        explanation: `Update low = mid + 1 = ${low}. We have eliminated the left half [${0}..${mid}] from consideration.`,
        variables: { low, high, mid, target },
        callStack: [`binarySearch(arr, ${target})`],
        visualState: {
          type: 'array',
          data: [...arr],
          pointers: { low, high },
          highlights: { [low]: 'active', [high]: 'active' },
        },
      });
    } else {
      // Step: else
      steps.push({
        stepIndex: stepIdx++,
        lineNumber: 12,
        codeSnippet: lines[11],
        explanation: `Condition: arr[mid] (${arr[mid]}) > target (${target}). Target is smaller, so it must lie in the left half.`,
        variables: { low, high, mid, target },
        callStack: [`binarySearch(arr, ${target})`],
        visualState: {
          type: 'array',
          data: [...arr],
          pointers: { low, mid, high },
          highlights: { [mid]: 'comparing' },
        },
      });

      high = mid - 1;
      // Step: high = mid - 1;
      steps.push({
        stepIndex: stepIdx++,
        lineNumber: 13,
        codeSnippet: lines[12],
        explanation: `Update high = mid - 1 = ${high}. We have eliminated the right half [${mid}..${arr.length - 1}].`,
        variables: { low, high, mid, target },
        callStack: [`binarySearch(arr, ${target})`],
        visualState: {
          type: 'array',
          data: [...arr],
          pointers: { low, high },
          highlights: { [low]: 'active', [high]: 'active' },
        },
      });
    }
  }

  if (foundIndex === -1) {
    steps.push({
      stepIndex: stepIdx++,
      lineNumber: 17,
      codeSnippet: lines[16],
      explanation: `low (${low}) > high (${high}): Search space is exhausted. Target ${target} is not present in array. Returning -1.`,
      variables: { low, high, target, returnIndex: -1 },
      callStack: [`binarySearch(arr, ${target})`],
      visualState: {
        type: 'array',
        data: [...arr],
        pointers: {},
        highlights: {},
      },
    });
  }

  return steps;
}
