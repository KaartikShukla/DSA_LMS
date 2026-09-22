import { ExecutionStep } from '../../types/dsa';

export interface TreeNode {
  id: string;
  val: number;
  leftId: string | null;
  rightId: string | null;
  x?: number;
  y?: number;
}

export function generateBSTSteps(searchTarget: number = 40): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  let stepIdx = 0;

  const lines = [
    'function searchBST(root, val) {',
    '  if (root === null || root.val === val) return root;',
    '  if (val < root.val) {',
    '    return searchBST(root.left, val);',
    '  } else {',
    '    return searchBST(root.right, val);',
    '  }',
    '}',
  ];

  // Preconstructed balanced-like BST:
  //         50
  //       /    \
  //     30      70
  //    /  \    /  \
  //   20  40  60  80
  const treeNodes: Record<string, TreeNode> = {
    node_50: { id: 'node_50', val: 50, leftId: 'node_30', rightId: 'node_70', x: 250, y: 50 },
    node_30: { id: 'node_30', val: 30, leftId: 'node_20', rightId: 'node_40', x: 140, y: 130 },
    node_70: { id: 'node_70', val: 70, leftId: 'node_60', rightId: 'node_80', x: 360, y: 130 },
    node_20: { id: 'node_20', val: 20, leftId: null, rightId: null, x: 80, y: 210 },
    node_40: { id: 'node_40', val: 40, leftId: null, rightId: null, x: 200, y: 210 },
    node_60: { id: 'node_60', val: 60, leftId: null, rightId: null, x: 300, y: 210 },
    node_80: { id: 'node_80', val: 80, leftId: null, rightId: null, x: 420, y: 210 },
  };

  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 1,
    codeSnippet: lines[0],
    explanation: `Starting searchBST for target val = ${searchTarget} starting from root (50).`,
    variables: { val: searchTarget, 'root.val': 50 },
    callStack: [`searchBST(root=50, ${searchTarget})`],
    visualState: {
      type: 'tree',
      data: treeNodes,
      pointers: { curr: 'node_50' },
      highlights: { node_50: 'active' },
    },
  });

  // Step at root 50
  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 2,
    codeSnippet: lines[1],
    explanation: `Check base conditions: root is NOT null and root.val (50) !== target (${searchTarget}). Proceeding to branch.`,
    variables: { 'root.val': 50, val: searchTarget },
    callStack: [`searchBST(root=50, ${searchTarget})`],
    visualState: {
      type: 'tree',
      data: treeNodes,
      pointers: { curr: 'node_50' },
      highlights: { node_50: 'comparing' },
    },
  });

  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 3,
    codeSnippet: lines[2],
    explanation: `Evaluate BST property: val (${searchTarget}) < root.val (50) is TRUE. Target must lie in the LEFT subtree!`,
    variables: { 'root.val': 50, val: searchTarget },
    callStack: [`searchBST(root=50, ${searchTarget})`],
    visualState: {
      type: 'tree',
      data: treeNodes,
      pointers: { curr: 'node_50' },
      highlights: { node_50: 'active' },
    },
  });

  // Recursive call left: node_30
  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 4,
    codeSnippet: lines[3],
    explanation: `Recursive call: searchBST(root.left, ${searchTarget}). Descending left to Node 30.`,
    variables: { 'root.val': 30, val: searchTarget },
    callStack: [`searchBST(root=50, ${searchTarget})`, `searchBST(root=30, ${searchTarget})`],
    visualState: {
      type: 'tree',
      data: treeNodes,
      pointers: { curr: 'node_30' },
      highlights: { node_50: 'visited', node_30: 'active' },
    },
  });

  // At node 30
  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 2,
    codeSnippet: lines[1],
    explanation: `At Node 30: Check base condition. root.val (30) !== target (${searchTarget}).`,
    variables: { 'root.val': 30, val: searchTarget },
    callStack: [`searchBST(root=50, ${searchTarget})`, `searchBST(root=30, ${searchTarget})`],
    visualState: {
      type: 'tree',
      data: treeNodes,
      pointers: { curr: 'node_30' },
      highlights: { node_50: 'visited', node_30: 'comparing' },
    },
  });

  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 3,
    codeSnippet: lines[2],
    explanation: `Evaluate BST property: val (${searchTarget}) < root.val (30) is FALSE. Entering else branch!`,
    variables: { 'root.val': 30, val: searchTarget },
    callStack: [`searchBST(root=50, ${searchTarget})`, `searchBST(root=30, ${searchTarget})`],
    visualState: {
      type: 'tree',
      data: treeNodes,
      pointers: { curr: 'node_30' },
      highlights: { node_30: 'active' },
    },
  });

  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 6,
    codeSnippet: lines[5],
    explanation: `Recursive call: searchBST(root.right, ${searchTarget}). Branching RIGHT to Node 40.`,
    variables: { 'root.val': 40, val: searchTarget },
    callStack: [
      `searchBST(root=50, ${searchTarget})`,
      `searchBST(root=30, ${searchTarget})`,
      `searchBST(root=40, ${searchTarget})`,
    ],
    visualState: {
      type: 'tree',
      data: treeNodes,
      pointers: { curr: 'node_40' },
      highlights: { node_50: 'visited', node_30: 'visited', node_40: 'active' },
    },
  });

  // At node 40
  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 2,
    codeSnippet: lines[1],
    explanation: `TARGET MATCH! root.val (40) === target (${searchTarget}). Base condition met, returning target node!`,
    variables: { 'root.val': 40, val: searchTarget, found: true },
    callStack: [
      `searchBST(root=50, ${searchTarget})`,
      `searchBST(root=30, ${searchTarget})`,
      `searchBST(root=40, ${searchTarget})`,
    ],
    visualState: {
      type: 'tree',
      data: treeNodes,
      pointers: { curr: 'node_40' },
      highlights: { node_50: 'visited', node_30: 'visited', node_40: 'found' },
    },
  });

  return steps;
}
