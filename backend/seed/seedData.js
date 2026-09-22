const modulesData = [
  {
    _id: 'mod_searching',
    title: 'Searching Algorithms',
    slug: 'searching-algorithms',
    description: 'Master linear and logarithmic search techniques with pointer navigation and divide-and-conquer logic.',
    icon: 'Search',
    order: 1,
    lessonIds: ['lesson_binary_search', 'lesson_linear_search'],
  },
  {
    _id: 'mod_sorting',
    title: 'Sorting Algorithms',
    slug: 'sorting-algorithms',
    description: 'Understand quadratic and n-log-n sorting methods with swap visualizers, partitioning, and merge steps.',
    icon: 'ArrowUpDown',
    order: 2,
    lessonIds: ['lesson_bubble_sort', 'lesson_insertion_sort', 'lesson_quick_sort'],
  },
  {
    _id: 'mod_linked_list',
    title: 'Linked Lists',
    slug: 'linked-lists',
    description: 'Explore node structures, pointer manipulation, three-pointer reversals, and dynamic memory chains.',
    icon: 'GitCommit',
    order: 3,
    lessonIds: ['lesson_reverse_linked_list', 'lesson_linked_list_insert'],
  },
  {
    _id: 'mod_stack_queue',
    title: 'Stacks & Queues',
    slug: 'stacks-and-queues',
    description: 'Learn LIFO (Last In First Out) and FIFO (First In First Out) paradigms with stack push/pop and queue enqueue/dequeue.',
    icon: 'Layers',
    order: 4,
    lessonIds: ['lesson_stack_lifo', 'lesson_queue_fifo'],
  },
  {
    _id: 'mod_trees',
    title: 'Trees & Binary Search Trees',
    slug: 'trees-and-bst',
    description: 'Visualize hierarchical structures, binary search property, recursive insertions, and inorder traversals.',
    icon: 'GitFork',
    order: 5,
    lessonIds: ['lesson_bst_operations', 'lesson_tree_inorder'],
  },
  {
    _id: 'mod_graphs',
    title: 'Graph Algorithms',
    slug: 'graph-algorithms',
    description: 'Explore nodes, vertices, and edges through Breadth-First Search (BFS) and Depth-First Search (DFS).',
    icon: 'Share2',
    order: 6,
    lessonIds: ['lesson_graph_bfs', 'lesson_graph_dfs'],
  },
  {
    _id: 'mod_dp',
    title: 'Dynamic Programming',
    slug: 'dynamic-programming',
    description: 'Break complex problems into overlapping subproblems with memoization tables and bottom-up tabulation.',
    icon: 'Grid',
    order: 7,
    lessonIds: ['lesson_dp_fibonacci'],
  },
];

const lessonsData = [
  {
    _id: 'lesson_binary_search',
    title: 'Binary Search: Divide & Conquer',
    slug: 'binary-search',
    moduleId: 'mod_searching',
    category: 'searching',
    difficulty: 'Beginner',
    summary: 'Search a sorted array in O(log n) time by halving the search space at each comparison.',
    theory: `### What is Binary Search?
Binary Search is an exceptionally efficient algorithm for finding the index of a target element in a **sorted array**.

#### The Core Intuition
Imagine looking up a word in a physical dictionary. You do not check every word starting from page 1. Instead, you open to the middle:
- If your word comes after the current page, you discard the entire left half.
- If it comes before, you discard the entire right half.
- You repeat this process on the remaining half until the word is found or no pages remain.

#### Step-by-Step Algorithm
1. Initialize two pointers: \`low = 0\` and \`high = arr.length - 1\`.
2. Compute the middle index: \`mid = Math.floor((low + high) / 2)\`.
3. Check the element at \`arr[mid]\`:
   - If \`arr[mid] === target\`, return \`mid\`.
   - If \`arr[mid] < target\`, the target must be in the right half, so set \`low = mid + 1\`.
   - If \`arr[mid] > target\`, the target must be in the left half, so set \`high = mid - 1\`.
4. If \`low > high\`, the target does not exist in the array, so return \`-1\`.`,
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)',
    },
    spaceComplexity: 'O(1)',
    codeSnippet: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
      return mid; // Target element found!
    } else if (arr[mid] < target) {
      low = mid + 1; // Discard left half
    } else {
      high = mid - 1; // Discard right half
    }
  }

  return -1; // Target not found
}`,
    defaultInput: {
      arr: [4, 9, 15, 23, 38, 42, 57, 68, 75, 91],
      target: 42,
    },
    algorithmKey: 'binary_search',
    teachingPoints: [
      'Emphasize that the array MUST be sorted for Binary Search to work.',
      'Show how low, mid, and high pointers move step-by-step.',
      'Explain why integer overflow is avoided in some languages using low + Math.floor((high - low) / 2).',
      'Point out that each comparison cuts the problem size in half (logarithmic behavior).',
    ],
    quizQuestions: [
      {
        question: 'What is the maximum number of comparisons for an array of 64 elements?',
        options: ['64', '32', '6', '7'],
        correctAnswer: 2,
        explanation: 'log2(64) = 6 comparisons in the worst case.',
      },
    ],
  },
  {
    _id: 'lesson_linear_search',
    title: 'Linear Search: Sequential Scanning',
    slug: 'linear-search',
    moduleId: 'mod_searching',
    category: 'searching',
    difficulty: 'Beginner',
    summary: 'Sequentially check each element in an array from index 0 to n-1 until the target is found.',
    theory: `### What is Linear Search?
