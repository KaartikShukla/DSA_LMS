import { ExecutionStep } from '../../types/dsa';

export interface ListNodeData {
  id: string;
  val: number;
  nextId: string | null;
}

export function generateReverseLinkedListSteps(initialValues: number[] = [10, 20, 30, 40, 50]): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  let stepIdx = 0;

  const lines = [
    'function reverseList(head) {',
    '  let prev = null;',
    '  let curr = head;',
    '',
    '  while (curr !== null) {',
    '    let next = curr.next; // Save next node',
    '    curr.next = prev;     // Reverse pointer',
    '    prev = curr;          // Move prev forward',
    '    curr = next;          // Move curr forward',
    '  }',
    '',
    '  return prev; // New head of reversed list',
    '}',
  ];

  // Initial nodes
  const nodes: ListNodeData[] = initialValues.map((val, idx) => ({
    id: `node_${idx}`,
    val,
    nextId: idx < initialValues.length - 1 ? `node_${idx + 1}` : null,
  }));

  const cloneNodes = () => nodes.map((n) => ({ ...n }));

  // Step 1: Function entry
  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 1,
    codeSnippet: lines[0],
    explanation: `Starting reverseList with head at node ${initialValues[0]}. We want to reverse all links in O(n) time and O(1) auxiliary space.`,
    variables: { head: initialValues[0] },
    callStack: ['reverseList(head)'],
    visualState: {
      type: 'linked_list',
      data: cloneNodes(),
      pointers: { head: 'node_0' },
      highlights: { node_0: 'active' },
    },
  });

  // Step 2: let prev = null;
  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 2,
    codeSnippet: lines[1],
    explanation: `Initialize 'prev = null'. The original head will become the new tail pointing to null.`,
    variables: { prev: null },
    callStack: ['reverseList(head)'],
    visualState: {
      type: 'linked_list',
      data: cloneNodes(),
      pointers: { prev: null, head: 'node_0' },
      highlights: {},
    },
  });

  // Step 3: let curr = head;
  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 3,
    codeSnippet: lines[2],
    explanation: `Initialize 'curr = head' (pointing to value ${initialValues[0]}).`,
    variables: { prev: null, curr: initialValues[0] },
    callStack: ['reverseList(head)'],
    visualState: {
      type: 'linked_list',
      data: cloneNodes(),
      pointers: { prev: null, curr: 'node_0' },
      highlights: { node_0: 'active' },
    },
  });

  let prevIdx: number | null = null;
  let currIdx: number | null = 0;

  while (currIdx !== null && currIdx < nodes.length) {
    const currNode = nodes[currIdx];

    // Step: while (curr !== null)
    steps.push({
      stepIndex: stepIdx++,
      lineNumber: 5,
      codeSnippet: lines[4],
      explanation: `Check while condition: curr (Node: ${currNode.val}) !== null is TRUE.`,
      variables: {
        prev: prevIdx !== null ? nodes[prevIdx].val : null,
        curr: currNode.val,
      },
      callStack: ['reverseList(head)'],
      visualState: {
        type: 'linked_list',
        data: cloneNodes(),
        pointers: {
          prev: prevIdx !== null ? `node_${prevIdx}` : null,
          curr: `node_${currIdx}`,
        },
        highlights: {
          [`node_${currIdx}`]: 'comparing',
        },
      },
    });

    const nextIdx: number | null = currIdx + 1 < nodes.length ? currIdx + 1 : null;

    // Step: let next = curr.next;
    steps.push({
      stepIndex: stepIdx++,
      lineNumber: 6,
      codeSnippet: lines[5],
      explanation: `SAVE REFERENCE: 'next = curr.next' (${nextIdx !== null ? `Node ${nodes[nextIdx].val}` : 'null'}). CRITICAL: We must save this link before overwriting curr.next!`,
      variables: {
        prev: prevIdx !== null ? nodes[prevIdx].val : null,
        curr: currNode.val,
        next: nextIdx !== null ? nodes[nextIdx].val : null,
      },
      callStack: ['reverseList(head)'],
      visualState: {
        type: 'linked_list',
        data: cloneNodes(),
        pointers: {
          prev: prevIdx !== null ? `node_${prevIdx}` : null,
          curr: `node_${currIdx}`,
          next: nextIdx !== null ? `node_${nextIdx}` : null,
        },
        highlights: {
          [`node_${currIdx}`]: 'active',
          ...(nextIdx !== null ? { [`node_${nextIdx}`]: 'comparing' as const } : {}),
        },
      },
    });

    // Step: curr.next = prev;
    currNode.nextId = prevIdx !== null ? `node_${prevIdx}` : null;

    steps.push({
      stepIndex: stepIdx++,
      lineNumber: 7,
      codeSnippet: lines[6],
      explanation: `REVERSE LINK: 'curr.next = prev'. Pointer from Node ${currNode.val} now points backwards to ${
        prevIdx !== null ? `Node ${nodes[prevIdx].val}` : 'null'
      }!`,
      variables: {
        prev: prevIdx !== null ? nodes[prevIdx].val : null,
        curr: currNode.val,
        next: nextIdx !== null ? nodes[nextIdx].val : null,
      },
      callStack: ['reverseList(head)'],
      visualState: {
        type: 'linked_list',
        data: cloneNodes(),
        pointers: {
          prev: prevIdx !== null ? `node_${prevIdx}` : null,
          curr: `node_${currIdx}`,
          next: nextIdx !== null ? `node_${nextIdx}` : null,
        },
        highlights: {
          [`node_${currIdx}`]: 'swapped',
        },
      },
    });

    // Step: prev = curr;
    prevIdx = currIdx;
    steps.push({
      stepIndex: stepIdx++,
      lineNumber: 8,
      codeSnippet: lines[7],
      explanation: `ADVANCE PREV: 'prev = curr'. 'prev' pointer advances forward to Node ${nodes[prevIdx].val}.`,
      variables: {
        prev: nodes[prevIdx].val,
        curr: currNode.val,
        next: nextIdx !== null ? nodes[nextIdx].val : null,
      },
      callStack: ['reverseList(head)'],
      visualState: {
        type: 'linked_list',
        data: cloneNodes(),
        pointers: {
          prev: `node_${prevIdx}`,
          curr: `node_${currIdx}`,
          next: nextIdx !== null ? `node_${nextIdx}` : null,
        },
        highlights: {
          [`node_${prevIdx}`]: 'active',
        },
      },
    });

    // Step: curr = next;
    currIdx = nextIdx;
    steps.push({
      stepIndex: stepIdx++,
      lineNumber: 9,
      codeSnippet: lines[8],
      explanation: `ADVANCE CURR: 'curr = next'. 'curr' moves to ${
        currIdx !== null ? `Node ${nodes[currIdx].val}` : 'null'
      }.`,
      variables: {
        prev: nodes[prevIdx].val,
        curr: currIdx !== null ? nodes[currIdx].val : null,
      },
      callStack: ['reverseList(head)'],
      visualState: {
        type: 'linked_list',
        data: cloneNodes(),
        pointers: {
          prev: `node_${prevIdx}`,
          curr: currIdx !== null ? `node_${currIdx}` : null,
        },
        highlights: {
          [`node_${prevIdx}`]: 'sorted',
          ...(currIdx !== null ? { [`node_${currIdx}`]: 'active' as const } : {}),
        },
      },
    });
  }

  // Final Step: return prev;
  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 12,
    codeSnippet: lines[11],
    explanation: `curr is now null! Loop terminates. 'prev' (Node ${
      prevIdx !== null ? nodes[prevIdx].val : ''
    }) is returned as the new HEAD of the completely reversed list!`,
    variables: {
      newHead: prevIdx !== null ? nodes[prevIdx].val : null,
    },
    callStack: ['reverseList(head)'],
    visualState: {
      type: 'linked_list',
      data: cloneNodes(),
      pointers: {
        newHead: prevIdx !== null ? `node_${prevIdx}` : null,
      },
      highlights: Object.fromEntries(nodes.map((n) => [n.id, 'found'])),
    },
  });

  return steps;
}
