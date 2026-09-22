import { ExecutionStep } from '../types/dsa';
import { generateBinarySearchSteps } from './stepGenerators/binarySearch';
import { generateBubbleSortSteps } from './stepGenerators/bubbleSort';
import { generateReverseLinkedListSteps } from './stepGenerators/linkedList';
import { generateStackSteps, generateQueueSteps } from './stepGenerators/stackQueue';
import { generateBSTSteps } from './stepGenerators/bst';
import { generateGraphBFSSteps } from './stepGenerators/graphTraversal';
import { generateDPFibonacciSteps } from './stepGenerators/dpFibonacci';

export async function getExecutionSteps(
  algorithmKey: string,
  inputData?: any,
  customCode?: string
): Promise<ExecutionStep[]> {
  switch (algorithmKey) {
    case 'binary_search': {
      const arr = inputData?.arr || [4, 9, 15, 23, 38, 42, 57, 68, 75, 91];
      const target = inputData?.target !== undefined ? inputData.target : 42;
      return generateBinarySearchSteps(arr, target);
    }
    case 'linear_search': {
      // Generate linear search steps
      const arr = inputData?.arr || [29, 10, 14, 37, 13, 45, 82, 19];
      const target = inputData?.target !== undefined ? inputData.target : 37;
      const steps: ExecutionStep[] = [];
      let idx = 0;
      steps.push({
        stepIndex: idx++,
        lineNumber: 1,
        codeSnippet: 'function linearSearch(arr, target) {',
        explanation: `Beginning sequential scan over array of ${arr.length} elements searching for ${target}.`,
        variables: { target, arrayLength: arr.length },
        callStack: [`linearSearch(arr, ${target})`],
        visualState: { type: 'array', data: [...arr], pointers: {}, highlights: {} },
      });
      for (let i = 0; i < arr.length; i++) {
        steps.push({
          stepIndex: idx++,
          lineNumber: 2,
          codeSnippet: '  for (let i = 0; i < arr.length; i++) {',
          explanation: `Loop counter i = ${i}. Examining element at index ${i}.`,
          variables: { i, 'arr[i]': arr[i], target },
          callStack: [`linearSearch(arr, ${target})`],
          visualState: { type: 'array', data: [...arr], pointers: { i }, highlights: { [i]: 'comparing' } },
        });
        steps.push({
          stepIndex: idx++,
          lineNumber: 3,
          codeSnippet: '    if (arr[i] === target) {',
          explanation: `Testing if arr[${i}] (${arr[i]}) === target (${target}).`,
          variables: { i, 'arr[i]': arr[i], target },
          callStack: [`linearSearch(arr, ${target})`],
          visualState: { type: 'array', data: [...arr], pointers: { i }, highlights: { [i]: 'comparing' } },
        });
        if (arr[i] === target) {
          steps.push({
            stepIndex: idx++,
            lineNumber: 4,
            codeSnippet: '      return i; // Found matching target',
            explanation: `Found target ${target} at index ${i}! Returning ${i}.`,
            variables: { returnIndex: i },
            callStack: [`linearSearch(arr, ${target})`],
            visualState: { type: 'array', data: [...arr], pointers: { i }, highlights: { [i]: 'found' } },
          });
          return steps;
        }
      }
      steps.push({
        stepIndex: idx++,
        lineNumber: 7,
        codeSnippet: '  return -1; // Target not present',
        explanation: `Target ${target} was not found in array. Returning -1.`,
        variables: { returnIndex: -1 },
        callStack: [`linearSearch(arr, ${target})`],
        visualState: { type: 'array', data: [...arr], pointers: {}, highlights: {} },
      });
      return steps;
    }
    case 'bubble_sort': {
      const arr = inputData?.arr || [64, 34, 25, 12, 22, 11, 90];
      return generateBubbleSortSteps(arr);
    }
    case 'reverse_linked_list': {
      const nodes = inputData?.nodes || [10, 20, 30, 40, 50];
      return generateReverseLinkedListSteps(nodes);
    }
    case 'stack_operations': {
      return generateStackSteps();
    }
    case 'queue_operations': {
      return generateQueueSteps();
    }
    case 'bst_operations': {
      const target = inputData?.searchTarget !== undefined ? inputData.searchTarget : 40;
      return generateBSTSteps(target);
    }
    case 'graph_bfs': {
      return generateGraphBFSSteps();
    }
    case 'dp_fibonacci': {
      const n = inputData?.n !== undefined ? inputData.n : 7;
      return generateDPFibonacciSteps(n);
    }
    default: {
      // If custom code is provided or unknown key, call the backend execution & tracing API!
      if (customCode) {
        try {
          const res = await fetch('/api/execute/trace', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: customCode, inputData }),
          });
          const result = await res.json();
          if (result.steps && result.steps.length > 0) {
            return result.steps;
          }
        } catch (err) {
          console.error('Remote trace failed:', err);
        }
      }
      return generateBinarySearchSteps();
    }
  }
}