Linear Search is the most fundamental searching technique. It does not require elements to be sorted.

#### Intuition
Walk through every item one-by-one from left to right. When you find an element equal to the target, return its index immediately. If you reach the end without finding it, return -1.`,
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(1)',
    codeSnippet: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Found matching target
    }
  }
  return -1; // Target not present
}`,
    defaultInput: {
      arr: [29, 10, 14, 37, 13, 45, 82, 19],
      target: 37,
    },
    algorithmKey: 'linear_search',
    teachingPoints: [
      'Works on unsorted collections without extra space.',
      'Worst case inspects all N items.',
    ],
    quizQuestions: [
      {
        question: 'When is linear search better than binary search?',
        options: [
          'Always',
          'When the array is unsorted and we only search once',
          'When the array is very large and sorted',
          'Never',
        ],
        correctAnswer: 1,
        explanation: 'Sorting takes O(n log n). If doing only 1 search on unsorted data, linear search O(n) is faster than sorting first.',
      },
    ],
  },
  {
    _id: 'lesson_bubble_sort',
    title: 'Bubble Sort: Adjacent Pair Swaps',
    slug: 'bubble-sort',
    moduleId: 'mod_sorting',
    category: 'sorting',
    difficulty: 'Beginner',
    summary: 'Repeatedly step through the list, compare adjacent items, and swap them if they are in the wrong order.',
    theory: `### What is Bubble Sort?
Bubble Sort is a simple comparison-based sorting algorithm. The algorithm gets its name because larger elements "bubble up" to the end of the array with each pass.

#### How It Works
- On pass 1, compare arr[0] with arr[1], swap if arr[0] > arr[1]. Then compare arr[1] and arr[2], and so forth.
- By the end of pass 1, the largest element is guaranteed to be at the final position.
- On pass 2, repeat the same comparisons up to the second-to-last element.
- Repeat until no swaps are needed.`,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n^2)',
      worst: 'O(n^2)',
    },
    spaceComplexity: 'O(1)',
    codeSnippet: `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
    defaultInput: {
      arr: [64, 34, 25, 12, 22, 11, 90],
    },
    algorithmKey: 'bubble_sort',
    teachingPoints: [
      'Show how the inner loop shrinks by i on each round because the rightmost items are already sorted.',
      'Explain the swapped optimization flag which allows O(n) best case for already sorted arrays.',
    ],
    quizQuestions: [],
  },
  {
    _id: 'lesson_insertion_sort',
    title: 'Insertion Sort: Incremental Placement',
    slug: 'insertion-sort',
    moduleId: 'mod_sorting',
    category: 'sorting',
    difficulty: 'Beginner',
    summary: 'Build the final sorted array one element at a time by repeatedly shifting larger elements right.',
    theory: `### What is Insertion Sort?
