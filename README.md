# Stop Signal + Working Memory — Nested Design (High Load)

Experiment 3 task code. A replication of the Experiment 1 **nested** design, but with a **higher working memory load** (set sizes 2, 4, 6 instead of 0, 2, 4). The stop signal sits between memory encoding and the recognition probe, so the inhibition demand is nested inside the memory trial rather than integrated with it.

Companion analysis repo: `stop_signal_nested_memory_highload_analysis`.

## Overview
This experiment has **two types of test blocks**:

1. **Simple stop signal blocks** (`stop_signal/`) — Shape identification (circle/square) with a stop signal (star) on 1/3 of trials. Right hand responses. Identical to the Experiment 1 / Experiment 2 control block.
2. **Nested memory blocks** (`stop_signal_wm_task/`) — Remember 2, 4, or 6 letters, complete a stop-signal shape trial, then identify whether a probe letter was in the memory set. Right hand for the shape, left hand for the probe.

## Trial Structure

### Simple stop signal trial
1. Fixation: 500ms
2. Shape (with possible star): 1000ms stimulus / 1500ms trial
3. ITI: 500ms (mean)
- **~2.5s per trial**

### Nested memory trial
1. Fixation: 500ms
2. Memory presentation: 2, 4, or 6 letters shown in spatial positions
3. Stop-signal shape trial (with possible star): 1000ms stimulus / 1500ms trial
4. Recognition probe (single letter): in or not in the memory set
5. ITI: 500ms (mean)

## Memory Letter Display
Letters are displayed in spatial positions on screen (polygon vertices):
- **2 letters**: left, right (horizontal)
- **4 letters**: top, right, bottom, left (cross)
- **6 letters**: hexagon vertices

## Conditions

### Simple stop signal
- Shapes: circle, square
- Stop conditions: go (2/3), stop (1/3)
- **6 unique trial types** per block

### Nested memory
- Memory set sizes: 2, 4, 6
- Memory conditions: in memory set, not in memory set
- Stop conditions: go (2/3), stop (1/3)
- **18 unique trial types** per block

## Block Structure

### Practice (80% accuracy, max 2 attempts)
1. Go-only practice: 6 trials (shapes, no stop)
2. Phase 2 practice: 12 trials (shape stop signal only)
3. Phase 1 practice: 12 trials (memory encode + probe, no stop)
4. Full nested practice: 18 trials (memory + shape stop signal + probe)

### Test
- 12 nested memory blocks × 36 trials = **432 test trials**

## Response Keys (counterbalanced by group_index)

### Right hand — shapes
- `possibleResponses[0]`: circle or square → comma (,) or period (.)
- `possibleResponses[1]`: other shape → other key

### Left hand — memory probe
- `possibleResponses[2]`: in memory set → X or Z
- `possibleResponses[3]`: not in memory set → other key

## Stop-Signal Delay (SSD)

### Simple blocks
- Single SSD staircase
- Initial: 250ms, step: 50ms, range: 0–1000ms

### Nested blocks
- Per memory load: `SSD_2`, `SSD_4`, `SSD_6`
- Initial: 250ms, step: 50ms, range: 0–1000ms

## Accuracy Thresholds
- Test accuracy: 0.80
- Practice accuracy: 0.70
- Go-only practice: 0.60
- Memory practice: 0.60
- Missed response: 0.20
- Max practice attempts: 2

## Estimated Duration
~65 minutes total (practice + test + breaks)

## Local Testing
Open `stop_signal_wm_task/index.html` directly in Chrome or Firefox. jsPsych is loaded from a CDN and the expfactory globals are shimmed locally, so no server is needed.
