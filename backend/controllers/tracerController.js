const acorn = require('acorn');
const vm = require('vm');

/**
 * Generates an educational plain-English explanation for an execution step
 */
function generateLineExplanation(lineCode, variables, prevVariables) {
  const trimmed = lineCode.trim();

  if (trimmed.startsWith('let') || trimmed.startsWith('var') || trimmed.startsWith('const')) {
    return `Declaring and initializing local variable(s). Current scope variables: ${JSON.stringify(variables)}`;
  }
  if (trimmed.startsWith('while')) {
    return `Evaluating while loop condition. Active state: ${JSON.stringify(variables)}`;
  }
  if (trimmed.startsWith('for')) {
    return `Loop iteration step. Active variables: ${JSON.stringify(variables)}`;
  }
  if (trimmed.startsWith('if')) {
    return `Branch condition check. Evaluating branch using values: ${JSON.stringify(variables)}`;
  }
  if (trimmed.startsWith('else')) {
    return `Entering alternate execution branch.`;
  }
  if (trimmed.startsWith('return')) {
    return `Function returning value. Termination step reached.`;
  }
  if (trimmed.includes('=')) {
    return `Assigning/updating value: "${trimmed}". Scope now contains: ${JSON.stringify(variables)}`;
  }
  if (trimmed.includes('push') || trimmed.includes('pop')) {
    return `Stack/Array mutation operation: "${trimmed}".`;
  }

  return `Executing statement: "${trimmed}".`;
}

/**
 * Instrument code to capture step-by-step line execution and scope variables
 */
function instrumentCode(code) {
  const lines = code.split('\n');

  // Parse code with acorn to check syntax and find statement lines
  let ast;
  try {
    ast = acorn.parse(code, { ecmaVersion: 2020, locations: true });
  } catch (err) {
    throw new Error(`Syntax Error: ${err.message}`);
  }

  // Instrument each line with trace call
  let instrumentedLines = [];
  instrumentedLines.push('const __traceLog = [];');
  instrumentedLines.push('const __scope = {};');
  instrumentedLines.push('let __stepCount = 0;');
  instrumentedLines.push(`
function __trace(line, vars = {}, note = '') {
  if (__stepCount > 500) throw new Error('Maximum step limit (500 steps) exceeded. Check for infinite loops.');
  __stepCount++;
  __traceLog.push({
    stepIndex: __traceLog.length,
    lineNumber: line,
    variables: JSON.parse(JSON.stringify(vars)),
    note: note
  });
}
`);

  lines.forEach((lineText, idx) => {
    const lineNum = idx + 1;
    const trimmed = lineText.trim();

    // Skip empty lines or lone braces or function declarations in-line instrumentation
    if (!trimmed || trimmed === '{' || trimmed === '}' || trimmed.startsWith('//') || trimmed.startsWith('/*')) {
      instrumentedLines.push(lineText);
      return;
    }

    // Capture variables from 'let x =', 'var x =', 'const x ='
    const varMatch = trimmed.match(/^(?:let|var|const)\s+([a-zA-Z0-9_$]+)/);
    if (varMatch) {
      const varName = varMatch[1];
      instrumentedLines.push(lineText);
      instrumentedLines.push(`try { __scope['${varName}'] = ${varName}; } catch(e){} __trace(${lineNum}, __scope);`);
      return;
    }

    // Capture assignment updates: 'x =' or 'arr[mid] ='
    const assignMatch = trimmed.match(/^([a-zA-Z0-9_$]+)\s*(\+=|-=|\*=|\/=|%=|=)/);
    if (assignMatch && !trimmed.startsWith('if') && !trimmed.startsWith('while') && !trimmed.startsWith('for')) {
      const varName = assignMatch[1];
      instrumentedLines.push(lineText);
      instrumentedLines.push(`try { __scope['${varName}'] = ${varName}; } catch(e){} __trace(${lineNum}, __scope);`);
      return;
    }

    if (trimmed.startsWith('return')) {
      instrumentedLines.push(`__trace(${lineNum}, __scope, 'Preparing return');`);
      instrumentedLines.push(lineText);
      return;
    }

    instrumentedLines.push(`__trace(${lineNum}, __scope);`);
    instrumentedLines.push(lineText);
  });

  instrumentedLines.push('__traceLog;');
  return instrumentedLines.join('\n');
}

exports.traceCodeExecution = async (req, res) => {
  try {
    const { code, inputData } = req.body;
    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Source code is required for execution and tracing' });
    }

    const lines = code.split('\n');

    let instrumented;
    try {
      instrumented = instrumentCode(code);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const sandbox = {
      console: { log: () => {} },
      Math: Math,
      Array: Array,
      Object: Object,
      Set: Set,
      Map: Map,
      inputData: inputData || {},
      target: (inputData && inputData.target) || 0,
      arr: (inputData && inputData.arr) || [1, 2, 3, 4, 5],
    };

    const context = vm.createContext(sandbox);
    const script = new vm.Script(instrumented);

    let rawLog;
    try {
      rawLog = script.runInContext(context, { timeout: 2000 });
    } catch (runtimeErr) {
      return res.status(400).json({ error: `Runtime error during execution: ${runtimeErr.message}` });
    }

    // Enrich steps with code snippets and plain-English pedagogical explanations
    let prevVars = {};
    const formattedSteps = (rawLog || []).map((step, idx) => {
      const lineNum = step.lineNumber;
      const codeSnippet = lines[lineNum - 1] ? lines[lineNum - 1].trim() : '';
      const explanation = step.note || generateLineExplanation(codeSnippet, step.variables, prevVars);
      prevVars = step.variables;

      return {
        stepIndex: idx,
        lineNumber: lineNum,
        codeSnippet,
        explanation,
        variables: step.variables,
        callStack: ['main()'],
        visualState: {
          type: Array.isArray(step.variables.arr) ? 'array' : 'general',
          data: step.variables.arr || null,
          pointers: {
            low: step.variables.low,
            high: step.variables.high,
            mid: step.variables.mid,
            i: step.variables.i,
            j: step.variables.j,
          },
        },
      };
    });

    res.json({
      success: true,
      totalSteps: formattedSteps.length,
      steps: formattedSteps,
    });
  } catch (err) {
    console.error('Tracing error:', err);
    res.status(500).json({ error: 'Failed to trace and execute code' });
  }
};
