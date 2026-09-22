import { ExecutionStep } from '../../types/dsa';

export interface GraphNodePosition {
  id: string;
  label: string;
  x: number;
  y: number;
}

export function generateGraphBFSSteps(): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  let stepIdx = 0;

  const lines = [
    'function bfs(graph, startNode) {',
    '  let visited = new Set();',
    '  let queue = [startNode];',
    '  let traversalOrder = [];',
    '  visited.add(startNode);',
    '',
    '  while (queue.length > 0) {',
    '    let node = queue.shift();',
    '    traversalOrder.push(node);',
    '',
    '    for (let neighbor of graph[node]) {',
    '      if (!visited.has(neighbor)) {',
    '        visited.add(neighbor);',
    '        queue.push(neighbor);',
    '      }',
    '    }',
    '  }',
    '  return traversalOrder;',
    '}',
  ];

  const graphData = {
    nodes: [
      { id: 'A', label: 'A', x: 80, y: 150 },
      { id: 'B', label: 'B', x: 200, y: 80 },
      { id: 'C', label: 'C', x: 200, y: 220 },
      { id: 'D', label: 'D', x: 330, y: 60 },
      { id: 'E', label: 'E', x: 330, y: 160 },
      { id: 'F', label: 'F', x: 440, y: 150 },
    ],
    edges: [
      ['A', 'B'],
      ['A', 'C'],
      ['B', 'D'],
      ['B', 'E'],
      ['C', 'F'],
      ['E', 'F'],
    ],
    adjList: {
      A: ['B', 'C'],
      B: ['D', 'E'],
      C: ['F'],
      D: [],
      E: ['F'],
      F: [],
    },
  };

  const visited = new Set<string>();
  const queue: string[] = ['A'];
  const traversalOrder: string[] = [];

  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 1,
    codeSnippet: lines[0],
    explanation: 'Starting Breadth First Search (BFS) with startNode = "A". Level-order expansion begins.',
    variables: { startNode: 'A' },
    callStack: ['bfs(graph, "A")'],
    visualState: {
      type: 'graph',
      data: graphData,
      pointers: { current: 'A' },
      highlights: { A: 'active' },
      auxiliary: { queue: ['A'], visited: ['A'], order: [] },
    },
  });

  visited.add('A');

  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 5,
    codeSnippet: lines[4],
    explanation: 'Mark startNode "A" as visited and place in the exploration queue.',
    variables: { visited: ['A'], queue: ['A'] },
    callStack: ['bfs(graph, "A")'],
    visualState: {
      type: 'graph',
      data: graphData,
      pointers: { current: 'A' },
      highlights: { A: 'visited' },
      auxiliary: { queue: ['A'], visited: ['A'], order: [] },
    },
  });

  while (queue.length > 0) {
    const node = queue.shift()!;
    traversalOrder.push(node);

    steps.push({
      stepIndex: stepIdx++,
      lineNumber: 8,
      codeSnippet: lines[7],
      explanation: `DEQUEUE FRONTIER: node = queue.shift() => "${node}". Exploring all outgoing edges from ${node}.`,
      variables: { currentNode: node, queue: [...queue], visited: [...visited] },
      callStack: ['bfs(graph, "A")'],
      visualState: {
        type: 'graph',
        data: graphData,
        pointers: { current: node },
        highlights: {
          ...Object.fromEntries([...visited].map((id) => [id, 'visited'])),
          [node]: 'active',
        },
        auxiliary: { queue: [...queue], visited: [...visited], order: [...traversalOrder] },
      },
    });

    const neighbors = (graphData.adjList as any)[node] || [];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);

        steps.push({
          stepIndex: stepIdx++,
          lineNumber: 13,
          codeSnippet: lines[12],
          explanation: `DISCOVER UNVISITED NEIGHBOR: "${neighbor}". Add to visited set and enqueue for subsequent level exploration.`,
          variables: { currentNode: node, neighbor, queue: [...queue], visited: [...visited] },
          callStack: ['bfs(graph, "A")'],
          visualState: {
            type: 'graph',
            data: graphData,
            pointers: { current: node, neighbor },
            highlights: {
              ...Object.fromEntries([...visited].map((id) => [id, 'visited'])),
              [node]: 'active',
              [neighbor]: 'comparing',
            },
            auxiliary: { queue: [...queue], visited: [...visited], order: [...traversalOrder] },
          },
        });
      }
    }
  }

  steps.push({
    stepIndex: stepIdx++,
    lineNumber: 18,
    codeSnippet: lines[17],
    explanation: `BFS complete! All reachable nodes processed. Final traversal order: [${traversalOrder.join(' -> ')}].`,
    variables: { traversalOrder },
    callStack: ['bfs(graph, "A")'],
    visualState: {
      type: 'graph',
      data: graphData,
      pointers: {},
      highlights: Object.fromEntries(graphData.nodes.map((n) => [n.id, 'found'])),
      auxiliary: { queue: [], visited: [...visited], order: traversalOrder },
    },
  });

  return steps;
}
