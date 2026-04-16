---
name: systematic-debugging
description: Four-phase debugging methodology with root cause analysis. Use when investigating bugs, fixing test failures, or troubleshooting unexpected behavior. Emphasizes NO FIXES WITHOUT ROOT CAUSE FIRST.
---

# Systematic Debugging

## Core Principle
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST.
Never apply symptom-focused patches that mask underlying problems.

## The Four-Phase Framework

### Phase 1: Root Cause Investigation
Before touching any code:
1. Read error messages thoroughly - Every word matters
2. Reproduce the issue consistently
3. Examine recent changes - What changed before this started failing?
4. Gather diagnostic evidence - Logs, stack traces, state dumps
5. Trace data flow - Follow the call chain to find where bad values originate

Root Cause Tracing Technique:
1. Observe the symptom - Where does the error manifest?
2. Find immediate cause - Which code directly produces the error?
3. Ask What called this? - Map the call chain upward
4. Keep tracing up - Follow invalid data backward through the stack
5. Find original trigger - Where did the problem actually start?

Key principle: Never fix problems solely where errors appear, always trace to the original trigger.

### Phase 2: Pattern Analysis
1. Locate working examples - Find similar code that works correctly
2. Compare implementations completely - Do not just skim
3. Identify differences - What is different between working and broken?
4. Understand dependencies - What does this code depend on?

### Phase 3: Hypothesis and Testing
Apply the scientific method:
1. Formulate ONE clear hypothesis
2. Design minimal test - Change ONE variable at a time
3. Predict the outcome
4. Run the test - Execute and observe
5. Verify results - Did it behave as predicted?
6. Iterate or proceed

### Phase 4: Implementation
1. Create failing test case - Captures the bug behavior
2. Implement single fix - Address root cause, not symptoms
3. Verify test passes - Confirms fix works
4. Run full test suite - Ensure no regressions
5. If fix fails, STOP - Re-evaluate hypothesis

Critical rule: If THREE or more fixes fail consecutively, STOP.
This signals architectural problems requiring discussion, not more patches.

## Red Flags - Process Violations
Stop immediately if you catch yourself thinking:
- Quick fix for now, investigate later
- One more fix attempt (after multiple failures)
- This should work (without understanding why)
- Let me just try... (without hypothesis)

## Common Debugging Scenarios

### Test Failures
1. Read the FULL error message and stack trace
2. Identify which assertion failed and why
3. Check test setup
4. Check test data
5. Trace to the source of unexpected value

### Runtime Errors
1. Capture the full stack trace
2. Identify the line that throws
3. Check what values are undefined/null
4. Trace backward to find where bad value originated
5. Add validation at the source

### It worked before
1. Use git bisect to find the breaking commit
2. Compare the change with previous working version
3. Identify what assumption changed
4. Fix at the source of the assumption violation

## Debugging Checklist
Before claiming a bug is fixed:
- Root cause identified and documented
- Hypothesis formed and tested
- Fix addresses root cause, not symptoms
- Failing test created that reproduces bug
- Test now passes with fix
- Full test suite passes
- No quick fix rationalization used
- Fix is minimal and focused