Insertion Sort works just like the way most people sort a hand of playing cards:
1. Start with the second card.
2. Compare it with the cards before it and shift cards right until finding the correct spot.
3. Insert the card in its sorted position.`,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n^2)',
      worst: 'O(n^2)',
    },
    spaceComplexity: 'O(1)',
    codeSnippet: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]; // Shift element right
      j = j - 1;
    }
    arr[j + 1] = key; // Place key in position
  }
  return arr;
}`,
    defaultInput: {
      arr: [12, 11, 13, 5, 6, 7],
    },
    algorithmKey: 'insertion_sort',
    teachingPoints: [
      'Excellent for small arrays or nearly-sorted data.',
      'Stable sort: preserves relative order of equal elements.',
    ],
    quizQuestions: [],
  },
  {
    _id: 'lesson_quick_sort',
    title: 'Quick Sort: Partitioning & Pivot',
    slug: 'quick-sort',
    moduleId: 'mod_sorting',
    category: 'sorting',
    difficulty: 'Intermediate',
    summary: 'Pick a pivot element, partition smaller elements to the left and larger to the right, then recursively sort.',
    theory: `### What is Quick Sort?
Quick Sort is a highly efficient divide-and-conquer algorithm.

#### Partitioning Principle
1. Choose a pivot element (e.g., the last element).
2. Rearrange the array: all elements smaller than pivot move left, all greater move right.
3. Place pivot in its final sorted index.
4. Recursively apply Quick Sort to sub-arrays before and after the pivot.`,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n^2)',
    },
    spaceComplexity: 'O(log n)',
    codeSnippet: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    let pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    defaultInput: {
      arr: [38, 27, 43, 3, 9, 82, 10],
    },
    algorithmKey: 'quick_sort',
    teachingPoints: [
      'Discuss pivot selection strategies (last element, median-of-three, random).',
      'Explain in-place partitioning and why cache locality makes QuickSort fast in practice.',
    ],
    quizQuestions: [],
  },
  {
    _id: 'lesson_reverse_linked_list',
    title: 'Reverse a Singly Linked List',
    slug: 'reverse-linked-list',
    moduleId: 'mod_linked_list',
    category: 'linked_list',
    difficulty: 'Beginner',
    summary: 'Flip all next pointers using a three-pointer technique (prev, curr, next) in O(n) time and O(1) space.',
    theory: `### What is Linked List Reversal?
A singly linked list has nodes pointing forward: \`A -> B -> C -> null\`.
Reversing it means making \`C -> B -> A -> null\` without allocating new nodes.

#### The Three-Pointer Technique:
Maintain 3 pointers:
- \`prev\`: initially \`null\`
- \`curr\`: initially \`head\`
- \`next\`: temporary pointer to preserve \`curr.next\` before overwriting it

#### Loop Step:
1. \`next = curr.next\` (store forward reference)
2. \`curr.next = prev\` (reverse link!)
3. \`prev = curr\` (advance prev)
4. \`curr = next\` (advance curr)`,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(1)',
    codeSnippet: `function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    let next = curr.next; // Save next node
    curr.next = prev;     // Reverse pointer
    prev = curr;          // Move prev forward
    curr = next;          // Move curr forward
  }

  return prev; // New head of reversed list
}`,
    defaultInput: {
      nodes: [10, 20, 30, 40, 50],
    },
    algorithmKey: 'reverse_linked_list',
    teachingPoints: [
      'Emphasize why saving curr.next in a temporary variable is crucial before overwriting.',
      'Show how prev becomes the new head when curr reaches null.',
    ],
    quizQuestions: [],
  },
  {
    _id: 'lesson_linked_list_insert',
    title: 'Linked List: Insertion & Traversal',
    slug: 'linked-list-insertion',
    moduleId: 'mod_linked_list',
    category: 'linked_list',
    difficulty: 'Beginner',
    summary: 'Insert nodes at head and tail, and traverse a linked chain node-by-node.',
    theory: `### Linked List Structure
Unlike contiguous arrays, linked list elements can be stored anywhere in memory. Each node holds data and a reference (pointer) to the next node.`,
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(1)',
    codeSnippet: `function insertAtHead(head, val) {
  let newNode = { val: val, next: head };
  return newNode; // New node is now the head
}

function traverse(head) {
  let curr = head;
  while (curr !== null) {
    console.log(curr.val);
    curr = curr.next;
  }
}`,
    defaultInput: {
      nodes: [15, 25, 35, 45],
    },
    algorithmKey: 'linked_list_insert',
    teachingPoints: [],
    quizQuestions: [],
  },
  {
    _id: 'lesson_stack_lifo',
    title: 'Stack Data Structure (LIFO)',
    slug: 'stack-operations',
    moduleId: 'mod_stack_queue',
    category: 'stack',
    difficulty: 'Beginner',
    summary: 'Last In, First Out (LIFO). Learn push, pop, and peek operations with memory stack animations.',
    theory: `### What is a Stack?
Think of a stack of plates in a cafeteria:
- You add new plates to the top (**push**).
- You remove plates from the top (**pop**).
- The last plate added is the first one removed (**LIFO**).

#### Applications
- Function Call Stack in JavaScript/C++ engines.
- Undo/Redo mechanisms in text editors.
- Parentheses matching & syntax validation in compilers.`,
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
    },
    spaceComplexity: 'O(n)',
    codeSnippet: `class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element); // Add to top
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();   // Remove from top
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}`,
    defaultInput: {
      actions: [
        { op: 'push', val: 10 },
        { op: 'push', val: 20 },
        { op: 'push', val: 30 },
        { op: 'pop' },
        { op: 'push', val: 40 },
        { op: 'peek' },
      ],
    },
    algorithmKey: 'stack_operations',
    teachingPoints: [
      'O(1) push and pop time complexity.',
      'Top pointer moves upward with push and downward with pop.',
    ],
    quizQuestions: [],
  },
  {
    _id: 'lesson_queue_fifo',
    title: 'Queue Data Structure (FIFO)',
    slug: 'queue-operations',
    moduleId: 'mod_stack_queue',
    category: 'queue',
    difficulty: 'Beginner',
    summary: 'First In, First Out (FIFO). Master enqueue, dequeue, front, and rear operations.',
    theory: `### What is a Queue?
A queue is like a line of people waiting at a ticket counter:
- People join at the rear (**enqueue**).
- People are served and leave from the front (**dequeue**).
- The first person in line is the first one served (**FIFO**).`,
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
    },
    spaceComplexity: 'O(n)',
    codeSnippet: `class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element); // Insert at rear
  }

  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift(); // Remove from front
  }

  front() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}`,
    defaultInput: {
      actions: [
        { op: 'enqueue', val: 'A' },
        { op: 'enqueue', val: 'B' },
        { op: 'enqueue', val: 'C' },
        { op: 'dequeue' },
        { op: 'enqueue', val: 'D' },
      ],
    },
    algorithmKey: 'queue_operations',
    teachingPoints: [],
    quizQuestions: [],
  },
  {
    _id: 'lesson_bst_operations',
    title: 'Binary Search Tree: Insert & Search',
    slug: 'bst-operations',
    moduleId: 'mod_trees',
    category: 'tree',
    difficulty: 'Intermediate',
    summary: 'Maintain ordered hierarchy: every left child is smaller, every right child is larger.',
    theory: `### Binary Search Tree (BST) Property
For any given node in a BST:
- All values in the left subtree are strictly **less** than the node's value.
- All values in the right subtree are strictly **greater** than the node's value.

This ordering enables average logarithmic search, insertion, and deletion.`,
    timeComplexity: {
      best: 'O(log n)',
      average: 'O(log n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(h)',
    codeSnippet: `function insertBST(root, val) {
  if (root === null) {
    return { val: val, left: null, right: null };
  }
  if (val < root.val) {
    root.left = insertBST(root.left, val);
  } else {
    root.right = insertBST(root.right, val);
  }
  return root;
}

function searchBST(root, val) {
  if (root === null || root.val === val) return root;
  if (val < root.val) return searchBST(root.left, val);
  return searchBST(root.right, val);
}`,
    defaultInput: {
      insertSequence: [50, 30, 70, 20, 40, 60, 80],
      searchTarget: 40,
    },
    algorithmKey: 'bst_operations',
    teachingPoints: [
      'Compare root.val at each step to branch left or right.',
      'Worst case occurs when values are inserted in sorted order, creating a skewed degenerate tree (like a linked list).',
    ],
    quizQuestions: [],
  },
  {
    _id: 'lesson_tree_inorder',
    title: 'Binary Tree Inorder Traversal',
    slug: 'tree-inorder-traversal',
    moduleId: 'mod_trees',
    category: 'tree',
    difficulty: 'Intermediate',
    summary: 'Traverse Left Subtree -> Current Root -> Right Subtree. Yields sorted order for BSTs.',
    theory: `### Inorder Traversal (LNR)
Inorder visits nodes in the following recursive sequence:
1. Traverse the **left** subtree.
2. Visit the **node** (print/store).
3. Traverse the **right** subtree.

When executed on a Binary Search Tree, Inorder traversal visits keys in ascending sorted order!`,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(h)',
    codeSnippet: `function inorderTraversal(root, result = []) {
  if (root === null) return result;

  inorderTraversal(root.left, result);  // 1. Visit left
  result.push(root.val);                // 2. Visit current
  inorderTraversal(root.right, result); // 3. Visit right

  return result;
}`,
    defaultInput: {
      insertSequence: [50, 30, 70, 20, 40, 60, 80],
    },
    algorithmKey: 'tree_inorder',
    teachingPoints: [],
    quizQuestions: [],
  },
  {
    _id: 'lesson_graph_bfs',
    title: 'Breadth First Search (BFS)',
    slug: 'graph-bfs',
    moduleId: 'mod_graphs',
    category: 'graph',
    difficulty: 'Intermediate',
    summary: 'Traverse a graph level-by-level using a FIFO queue and a visited set.',
    theory: `### Graph BFS: Level-by-Level Exploration
BFS explores neighbor nodes layer by layer, starting from a given source node.
It finds the shortest path in unweighted graphs!

#### Data Structures Used:
- A **Queue** to maintain the exploration frontier.
- A **Visited Set** to prevent infinite loops in cyclic graphs.`,
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
    },
    spaceComplexity: 'O(V)',
    codeSnippet: `function bfs(graph, startNode) {
  let visited = new Set();
  let queue = [startNode];
  let traversalOrder = [];

  visited.add(startNode);

  while (queue.length > 0) {
    let node = queue.shift();
    traversalOrder.push(node);

    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return traversalOrder;
}`,
    defaultInput: {
      nodes: ['A', 'B', 'C', 'D', 'E', 'F'],
      edges: [
        ['A', 'B'],
        ['A', 'C'],
        ['B', 'D'],
        ['B', 'E'],
        ['C', 'F'],
        ['E', 'F'],
      ],
      startNode: 'A',
    },
    algorithmKey: 'graph_bfs',
    teachingPoints: [
      'Notice how queue FIFO ensures nodes closer to startNode are visited before deeper nodes.',
      'Show how visited set prevents visiting node E and F multiple times.',
    ],
    quizQuestions: [],
  },
  {
    _id: 'lesson_graph_dfs',
    title: 'Depth First Search (DFS)',
    slug: 'graph-dfs',
    moduleId: 'mod_graphs',
    category: 'graph',
    difficulty: 'Intermediate',
    summary: 'Dive deep along each branch before backtracking, utilizing recursion or an explicit stack.',
    theory: `### Graph DFS: Deep Branch Exploration
DFS travels as far as possible down each path until it hits a dead end or visited node, then backtracks.`,
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
    },
    spaceComplexity: 'O(V)',
    codeSnippet: `function dfs(graph, node, visited = new Set(), order = []) {
  visited.add(node);
  order.push(node);

  for (let neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited, order);
    }
  }

  return order;
}`,
    defaultInput: {
      nodes: ['A', 'B', 'C', 'D', 'E', 'F'],
      edges: [
        ['A', 'B'],
        ['A', 'C'],
        ['B', 'D'],
        ['B', 'E'],
        ['C', 'F'],
        ['E', 'F'],
      ],
      startNode: 'A',
    },
    algorithmKey: 'graph_dfs',
    teachingPoints: [],
    quizQuestions: [],
  },
  {
    _id: 'lesson_dp_fibonacci',
    title: 'Fibonacci: Tabulation & Memoization',
    slug: 'dp-fibonacci',
    moduleId: 'mod_dp',
    category: 'dp',
    difficulty: 'Intermediate',
    summary: 'Transform an exponential O(2^n) recursion into linear O(n) using a bottom-up DP table.',
    theory: `### The Power of Dynamic Programming
A naive recursive Fibonacci calculator recalculates identical subproblems over and over:
- \`fib(5)\` calculates \`fib(3)\` multiple times!
- Time complexity of naive recursion is exponential: $O(2^n)$.

#### Tabulation (Bottom-Up)
Instead, build a table starting from base cases:
- \`dp[0] = 0\`
- \`dp[1] = 1\`
- For each \`i\` from 2 to \`n\`: \`dp[i] = dp[i-1] + dp[i-2]\`.

Time complexity drops to linear: $O(n)$!`,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(n)',
    codeSnippet: `function fibonacciDP(n) {
  if (n <= 1) return n;

  let dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}`,
    defaultInput: {
      n: 8,
    },
    algorithmKey: 'dp_fibonacci',
    teachingPoints: [
      'Show how cell dp[i] depends solely on the two preceding cells dp[i-1] and dp[i-2].',
      'Explain how space can be optimized to O(1) by storing only the last two values.',
    ],
    quizQuestions: [],
  },
];

module.exports = { modulesData, lessonsData };
