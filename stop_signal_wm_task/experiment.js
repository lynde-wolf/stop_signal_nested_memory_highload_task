// window.dataSync = function() {
//   console.log('sunjae got into berkeley woo')
//  };

/* ************************************ */
/*       Define Helper Functions        */
/* ************************************ */
// PARAMETERS FOR DECAYING EXPONENTIAL FUNCTION
var meanITI = 0.5;

function shuffleArray(array) {
  // Create a copy of the original array
  const shuffledArray = [...array];

  // Perform Fisher-Yates shuffle
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

const getExpStage = () => expStage;

const getCurrAttentionCheckQuestion = () =>
  `${currentAttentionCheckData.Q} <div class=block-text>This screen will advance automatically in 1 minute. Do not press shift.</div>`;

const getCurrAttentionCheckAnswer = () => currentAttentionCheckData.A;

var attentionCheckData = [
  // key presses
  {
    Q: "<p class='block-text'>Press the q key</p>",
    A: 81,
  },
  {
    Q: "<p class='block-text'>Press the p key</p>",
    A: 80,
  },
  {
    Q: "<p class='block-text'>Press the r key</p>",
    A: 82,
  },
  {
    Q: "<p class='block-text'>Press the s key</p>",
    A: 83,
  },
  {
    Q: "<p class='block-text'>Press the t key</p>",
    A: 84,
  },
  {
    Q: "<p class='block-text'>Press the j key</p>",
    A: 74,
  },
  {
    Q: "<p class='block-text'>Press the k key</p>",
    A: 75,
  },
  {
    Q: "<p class='block-text'>Press the e key</p>",
    A: 69,
  },
  {
    Q: "<p class='block-text'>Press the m key</p>",
    A: 77,
  },
  {
    Q: "<p class='block-text'>Press the i key</p>",
    A: 73,
  },
  {
    Q: "<p class='block-text'>Press the u key</p>",
    A: 85,
  },
  // alphabet
  // start
  {
    Q: "<p class='block-text'>Press the key for the first letter of the English alphabet.</p>",
    A: 65,
  },
  {
    Q: "<p class='block-text'>Press the key for the second letter of the English alphabet.</p>",
    A: 66,
  },
  {
    Q: "<p class='block-text'>Press the key for the third letter of the English alphabet.</p>",
    A: 67,
  },
  // end
  {
    Q: "<p class='block-text'>Press the key for the third to last letter of the English alphabet.</p>",
    A: 88,
  },
  {
    Q: "<p class='block-text'>Press the key for the second to last letter of the English alphabet.</p>",
    A: 89,
  },
  {
    Q: "<p class='block-text'>Press the key for the last letter of the English alphabet.</p>",
    A: 90,
  },
];
attentionCheckData = shuffleArray(attentionCheckData);
var currentAttentionCheckData = attentionCheckData.shift();

const getInstructFeedback =
  () => `<div class = centerbox><p class = center-block-text>
    ${feedbackInstructText}
    </p></div>`;

const getFeedback =
  () => `<div class = bigbox><div class = picture_box><p class = block-text>
    ${feedbackText}
    </font></p></div></div>`;

var createTrialTypes = function (numTrialsPerBlock) {
  var uniqueCombos =
    stopSignalsConditions.length *
    shapes.length *
    possibleMemoryLengths.length *
    possibleConditions.length;

  var stims = [];
  for (var x = 0; x < stopSignalsConditions.length; x++) {
    for (var j = 0; j < shapes.length; j++) {
      for (var y = 0; y < possibleMemoryLengths.length; y++) {
        for (var z = 0; z < possibleConditions.length; z++) {
          stim = {
            stopStim: shapes[j],
            stop_correct_response: possibleResponses[j][1],
            stop_condition: stopSignalsConditions[x],
            memoryStimLength: possibleMemoryLengths[y],
            memory_condition: possibleConditions[z],
            memory_correct_response: possibleResponses[z + 2][1],
          };
          stims.push(stim);
        }
      }
    }
  }
  var iteration = numTrialsPerBlock / uniqueCombos;
  stims = jsPsych.randomization.repeat(stims, iteration);
  return stims;
};

var createGoTrialTypes = function (goPracticeLen) {
  var uniqueCombos = shapes.length;
  var goStims = [];
  for (var j = 0; j < shapes.length; j++) {
    stim = {
      stopStim: shapes[j],
      stop_correct_response: possibleResponses[j][1],
      stop_condition: 'go',
    };
    goStims.push(stim);
  }
  var iteration = goPracticeLen / uniqueCombos;
  goStims = jsPsych.randomization.repeat(goStims, iteration);
  return goStims;
};

var createPhase1TrialTypes = function(phase1PracticeLen) {
  var uniqueCombos = possibleMemoryLengths.length * possibleConditions.length;
  var phase1Stims = [];
  for (var y = 0; y < possibleMemoryLengths.length; y++) {
    for (var z = 0; z < possibleConditions.length; z++) {
      stim = {
        memoryStimLength: possibleMemoryLengths[y],
        memory_condition: possibleConditions[z],
        memory_correct_response: possibleResponses[z + 2][1],
      };
      phase1Stims.push(stim);
    }
  }

  var iteration = phase1PracticeLen / uniqueCombos;
  phase1Stims = jsPsych.randomization.repeat(phase1Stims, iteration);
  return phase1Stims
};

var createPhase2TrialTypes = function (phase2PracticeLen) {
  var uniqueCombos = shapes.length * stopSignalsConditions.length;
  var phase2Stims = [];
  for (var j = 0; j < shapes.length; j++) {
    for (var x = 0; x < stopSignalsConditions.length; x++) {
      stim = {
        stopStim: shapes[j],
        stop_correct_response: possibleResponses[j][1],
        stop_condition: stopSignalsConditions[x],
      };
      phase2Stims.push(stim);
    }
  }
  var iteration = phase2PracticeLen / uniqueCombos;
  phase2Stims = jsPsych.randomization.repeat(phase2Stims, iteration);
  return phase2Stims;
};

var createPracticeTrialTypes = function (practiceLen) {
  var uniqueCombos =
    stopSignalsConditions.length *
    possibleMemoryLengths.length *
    possibleConditions.length;
  var stims = [];
  for (var x = 0; x < stopSignalsConditions.length; x++) {
    for (var y = 0; y < possibleMemoryLengths.length; y++) {
      for (var z = 0; z < possibleConditions.length; z++) {
        stopStim = shapes[Math.floor(Math.random() * shapes.length)];
        if (stopStim === 'circle') {
          stop_correct_response = possibleResponses[0][1];
        } else {
          stop_correct_response = possibleResponses[1][1];
        }
        stim = {
          //randomly choose shape
          stopStim: stopStim,
          stop_correct_response: stop_correct_response,
          stop_condition: stopSignalsConditions[x],
          memoryStimLength: possibleMemoryLengths[y],
          memory_condition: possibleConditions[z],
          memory_correct_response: possibleResponses[z + 2][1],
        };
        stims.push(stim);
      }
    }
  }
  var iteration = practiceLen / uniqueCombos;
  stims = jsPsych.randomization.repeat(stims, iteration);
  return stims;
};

var getStopStim = function () {
  return preFileType + 'stopSignal' + postFileType;
};

var getGoStim = function () {
  stim = goStims.shift();
  shape = stim.stopStim;
  correct_response = stim.stop_correct_response;
  condition = stim.stop_condition;

  stim = {
    image:
      '<div class = centerbox><div class = cue-text>' +
      preFileType +
      shape +
      postFileType +
      '</div></div>',
    data: {
      stim: shape,
      condition: condition,
      correct_response: condition === 'go' ? correct_response : null,
    },
  };
  stimData = stim.data;
  return stim.image;
};

var phase2GetStim = function () {
  stim = phase2Stims.shift();
  shape = stim.stopStim;
  correct_response = stim.stop_correct_response;
  condition = stim.stop_condition;

  stim = {
    image:
      '<div class = centerbox><div class = cue-text>' +
      preFileType +
      shape +
      postFileType +
      '</div></div>',
    data: {
      stim: shape,
      condition: condition,
      correct_response: condition === 'go' ? correct_response : null,
    },
  };

  stimData = stim.data;
  return stim.image;
};

var getStim = function () {
  stim = stims.shift();
  shape = stim.stopStim;
  correct_response = stim.stop_correct_response;
  condition = stim.stop_condition;

  stim = {
    image:
      '<div class = centerbox><div class = cue-text>' +
      preFileType +
      shape +
      postFileType +
      '</div></div>',
    data: {
      stim: shape,
      condition: condition,
      correct_response: condition === 'go' ? correct_response : null,
    },
  };

  stimData = stim.data;
  return stim.image;
};

var lastShownLetters = ''; // Global variable to store the last shown letters

var getPhase1MemoryPresentationStim = function() {
  stim = phase1Stims.shift();

  stimLength = stim.memoryStimLength;
  condition = stim.memory_condition;
  correct_response = stim.memory_correct_response;

  letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Example set of letters to choose from
  selectedLetters = '';

  for (var i = 0; i < stimLength; i++) {
    var randomIndex = Math.floor(Math.random() * letters.length);
    selectedLetters += letters[randomIndex];
    letters = letters.slice(0, randomIndex) + letters.slice(randomIndex + 1); // Remove selected letter
  }
  lastShownLetters = selectedLetters; // Update the global variable

  var stimuliHTML = buildSpatialLetterHTML(selectedLetters);

  stim = {
    stimuli: stimuliHTML,
    data: {
      stim: selectedLetters,
      stimLength: stimLength,
      condition: condition,
      selectedLetters: selectedLetters,
      correct_response: correct_response,
    },
  };
  stimData = stim.data;
  return stim.stimuli
};

var getMemoryPresentationStim = function () {
  stim = stims[0];

  stimLength = stim.memoryStimLength;
  condition = stim.memory_condition;
  correct_response = stim.memory_correct_response;

  letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Example set of letters to choose from
  selectedLetters = '';

  for (var i = 0; i < stimLength; i++) {
    var randomIndex = Math.floor(Math.random() * letters.length);
    selectedLetters += letters[randomIndex];
    letters = letters.slice(0, randomIndex) + letters.slice(randomIndex + 1); // Remove selected letter
  }
  lastShownLetters = selectedLetters; // Update the global variable

  var stimuliHTML = buildSpatialLetterHTML(selectedLetters);

  stim = {
    stimuli: stimuliHTML,
    data: {
      stim: selectedLetters,
      stimLength: stimLength,
      condition: condition,
      selectedLetters: selectedLetters,
      correct_response: correct_response,
    },
  };
  stimData = stim.data;
  return stim.stimuli;
};

var getMemoryRecognitionStim = function () {
  var stimLength = lastMemoryPresentationStimLength;
  var correct_response = lastMemoryPresentationCorrectResponse;
  var condition = lastMemoryPresentationCondition;

  var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var recognitionLetter = '';

  if (condition === 'in memory set' && stimLength > 0) {
    // Ensure there were letters shown previously and select one randomly
    var randomIndex = Math.floor(Math.random() * lastShownLetters.length);
    recognitionLetter = lastShownLetters[randomIndex];
  } else if (condition === 'not in memory set' && stimLength > 0) {
    // Filter out the shown letters from the full alphabet and randomly select one of the remaining letters
    var remainingLetters = letters
      .split('')
      .filter((letter) => !lastShownLetters.includes(letter));
    if (remainingLetters.length > 0) {
      var randomIndex = Math.floor(Math.random() * remainingLetters.length);
      recognitionLetter = remainingLetters[randomIndex];
    }
  } else if (stimLength === 0) {
    recognitionLetter = '()';
  }

  var stim = {
    stimuli:
      "<div class='centerbox'><div class='letter-text'>" +
      recognitionLetter +
      '</div></div>',
    data: {
      stim: recognitionLetter,
      stimLength: stimLength,
      condition: stimLength === 0 ? 'no memory set' : condition,
      recognitionLetter: recognitionLetter,
      correct_response:
        stimLength === 0 ? possibleResponses[3][1] : correct_response,
    },
  };
  stimData = stim.data;
  return stim.stimuli;
};

const getCurrBlockNum = () =>
  getExpStage() === 'practice' ? practiceCount : testCount;

var getPhase2SSD = () => SSD;

var getSSD = function (presentationData) {
  if (presentationData.stimLength === 2) {
    return SSD_2;
  } else if (presentationData.stimLength === 4) {
    return SSD_4;
  } else if (presentationData.stimLength === 6) {
    return SSD_6;
  }
};

const getCondition = () => condition;

const getCorrectResponse = () => correct_response;

var lastMemoryPresentationStimulus = null;
var lastMemoryPresentationCondition = null;
var lastMemoryPresentationCorrectResponse = null;
var lastMemoryPresentationStimLength = null;

var appendGoTrialData = function (data) {
  data.stim = stimData.stim;
  data.current_trial = currentTrial;
  data.condition = stimData.condition;
  data.block_num = getExpStage() == 'practice' ? practiceCount : testCount;
  data.correct_response = stimData.correct_response;
};

var appendMemoryPresentationData = function (data) {
  data.stim = stimData.stim;
  data.current_trial = currentTrial;
  data.stimLength = stimData.stimLength;
  data.condition = 'Presentation';
  data.block_num = getExpStage() == 'practice' ? practiceCount : testCount;
  data.correct_response = null;

  lastMemoryPresentationStimulus = stimData.stim;
  lastMemoryPresentationCondition = stimData.condition;
  lastMemoryPresentationStimLength = stimData.stimLength;
  lastMemoryPresentationCorrectResponse = stimData.correct_response;
};
var appendPhase2StopData = function (data) {
  currentTrial += 1;

  data.stim = stimData.stim;
  data.correct_response = correct_response;
  data.current_trial = currentTrial;
  data.condition = stimData.condition;
  data.block_num = getExpStage() == 'practice' ? practiceCount : testCount;

  if (data.condition == 'stop') {
    data.correct_trial = data.response === null ? 1 : 0;
    if (data.response == null && SSD < maxSSD) {
      SSD += 50;
    } else if (data.response != null && SSD > minSSD) {
      SSD -= 50;
    }
  } else {
    data.correct_trial = data.response === data.correct_response ? 1 : 0;
  }
};

var appendStopData = function (data, presentationData) {
  data.stim = stimData.stim;
  data.correct_response = correct_response;
  data.current_trial = currentTrial;
  data.condition = stimData.condition;
  data.block_num = getExpStage() == 'practice' ? practiceCount : testCount;

  if (data.condition === 'stop') {
    data.correct_trial = data.response === null ? 1 : 0;
    if (presentationData.stimLength === 2) {
      if (data.response == null && SSD_2 < maxSSD) {
        SSD_2 += 50;
      } else if (data.response != null && SSD_2 > minSSD) {
        SSD_2 -= 50;
      }
    } else if (presentationData.stimLength === 4) {
      if (data.response == null && SSD_4 < maxSSD) {
        SSD_4 += 50;
      } else if (data.response != null && SSD_4 > minSSD) {
        SSD_4 -= 50;
      }
    } else if (presentationData.stimLength === 6) {
      if (data.response == null && SSD_6 < maxSSD) {
        SSD_6 += 50;
      } else if (data.response != null && SSD_6 > minSSD) {
        SSD_6 -= 50;
      }
    }
  } else {
    data.correct_trial = data.response === data.correct_response ? 1 : 0;
  }
};

var appendMemoryTrialData = function (data) {
  currentTrial += 1;

  data.stim = stimData.stim;
  data.stimLength = stimData.stimLength;
  data.condition = stimData.condition;
  data.selectedLetters = stimData.selectedLetters;
  data.block_num = getExpStage() == 'practice' ? practiceCount : testCount;
  data.correct_response = stimData.correct_response;
  data.recognitionLetter = stimData.recognitionLetter;
  data.correct_trial = data.response === data.correct_response ? 1 : 0;
  data.current_trial = currentTrial;
};

/* ************************************ */
/*    Define Experimental Variables     */
/* ************************************ */
var possibleResponses;

function getKeyMappingForTask(group_index) {
  // Key mapping for circle/square must be the same for both tasks
  // group_index is in range 0 to 3, inclusive

  // SIMPLE STOP JUDGEMENTS
  // If group_index <= 1: circle - index; square - middle
  // If group_index >= 2; square - index; circle - index

  // STOP+WM JUDGEMENTS
  // If group_index even: in memory set - index; not in memory set - middle
  // If group_index odd: not in memory set - index; in memory set - middle

  if (group_index <= 1) {
    if (group_index % 2 === 0) {
      possibleResponses = [
        ['right hand index finger', ',', 'comma key (,)'],
        ['right hand middle finger', '.', 'period key (.)'],
        ['left hand index finger', 'x', 'X key'],
        ['left hand middle finger', 'z', 'Z key'],
      ];
    } else {
      possibleResponses = [
        ['right hand index finger', ',', 'comma key (,)'],
        ['right hand middle finger', '.', 'period key (.)'],
        ['left hand middle finger', 'z', 'Z key'],
        ['left hand index finger', 'x', 'X key'],
      ];
    }
  } else {
    if (group_index % 2 === 0) {
      possibleResponses = [
        ['right hand middle finger', '.', 'period key (.)'],
        ['right hand index finger', ',', 'comma key (,)'],
        ['left hand index finger', 'x', 'X key'],
        ['left hand middle finger', 'z', 'Z key'],
      ];
    } else {
      possibleResponses = [
        ['right hand middle finger', '.', 'period key (.)'],
        ['right hand index finger', ',', 'comma key (,)'],
        ['left hand middle finger', 'z', 'Z key'],
        ['left hand index finger', 'x', 'X key'],
      ];
    }
  }
}

var group_index =
  typeof window.efVars !== 'undefined' ? window.efVars.group_index : 1;

getKeyMappingForTask(group_index);

const stopChoices = [possibleResponses[0][1], possibleResponses[1][1]];
const letterChoices = [possibleResponses[2][1], possibleResponses[3][1]];

var endText = `
  <div class="centerbox">
    <p class="center-block-text">Thanks for completing this task!</p>
    <p class="center-block-text">Press <i>enter</i> to continue.</p>
  </div>
`;

var feedbackInstructText = `
  <p class="center-block-text">
    Welcome! This experiment will take around 65 minutes.
  </p>
  <p class="center-block-text">
    To avoid technical issues, please keep the experiment tab (on Chrome or Firefox) active and in fullscreen mode for the whole duration of each task.
  </p>
  <p class="center-block-text"> Press <i>enter</i> to begin.</p>
`;

var practiceStage = 'go_only';
var expStage = 'practice';
// *: Timing
const stimStimulusDuration = 1000;
const stimTrialDuration = 1500;

// generic task variables
var sumInstructTime = 0; // ms
var instructTimeThresh = 1; // /in seconds
var runAttentionChecks = true;

var practiceLen = 18; // must be divisible by shapes.length * stopSignalsConditions.length and possiblePracticeMemoryLengths.length * possibleConditions.length
var numTrialsPerBlock = 36; // must be divisible by shapes.length * stopSignalsConditions.length and possibleMemoryLengths.length * possibleConditions.length
var numTestBlocks = 12;
var goPracticeLen = 6;
var phase1PracticeLen = 12;
var phase2PracticeLen = 12;

var practiceThresh = 2; // max number of times to repeat practice
var accuracyThresh = 0.8;
var practiceAccuracyThresh = 0.7;
var practiceLetterAccuracyThresh = 0.6;
var goCorrectPracticeThresh = 0.6;
var goOmissionPracticeThresh = 0.4;
var memoryCorrectPracticeThresh = 0.6;
var memoryOmissionPracticeThresh = 0.2;

var missedResponseThresh = 0.2;
var rtThresh = 1000;
var letterRtThresh = 1250;

var SSD = 250;
var SSD_2 = 250;
var SSD_4 = 250;
var SSD_6 = 250;

var maxSSD = 1000;
var minSSD = 0;

var currentTrial = 0;
var correct_response = null;
var stimData = null;
var condition = null;

var maxStopCorrect = 0.75;
var minStopCorrect = 0.25;
var maxStopCorrectPractice = 1;
var minStopCorrectPractice = 0;

var stopSignalsConditions = ['go', 'go', 'stop'];
var shapes = ['circle', 'square'];
var recognition = ['in memory set', 'not in memory set'];
var possibleMemoryLengths = [2, 4, 6];

var positionSets = {
  2: [
    { x: -10, y: 0 },
    { x: 10, y: 0 },
  ],
  4: [
    { x: 0, y: -10 },
    { x: 10, y: 0 },
    { x: 0, y: 10 },
    { x: -10, y: 0 },
  ],
  6: [
    { x: 0, y: -10 },
    { x: 8.66, y: -5 },
    { x: 8.66, y: 5 },
    { x: 0, y: 10 },
    { x: -8.66, y: 5 },
    { x: -8.66, y: -5 },
  ],
};

var buildSpatialLetterHTML = function (selectedLetters) {
  var n = selectedLetters.length;
  var positions = positionSets[n];
  var stimuliHTML = "<div class='container'>";
  for (var i = 0; i < n; i++) {
    var px = positions[i].x;
    var py = positions[i].y;
    stimuliHTML +=
      `<div class="stimulus" style="transform: translate(calc(-50% + ${px}vw), calc(-50% + ${py}vw));">` +
      selectedLetters.charAt(i) +
      '</div>';
  }
  stimuliHTML += '</div>';
  return stimuliHTML;
};
var possibleConditions = ['in memory set', 'not in memory set'];

/* Image paths */ 
// local 
// var pathSource = '/static/experiments/stop_signal_wm_task/images/';
// expfactory deploy
var pathSource = '/deployment/repo/stop_signal_wm_experiment/ad17d3ae41c163fc0fa6889becd5e74a04d76f73/stop_signal_wm_task/images/';
var postFileType = ".png'></img>";
var preFileType = "<img class = center src='" + pathSource;
// append to images array to preload
var images = [pathSource + 'stopSignal' + '.png'];
for (i = 0; i < shapes.length; i++) {
  images.push(pathSource + shapes[i] + '.png');
}

var promptTextList = `
  <ul style="text-align:left;">
    <li>${
      possibleResponses[0][0] == 'right hand index finger'
        ? shapes[0]
        : shapes[1]
    }: comma key (,)</li>
    <li>${
      possibleResponses[1][0] == 'right hand middle finger'
        ? shapes[1]
        : shapes[0]
    }: period key (.)</li>
    <li>Do not respond if a star appears.</li>
    <li>${
      possibleResponses[2][0] == 'left hand index finger'
        ? recognition[0]
        : recognition[1]
    }: X key</li>
    <li>${
      possibleResponses[3][0] == 'left hand middle finger'
        ? recognition[1]
        : recognition[0]
    }: Z key</li>
  </ul>
`;

var goPromptTextList = `
  <ul style="text-align:left;">
    <li>${
      possibleResponses[0][0] == 'right hand index finger'
        ? shapes[0]
        : shapes[1]
    }: comma key (,)</li>
    <li>${
      possibleResponses[1][0] == 'right hand middle finger'
        ? shapes[1]
        : shapes[0]
    }: period key (.)</li>
  </ul>
`;

var phase1PromptTextList = `
  <ul style="text-align:left;">
    <li>${
      possibleResponses[2][0] == 'left hand index finger'
        ? recognition[0]
        : recognition[1]
    }: X key</li>
    <li>${
      possibleResponses[3][0] == 'left hand middle finger'
        ? recognition[1]
        : recognition[0]
    }: Z key</li>
  </ul>
`;

var phase2PromptTextList = `
  <ul style="text-align:left;">
    <li>${
      possibleResponses[0][0] == 'right hand index finger'
        ? shapes[0]
        : shapes[1]
    }: comma key (,)</li>
    <li>${
      possibleResponses[1][0] == 'right hand middle finger'
        ? shapes[1]
        : shapes[0]
    }: period key (.)</li>
    <li>Do not respond if a star appears.</li>
  </ul>
`;

var goPromptText = `
  <div class="prompt_box">
  <p class="center-block-text" style="font-size:16px; line-height:80%;">${
    possibleResponses[0][0] == 'right hand index finger' ? shapes[0] : shapes[1]
  }: comma key (,)</p>
  <p class="center-block-text" style="font-size:16px; line-height:80%;">${
    possibleResponses[1][0] == 'right hand middle finger'
      ? shapes[1]
      : shapes[0]
  }: period key (.)</p>
  </div>
  `;

var phase1PromptText = `
  <div class="prompt_box">
  <p class="center-block-text" style="font-size:16px; line-height:80%;">${
    possibleResponses[2][0] == 'left hand index finger'
      ? recognition[0]
      : recognition[1]
  }: X key</p>
  <p class="center-block-text" style="font-size:16px; line-height:80%;">${
    possibleResponses[3][0] == 'left hand middle finger'
      ? recognition[1]
      : recognition[0]
  }: Z key</p>
  </div>
  `;

var phase2PromptText = `
  <div class="prompt_box">
    <p class="center-block-text" style="font-size:16px; line-height:80%;">${
      possibleResponses[0][0] == 'right hand index finger'
        ? shapes[0]
        : shapes[1]
    }: comma key (,)</p>
    <p class="center-block-text" style="font-size:16px; line-height:80%;">${
      possibleResponses[1][0] == 'right hand middle finger'
        ? shapes[1]
        : shapes[0]
    }: period key (.)</p>
    <p class="center-block-text" style="font-size:16px; line-height:80%;">Do not respond if a star appears.</p>
  </div>
  `;

var promptText = `
  <div class="prompt_box">
    <p class="center-block-text" style="font-size:16px; line-height:80%;">${
      possibleResponses[0][0] == 'right hand index finger'
        ? shapes[0]
        : shapes[1]
    }: comma key (,)</p>
    <p class="center-block-text" style="font-size:16px; line-height:80%;">${
      possibleResponses[1][0] == 'right hand middle finger'
        ? shapes[1]
        : shapes[0]
    }: period key (.)</p>
    <p class="center-block-text" style="font-size:16px; line-height:80%;">Do not respond if a star appears.</p>
    <p class="center-block-text" style="font-size:16px; line-height:80%;">${
      possibleResponses[2][0] == 'left hand index finger'
        ? recognition[0]
        : recognition[1]
    }: X key</p>
    <p class="center-block-text" style="font-size:16px; line-height:80%;">${
      possibleResponses[3][0] == 'left hand middle finger'
        ? recognition[1]
        : recognition[0]
    }: Z key</p>
  </div>
`;

var speedReminder =
  '<p class = block-text>Try to respond as quickly and accurately as possible.</p>';

var goInstruct = [
  `
  <div class="centerbox">
    <p class="block-text">Place your <b>right hand index finger</b> on the <b>comma key (,)</b> and your <b>right hand middle finger</b> on the <b>period key (.)</b></p>
  </div>
  `,
  `
  <div class="centerbox">
  <p class="block-text">In this experiment, there will be three phases to the task you have to perform. You will do a practice of each part before going through a practice of the entire task.</p>
  </div>
  `,
  `
  <div class="centerbox">
    <p class="block-text">During this task, you will see shapes appear on the screen one at a time.</p>
    <p class="block-text">If the shape is a <b>${
      possibleResponses[0][0] == 'right hand index finger'
        ? shapes[0]
        : shapes[1]
    }</b>, press your <b>right hand index finger (comma key (,))</b>.</p>
    <p class="block-text">If the shape is a <b>${
      possibleResponses[1][0] == 'right hand middle finger'
        ? shapes[1]
        : shapes[0]
    }</b>, press your <b>right hand middle finger (period key (.))</b>.</p>
    <p class="block-text">You should respond as quickly and accurately as possible to each shape.</p>
  </div>
  `,
  `
  <div class="centerbox">
    <p class="block-text">Let's start a practice round of responding to the shapes on the screen. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>
    <p class="block-text">Try to respond as quickly and accurately as possible.</p>
    <p class="block-text">If the shape is a <b>${
      possibleResponses[0][0] == 'right hand index finger'
        ? shapes[0]
        : shapes[1]
    }</b>, press your <b>right hand index finger (comma key (,))</b>.</p>
    <p class="block-text">If the shape is a <b>${
      possibleResponses[1][0] == 'right hand middle finger'
        ? shapes[1]
        : shapes[0]
    }</b>, press your <b>right hand middle finger (period key (.))</b>.</p>
  </div>
  `,
];

var phase2Instruct = [
  `
  <div class="centerbox">
    <p class="block-text">On some trials, a star will appear around the shape, with or shortly after the shape appears.</p>
    <p class="block-text">If you see the star, please try your best to <b>withhold your response</b> on that trial.</p>
    <p class="block-text">If the star appears and you try your best to withhold your response, you will find that you will be able to stop sometimes, but not always.</p>
    <p class="block-text">Please <b>do not</b> slow down your responses in order to wait for the star. It is equally important to respond quickly on trials without the star as it is to stop on trials with the star.</p>
  </div>
  `,
  `
  <div class="centerbox">
    <p class="block-text">Now you will do a practice of the shape task with the star sometimes appearing. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>
    <p class="block-text">Try to respond as quickly and accurately as possible.</p>
    <p class="block-text">If the shape is a <b>${
      possibleResponses[0][0] == 'right hand index finger'
        ? shapes[0]
        : shapes[1]
    }</b>, press your <b>right hand index finger (comma key (,))</b>.</p>
    <p class="block-text">If the shape is a <b>${
      possibleResponses[1][0] == 'right hand middle finger'
        ? shapes[1]
        : shapes[0]
    }</b>, press your <b>right hand middle finger (period key (.))</b>.</p>
    <p class="block-text">If you see the star, please try your best to <b>withhold your response</b> on that trial.</p>
    <p class="block-text">Please <b>do not</b> slow down your responses to wait for the star.</p>
  </div>
  `,
];
var phase1Instruct = [
  `
  <div class="centerbox">
    <p class="block-text">Place your <b>left hand index finger</b> on the <b>X key</b> and your <b>left hand middle finger</b> on the <b>Z key.</b></p>
  </div>
  `,
  `
  <div class="centerbox">
    <p class="block-text">Before you do the shape task that you just practiced, you will see a number of letters appear on the screen.</p>
    <p class="block-text">There will be 2, 4, or 6 letters shown, and you must remember all of them. This will be called your memory set.</p>
    <p class="block-text">After you complete the shape task, you will see a single letter on screen.</p>
    <p class="block-text">If the single letter was <b>${
      possibleResponses[2][0] == 'left hand index finger'
        ? recognition[0]
        : recognition[1]
    }</b>, from the first phase, press your <b>left hand index finger (X key)</b>.</p>
    <p class="block-text">If the single letter was <b>${
      possibleResponses[3][0] == 'left hand middle finger'
        ? recognition[1]
        : recognition[0]
    }</b> from the first phase, press your <b>left hand middle finger (Z key)</b>.</p>
  </div>
  `,
  `
  <div class="centerbox">
    <p class="block-text">We’ll start a practice round of the memory task only. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>
    <p class="block-text">If the single letter was <b>${
      possibleResponses[2][0] == 'left hand index finger'
        ? recognition[0]
        : recognition[1]
    }</b>, from the first phase, press your <b>left hand index finger (X key)</b>.</p>
    <p class="block-text">If the single letter was <b>${
      possibleResponses[3][0] == 'left hand middle finger'
        ? recognition[1]
        : recognition[0]
    }</b> from the first phase, press your <b>left hand middle finger (Z key)</b>.</p>
    <p class="block-text">Remember to respond as quickly and accurately as possible.</p>
  </div>
  `,
];
var pageInstruct = [
  `
  <div class="large-centerbox">
    <p class="block-text">Finally, we will start a practice round of the entire task together. During practice, you will receive feedback and a reminder of the rules. These will be taken out for the test, so make sure you understand the instructions before moving on.</p>
    <p class="block-text">Try to respond as quickly and accurately as possible.</p>

    <p class="block-text">On each trial, you will see 2, 4, or 6 letters. Remember them. Then you will see a shape.</p>
    <p class="block-text">If the shape is a <b>${
      possibleResponses[0][0] == 'right hand index finger'
        ? shapes[0]
        : shapes[1]
    }</b>, press your <b>right hand index finger (comma key (,))</b>.</p>
    <p class="block-text">If the shape is a <b>${
      possibleResponses[1][0] == 'right hand middle finger'
        ? shapes[1]
        : shapes[0]
    }</b>, press your <b>right hand middle finger (period key (.))</b>.</p>
    <p class="block-text">If you see a star around the shape, please try your best to <b>withhold your response</b> on that trial.</p>

    <p class="block-text">Then you will see a single letter.</p>
    <p class="block-text">If the single letter was <b>${
      possibleResponses[2][0] == 'left hand index finger'
        ? recognition[0]
        : recognition[1]
    }</b>, from the first phase, press your <b>left hand index finger (X key)</b>.</p>
    <p class="block-text">If the single letter was <b>${
      possibleResponses[3][0] == 'left hand middle finger'
        ? recognition[1]
        : recognition[0]
    }</b> from the first phase, press your <b>left hand middle finger (Z key)</b>.</p>
  </div>
  `,
];

/* ************************************ */
/*        Set up jsPsych blocks         */
/* ************************************ */
var attentionCheckBlock = {
  type: jsPsychAttentionCheckRdoc,
  data: {
    trial_id: 'test_attention_check',
    trial_duration: 60000,
    timing_post_trial: 200,
    exp_stage: 'test',
  },
  question: getCurrAttentionCheckQuestion,
  key_answer: getCurrAttentionCheckAnswer,
  response_ends_trial: true,
  timing_post_trial: 200,
  trial_duration: 60000,
  on_finish: (data) => (data['block_num'] = testCount),
};

var attentionNode = {
  timeline: [attentionCheckBlock],
  conditional_function: function () {
    return runAttentionChecks;
  },
};

var feedbackInstructBlock = {
  type: jsPsychHtmlKeyboardResponse,
  choices: ['Enter'],
  data: {
    trial_id: 'instruction_feedback',
    trial_duration: 180000,
  },
  stimulus: getInstructFeedback,
  post_trial_gap: 0,
  trial_duration: 180000,
};

var goInstructionsBlock = {
  type: jsPsychInstructions,
  data: {
    trial_id: 'instructions',
    trial_duration: null,
    stimulus: goInstruct,
  },
  pages: goInstruct,
  allow_keys: false,
  show_clickable_nav: true,
  post_trial_gap: 0,
};

var phase1InstructionsBlock = {
  type: jsPsychInstructions,
  data: {
    trial_id: 'instructions',
    trial_duration: null,
    stimulus: phase1Instruct,
  },
  pages: phase1Instruct,
  allow_keys: false,
  show_clickable_nav: true,
  post_trial_gap: 0,
};

var phase2InstructionsBlock = {
  type: jsPsychInstructions,
  data: {
    trial_id: 'instructions',
    trial_duration: null,
    stimulus: phase2Instruct,
  },
  pages: phase2Instruct,
  allow_keys: false,
  show_clickable_nav: true,
  post_trial_gap: 0,
};

var instructionsBlock = {
  type: jsPsychInstructions,
  data: {
    trial_id: 'instructions',
    trial_duration: null,
    stimulus: pageInstruct,
  },
  pages: pageInstruct,
  allow_keys: false,
  show_clickable_nav: true,
  post_trial_gap: 0,
};

var goInstructionNode = {
  timeline: [feedbackInstructBlock, goInstructionsBlock],
};
var phase1InstructionNode = {
  timeline: [phase1InstructionsBlock],
};

var phase2InstructionNode = {
  timeline: [phase2InstructionsBlock],
};

var instructionNode = {
  timeline: [instructionsBlock],
  loop_function: function (data) {
    for (i = 0; i < data.trials.length; i++) {
      if (
        data.trials[i].trial_id == 'instructions' &&
        data.trials[i].rt != null
      ) {
        sumInstructTime += data.trials[i].rt;
      }
    }
    if (sumInstructTime <= instructTimeThresh * 1000) {
      feedbackInstructText =
        '<p class=block-text>Read through instructions too quickly. Please take your time and make sure you understand the instructions.</p><p class=block-text>Press <i>enter</i> to continue.</p>';
      return true;
    } else if (sumInstructTime > instructTimeThresh * 1000) {
      feedbackInstructText =
        '<p class=block-text>Done with instructions. Press <i>enter</i> to continue.</p>';
      return false;
    }
  },
};

var fixationBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div class = centerbox><div class = fixation>+</div></div>',
  choices: ['NO_KEYS'],
  data: {
    trial_id: 'test_fixation',
    trial_duration: 250,
    stimulus_duration: 250,
    exp_stage: 'test',
  },
  post_trial_gap: 0,
  stimulus_duration: 250,
  trial_duration: 250,
  on_finish: (data) => (data['block_num'] = testCount),
};

var practiceFixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div class = centerbox><div class = fixation>+</div></div>',
  choices: ['NO_KEYS'],
  data: {
    trial_id: 'practice_fixation',
    trial_duration: 250,
    stimulus_duration: 250,
    exp_stage: 'practice',
  },
  post_trial_gap: 0,
  stimulus_duration: 250,
  trial_duration: 250,
  on_finish: (data) => (data['block_num'] = practiceCount),
  prompt: function() {
    if (practiceStage === 'go_only') {
      return goPromptText;
    } else if (practiceStage === 'stop_only') {
      return phase2PromptText;
    } else if (practiceStage === 'memory_recognition_only') {
      return phase1PromptText;
    } else if (practiceStage === 'full_trial') {
      return promptText;
    } else return;
  },
};

var feedbackText =
  '<div class = centerbox><p class = center-block-text>Press <i>enter</i> to begin practice.</p></div>';

// Flags to ensure feedbackText is set only once per node
var goPracticeFirstLoop = true;
var phase1PracticeFirstLoop = true;
var phase2PracticeFirstLoop = true;
var practiceFirstLoop = true;

// Function to set feedbackText only once
function setFeedbackTextIfFirstLoop(firstLoopFlag) {
  if (firstLoopFlag) {
    feedbackText =
      "<div class='centerbox'><p class='center-block-text'>Press <i>enter</i> to begin practice.</p></div>";
  }
}

// Define setupFeedbackText functions for each practice node
const setupGoPracticeFeedbackText = {
  type: jsPsychCallFunction,
  func: function () {
    setFeedbackTextIfFirstLoop(goPracticeFirstLoop);
    goPracticeFirstLoop = false;
  },
};

const setupPhase1PracticeFeedbackText = {
  type: jsPsychCallFunction,
  func: function () {
    setFeedbackTextIfFirstLoop(phase1PracticeFirstLoop);
    phase1PracticeFirstLoop = false;
  },
};

const setupPhase2PracticeFeedbackText = {
  type: jsPsychCallFunction,
  func: function () {
    setFeedbackTextIfFirstLoop(phase2PracticeFirstLoop);
    phase2PracticeFirstLoop = false;
  },
};

const setupPracticeFeedbackText = {
  type: jsPsychCallFunction,
  func: function () {
    setFeedbackTextIfFirstLoop(practiceFirstLoop);
    practiceFirstLoop = false;
  },
};

var feedbackBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: function () {
    if (getExpStage() == 'practice') {
      return {
        trial_id: 'practice_feedback',
        exp_stage: getExpStage(),
        trial_duration: 60000,
        block_num: practiceCount,
      };
    } else {
      return {
        trial_id: 'test_feedback',
        exp_stage: getExpStage(),
        trial_duration: 60000,
        block_num: testCount,
      };
    }
  },
  stimulus: getFeedback,
  post_trial_gap: 0,
  trial_duration: 60000,
  choices: ['Enter'],
  response_ends_trial: true,
};

var ITIms = null;

// *** ITI *** //
var ITIBlock = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div class = centerbox><div class = fixation>+</div></div>',
  is_html: true,
  choices: ['NO_KEYS'],
  data: function () {
    if (getExpStage() == 'practice') {
      return {
        trial_id: 'practice_ITI',
        block_num: practiceCount,
        exp_stage: 'practice',
      };
    } else {
      return {
        trial_id: 'test_ITI',
        block_num: testCount,
        exp_stage: 'test',
      };
    }
  },
  post_trial_gap: 0,
  trial_duration: 250,
  stimulus_duration: 250,
  on_finish: function (data) {
    data['trial_duration'] = 250;
    data['stimulus_duration'] = 250;
  },
  prompt: function () {
    if (expStage === 'test') return;

    if (practiceStage === 'go_only') {
      return goPromptText;
    } else if (practiceStage === 'stop_only') {
      return phase2PromptText;
    } else if (practiceStage === 'memory_recognition_only') {
      return phase1PromptText;
    } else if (practiceStage === 'full_trial') {
      return promptText;
    } else return;
  },
};

/** ******************************************/
/*				Set up nodes				*/
/** ******************************************/
var goPracticeCount = 0;
var goPracticeTrials = [];
for (i = 0; i < goPracticeLen; i++) {
  var practiceGoTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getGoStim,
    data: {
      trial_id: 'practice_go_trial',
      exp_stage: 'practice',
      trial_duration: stimTrialDuration,
      stimulus_duration: stimStimulusDuration,
    },
    choices: stopChoices,
    correct_choice: getCorrectResponse,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1500
    response_ends_trial: false,
    post_trial_gap: 0,
    prompt: goPromptText,
    on_finish: function (data) {
      appendGoTrialData(data);
    },
    prompt: goPromptText,
  };

  var practiceGoFeedbackBlock = {
    type: jsPsychHtmlKeyboardResponse,
    data: function () {
      return {
        exp_stage: 'practice',
        trial_id: 'practice_feedback',
        trial_duration: 500,
        stimulus_duration: 500,
        block_num: practiceCount,
      };
    },
    choices: ['NO_KEYS'],
    stimulus: function () {
      var last = jsPsych.data.get().last(1).trials[0];
      if (last.response === last.correct_response) {
        return (
          '<div class=center-box><div class=center-text><font size = 20>Correct!</font></div></div>' +
          goPromptText
        );
      } else if (last.response === null) {
        return (
          '<div class=center-box><div class=center-text><font size = 20>Respond Faster!</font></div></div>' +
          goPromptText
        );
      } else {
        return (
          '<div class=center-box><div class=center-text><font size = 20>Incorrect</font></div></div>' +
          goPromptText
        );
      }
    },
    post_trial_gap: 0,
    stimulus_duration: 500, // 500
    trial_duration: 500, // 500
    response_ends_trial: false,
    prompt: goPromptText,
  };

  goPracticeTrials.push(
    practiceFixation,
    practiceGoTrial,
    practiceGoFeedbackBlock,
    ITIBlock
  );
}

var goPracticeNode = {
  timeline: [setupGoPracticeFeedbackText, feedbackBlock].concat(
    goPracticeTrials
  ),
  loop_function: function (data) {
    goPracticeCount += 1;

    var correct = 0;
    var total = 0;
    var missedResponses = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (data.trials[i].trial_id == 'practice_go_trial') {
        total += 1;
        if (data.trials[i].response == data.trials[i].correct_response) {
          correct += 1;
        }
        if (data.trials[i].response == null) {
          missedResponses += 1;
        }
      }
    }

    if (
      goPracticeCount == practiceThresh ||
      (correct / total >= goCorrectPracticeThresh &&
        missedResponses / total <= goOmissionPracticeThresh)
    ) {
      practiceStage = 'stop_only';
      return false;
    } else {
      feedbackText = `<div class = centerbox><p class = block-text>Please take this time to read your feedback!</p>`;

      if (correct / total < goCorrectPracticeThresh) {
        feedbackText += `<p class = block-text>Your accuracy is too low. Remember:</p>
          ${goPromptTextList}`;
      }

      if (missedResponses / total > goOmissionPracticeThresh) {
        feedbackText += `<p class = block-text>You have been responding too slowly. Remember:</p>
          ${speedReminder}`;

        feedbackText +=
          `<p class=block-text>We are now going to repeat the practice round.</p>` +
          `<p class=block-text>Press <i>enter</i> to begin.</p></div>`;
      }
      
      goStims = createGoTrialTypes(goPracticeLen);
      return true;
    }
  },
};

var phase1PracticeCount = 0;
var phase1PracticeTrials = [];
for (i = 0; i < phase1PracticeLen; i++) {
  var practiceMemoryPresentationSeparate = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getPhase1MemoryPresentationStim,
    data: {
      trial_id: 'practice_memory_trial',
      exp_stage: 'practice',
      trial_duration: 2000,
      stimulus_duration: 2000,
    },
    choices: ['NO_KEYS'],
    stimulus_duration: 2000,
    trial_duration: 2000,
    response_ends_trial: false,
    post_trial_gap: 0,
    on_finish: function (data) {
      appendMemoryPresentationData(data);
      presentationData = jsPsych.data.get().last(1).values()[0];
    },
    prompt: phase1PromptText,
  };
  var practiceMemoryRecognitionSeparate = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getMemoryRecognitionStim,
    data: {
      trial_id: 'practice_memory_recognition',
      exp_stage: 'practice',
      trial_duration: 1500,
      stimulus_duration: 1500,
    },
    choices: letterChoices,
    correct_choice: getCorrectResponse,
    stimulus_duration: 1500,
    trial_duration: 1500,
    response_ends_trial: false,
    post_trial_gap: 0,
    on_finish: function (data) {
      appendMemoryTrialData(data);
    },
    prompt: phase1PromptText,
  };
  var practiceRecognitionFeedbackBlock = {
    type: jsPsychHtmlKeyboardResponse,
    data: function () {
      return {
        exp_stage: 'practice',
        trial_id: 'practice_recognition_feedback',
        trial_duration: 500,
        stimulus_duration: 500,
        block_num: practiceCount,
      };
    },
    choices: ['NO_KEYS'],
    stimulus: function () {
      var last = jsPsych.data.get().last(1).trials[0];
      if (last.response === last.correct_response) {
        return (
          '<div class=center-box><div class=center-text><font size = 20>Correct!</font></div></div>' +
          phase1PromptText
        );
      } else if (last.response === null) {
        return (
          '<div class=center-box><div class=center-text><font size = 20>Respond Faster!</font></div></div>' +
          phase1PromptText
        );
      } else {
        return (
          '<div class=center-box><div class=center-text><font size = 20>Incorrect</font></div></div>' +
          phase1PromptText
        );
      }
    },
    post_trial_gap: 0,
    stimulus_duration: 500, // 500
    trial_duration: 500, // 500
    response_ends_trial: false,
    prompt: phase1PromptText,
  };

  phase1PracticeTrials.push(
    practiceFixation,
    practiceMemoryPresentationSeparate,
    practiceMemoryRecognitionSeparate,
    practiceRecognitionFeedbackBlock,
    ITIBlock
  );
}
var phase1PracticeNode = {
  timeline: [setupPhase1PracticeFeedbackText, feedbackBlock].concat(
    phase1PracticeTrials
  ),
  loop_function: function (data) {
    phase1PracticeCount += 1;
    var correct = 0;
    var total = 0;
    var missedResponses = 0;

    for (var i = 0; i < data.trials.length; i++) {
      if (data.trials[i].trial_id == 'practice_memory_recognition') {
        total += 1;
        if (data.trials[i].response == data.trials[i].correct_response) {
          correct += 1;
        }
        if (data.trials[i].response == null) {
          missedResponses += 1;
        }
      }
    }

    if (
      phase1PracticeCount == practiceThresh ||
      (correct / total >= memoryCorrectPracticeThresh &&
        missedResponses / total <= memoryOmissionPracticeThresh)
    ) {
      practiceStage = 'full_trial';
      return false;
    } else {
      feedbackText = `<div class = centerbox><p class = block-text>Please take this time to read your feedback!</p>`;

      if (correct / total < memoryCorrectPracticeThresh) {
        feedbackText += `<p class = block-text>Your accuracy is too low. Remember:</p>
          ${phase1PromptTextList}`;
      }

      if (missedResponses / total > memoryOmissionPracticeThresh) {
        feedbackText += `<p class = block-text>You have been responding too slowly. Remember:</p>
          ${speedReminder}`;
      }

      feedbackText +=
        `<p class=block-text>We are now going to repeat the practice round.</p>` +
        `<p class=block-text>Press <i>enter</i> to begin.</p></div>`;
      phase1Stims = createPhase1TrialTypes(phase1PracticeLen);
      return true;
    }
  },
};

var phase2PracticeCount = 0;
var phase2PracticeTrials = [];
for (i = 0; i < phase2PracticeLen; i++) {
  var practiceStopTrial = {
    type: jsPoldracklabStopSignal,
    stimulus: phase2GetStim,
    SS_stimulus: getStopStim,
    SS_trial_type: getCondition,
    data: {
      trial_id: 'practice_stop_trial',
      exp_stage: 'practice',
      trial_duration: stimTrialDuration,
      stimulus_duration: stimStimulusDuration,
    },
    choices: stopChoices,
    correct_choice: getCorrectResponse,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1500
    response_ends_trial: false,
    SSD: getPhase2SSD,
    SS_duration: 500, // 500
    post_trial_gap: 0,
    on_finish: function (data) {
      appendPhase2StopData(data);
    },
    prompt: phase2PromptText,
  };

  var practiceStopFeedbackBlock = {
    type: jsPsychHtmlKeyboardResponse,
    data: function () {
      return {
        exp_stage: 'practice',
        trial_id: 'practice_feedback',
        trial_duration: 500,
        stimulus_duration: 500,
        block_num: practiceCount,
      };
    },
    choices: ['NO_KEYS'],
    stimulus: function () {
      var last = jsPsych.data.get().last(1).trials[0];
      if (last.condition == 'stop') {
        if (last.response === null) {
          return (
            '<div class=center-box><div class=center-text><font size = 20>Correct!</font></div></div>' +
            phase2PromptText
          );
        } else {
          return (
            '<div class=center-box><div class=center-text><font size = 20>There was a star</font></div></div>' +
            phase2PromptText
          );
        }
      } else {
        if (last.response === null) {
          return (
            '<div class=center-box><div class=center-text><font size = 20>Respond Faster!</font></div></div>' +
            phase2PromptText
          );
        } else if (last.response === last.correct_response) {
          return (
            '<div class=center-box><div class=center-text><font size = 20>Correct!</font></div></div>' +
            phase2PromptText
          );
        } else {
          return (
            '<div class=center-box><div class=center-text><font size = 20>Incorrect</font></div></div>' +
            phase2PromptText
          );
        }
      }
    },
    post_trial_gap: 0,
    stimulus_duration: 500, // 500
    trial_duration: 500, // 500
    response_ends_trial: false,
    prompt: phase2PromptText,
  };

  phase2PracticeTrials.push(
    practiceFixation,
    practiceStopTrial,
    practiceStopFeedbackBlock,
    ITIBlock
  );
}
var phase2PracticeNode = {
  timeline: [setupPhase2PracticeFeedbackText, feedbackBlock].concat(
    phase2PracticeTrials
  ),
  loop_function: function (data) {
    phase2PracticeCount += 1;
    var goLength = 0;
    var sumGoRT = 0;
    var numGoResponses = 0;
    var sumGoCorrect = 0;

    var stopLength = 0;
    var numStopResponses = 0;
    SSDs = [];

    for (var i = 0; i < data.trials.length; i++) {
      if (data.trials[i].trial_id == 'practice_stop_trial') {
        if (
          data.trials[i].condition == 'go' ||
          data.trials[i].condition == 'stop'
        ) {
          SSDs.push(data.trials[i].SSD);
        }
        if (data.trials[i].condition == 'go') {
          goLength += 1;
          if (data.trials[i].response != null) {
            numGoResponses += 1;
            sumGoRT += data.trials[i].rt;
            if (data.trials[i].response == data.trials[i].correct_response) {
              sumGoCorrect += 1;
            }
          }
        } else if (data.trials[i].condition == 'stop') {
          stopLength += 1;
          if (data.trials[i].response != null) {
            numStopResponses += 1;
          }
        }
      }
    }

    var avgGoRT = sumGoRT / numGoResponses;
    var missedGoResponses = (goLength - numGoResponses) / goLength;
    var aveShapeRespondCorrect = sumGoCorrect / goLength;
    var stopSignalRespond = numStopResponses / stopLength;
    var SSD_0_percentage = SSDs.filter((x) => x == 0).length / SSDs.length;

    if (
      phase2PracticeCount == practiceThresh ||
      (aveShapeRespondCorrect > practiceAccuracyThresh &&
        avgGoRT <= rtThresh &&
        missedGoResponses <= missedResponseThresh &&
        stopSignalRespond > minStopCorrectPractice &&
        stopSignalRespond < maxStopCorrectPractice)
    ) {
      practiceStage = 'memory_recognition_only';
      return false;
    } else {
      feedbackText =
        '<div class = centerbox><p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>';

      if (aveShapeRespondCorrect <= practiceAccuracyThresh) {
        feedbackText += `
        <p class="block-text">Your accuracy is low. Remember:</p>
        ${phase2PromptTextList}`;
      }
      if (avgGoRT > rtThresh) {
        feedbackText += `
        <p class="block-text">You have been responding too slowly to the shapes.</p>
        ${speedReminder}`;
      }
      if (missedGoResponses > missedResponseThresh) {
        feedbackText += `
        <p class="block-text">You have missed a number of trials. Remember to respond to every shape as quickly and accurately as possible.</p>`;
      }
      if (stopSignalRespond === maxStopCorrectPractice) {
        feedbackText += `
        <p class="block-text">You have not been stopping your response when stars are present.</p>
        <p class="block-text">Please try your best to stop your response if you see a star.</p>`;
      }
      if (stopSignalRespond === minStopCorrectPractice) {
        feedbackText += `
        <p class="block-text">Please do not slow down and wait for the star to appear. Respond as quickly and accurately as possible when a star does not appear.</p>`;
      }
      feedbackText +=
        `<p class=block-text>We are now going to repeat the practice round.</p>` +
        `<p class=block-text>Press <i>enter</i> to begin.</p></div>`;
      phase2Stims = createPhase2TrialTypes(phase2PracticeLen);
      return true;
    }
  },
};

var practiceStopTrials = [];
for (i = 0; i < practiceLen; i++) {
  if (i == 0) {
    practiceStopTrials.push(practiceFixation);
  }
  var practiceMemoryPresentation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getMemoryPresentationStim,
    data: {
      trial_id: 'practice_memory_trial',
      exp_stage: 'practice',
      trial_duration: 2500,
      stimulus_duration: 2000,
    },
    choices: ['NO_KEYS'],
    stimulus_duration: 2000,
    trial_duration: 2500,
    response_ends_trial: false,
    post_trial_gap: 0,
    on_finish: function (data) {
      appendMemoryPresentationData(data);
      presentationData = jsPsych.data.get().last(1).values()[0];
    },
    prompt: promptText,
  };

  var practiceStopTrial = {
    type: jsPoldracklabStopSignal,
    stimulus: getStim,
    SS_stimulus: getStopStim,
    SS_trial_type: getCondition,
    data: {
      trial_id: 'practice_stop_trial',
      exp_stage: 'practice',
      trial_duration: stimTrialDuration + 500,
      stimulus_duration: stimStimulusDuration,
    },
    choices: stopChoices,
    correct_choice: getCorrectResponse,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration + 500, // 1500
    response_ends_trial: false,
    SSD: function () {
      presentationData = jsPsych.data.get().last(1).values()[0];
      return getSSD(presentationData);
    },
    SS_duration: 500, // 500
    post_trial_gap: 0,
    on_finish: function (data) {
      presentationData = jsPsych.data.get().last(2).values()[0];
      appendStopData(data, presentationData);
    },
    prompt: promptText,
  };
  var practiceMemoryRecognition = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getMemoryRecognitionStim,
    data: {
      trial_id: 'practice_memory_recognition',
      exp_stage: 'practice',
      trial_duration: 1500,
      stimulus_duration: 2000,
    },
    choices: letterChoices,
    correct_choice: getCorrectResponse,
    stimulus_duration: 1500,
    trial_duration: 2000,
    response_ends_trial: false,
    post_trial_gap: 0,
    on_finish: function (data) {
      appendMemoryTrialData(data);
    },
    prompt: promptText,
  };
  var practiceStopFeedbackBlock = {
    type: jsPsychHtmlKeyboardResponse,
    data: function () {
      return {
        exp_stage: 'practice',
        trial_id: 'practice_feedback',
        trial_duration: 500,
        stimulus_duration: 500,
        block_num: practiceCount,
      };
    },
    choices: ['NO_KEYS'],
    stimulus: function () {
      var last = jsPsych.data.get().last(1).trials[0];
      if (last.condition == 'stop') {
        if (last.response === null) {
          return (
            '<div class=center-box><div class=center-text><font size = 20>Correct!</font></div></div>' +
            promptText
          );
        } else {
          return (
            '<div class=center-box><div class=center-text><font size = 20>There was a star</font></div></div>' +
            promptText
          );
        }
      } else {
        if (last.response == null) {
          return (
            '<div class=center-box><div class=center-text><font size = 20>Respond Faster!</font></div></div>' +
            promptText
          );
        } else if (last.response === last.correct_response) {
          return (
            '<div class=center-box><div class=center-text><font size = 20>Correct!</font></div></div>' +
            promptText
          );
        } else {
          return (
            '<div class=center-box><div class=center-text><font size = 20>Incorrect</font></div></div>' +
            promptText
          );
        }
      }
    },
    post_trial_gap: 0,
    stimulus_duration: 500, // 500
    trial_duration: 500, // 500
    response_ends_trial: false,
    prompt: promptText,
  };

  var practiceRecognitionFeedbackBlock = {
    type: jsPsychHtmlKeyboardResponse,
    data: function () {
      return {
        exp_stage: 'practice',
        trial_id: 'practice_recognition_feedback',
        trial_duration: 500,
        stimulus_duration: 500,
        block_num: practiceCount,
      };
    },
    choices: ['NO_KEYS'],
    stimulus: function () {
      var last = jsPsych.data.get().last(1).trials[0];
      if (last.response === last.correct_response) {
        return (
          '<div class=center-box><div class=center-text><font size = 20>Correct!</font></div></div>' +
          promptText
        );
      } else if (last.response === null) {
        return (
          '<div class=center-box><div class=center-text><font size = 20>Respond Faster!</font></div></div>' +
          promptText
        );
      } else {
        return (
          '<div class=center-box><div class=center-text><font size = 20>Incorrect</font></div></div>' +
          promptText
        );
      }
    },
    post_trial_gap: 0,
    stimulus_duration: 500, // 500
    trial_duration: 500, // 500
    response_ends_trial: false,
    prompt: promptText,
  };

  practiceStopTrials.push(
    practiceFixation,
    practiceMemoryPresentation,
    practiceStopTrial,
    practiceStopFeedbackBlock,
    practiceMemoryRecognition,
    practiceRecognitionFeedbackBlock,
    ITIBlock
  );
}

var practiceCount = 0;
var practiceNode = {
  timeline: [setupPracticeFeedbackText, feedbackBlock].concat(
    practiceStopTrials
  ),
  loop_function: function (data) {
    practiceCount += 1;
    // go trials
    var goLength = 0;
    var sumGoRT = 0;
    var numGoResponses = 0;
    var sumGoCorrect = 0;
    // stop trials
    var stopLength = 0;
    var numStopResponses = 0;
    // SSDs
    SSDs = [];

    // memory trails
    var recognitionLength = 0;
    var recognitionRT = 0;
    var recognitionCorrect = 0;
    var recognitionResponses = 0;
    for (i = 0; i < data.trials.length; i++) {
      if (
        data.trials[i].condition == 'go' ||
        data.trials[i].condition == 'stop'
      ) {
        SSDs.push(data.trials[i].SSD);
      }
      if (
        data.trials[i].condition == 'go' &&
        data.trials[i].block_num == getCurrBlockNum() - 1
      ) {
        goLength += 1;
        if (data.trials[i].rt != null) {
          numGoResponses += 1;
          sumGoRT += data.trials[i].rt;
          if (data.trials[i].response == data.trials[i].correct_response) {
            sumGoCorrect += 1;
          }
        }
      } else if (
        data.trials[i].condition == 'stop' &&
        data.trials[i].block_num == getCurrBlockNum() - 1
      ) {
        stopLength += 1;
        if (data.trials[i].rt != null) {
          numStopResponses += 1;
        }
      } else if (
        (data.trials[i].condition == 'in memory set' ||
          data.trials[i].condition == 'not in memory set') &&
        data.trials[i].block_num == getCurrBlockNum() - 1
      ) {
        recognitionLength += 1;
        if (data.trials[i].rt != null) {
          recognitionResponses += 1;
          recognitionRT += data.trials[i].rt;
          if (data.trials[i].response == data.trials[i].correct_response) {
            recognitionCorrect += 1;
          }
        }
      }
    }

    var avgGoRT = sumGoRT / numGoResponses;
    var missedGoResponses = (goLength - numGoResponses) / goLength;
    var missedLetterResponses =
      (recognitionLength - recognitionResponses) / recognitionLength;
    var aveShapeRespondCorrect = sumGoCorrect / goLength;
    var stopSignalRespond = numStopResponses / stopLength;
    var avgRecognitionRT = recognitionRT / recognitionResponses;
    var recognitionAccuracy = recognitionCorrect / recognitionLength;
    var SSD_0_percentage = SSDs.filter((x) => x == 0).length / SSDs.length;

    // fill out more feedback as needed. it is not complete at the moment

    // responding too slow on go trials
    // responding too inaccurately on go trials
    // not stopping enough
    // stopping too much
    // getting memory trials wrong
    if (
      practiceCount == practiceThresh ||
      (aveShapeRespondCorrect > practiceAccuracyThresh &&
        recognitionAccuracy > practiceLetterAccuracyThresh &&
        avgGoRT <= rtThresh &&
        avgRecognitionRT <= letterRtThresh &&
        missedGoResponses <= missedResponseThresh &&
        missedLetterResponses <= missedResponseThresh &&
        stopSignalRespond > minStopCorrectPractice &&
        stopSignalRespond < maxStopCorrectPractice)
    ) {
      feedbackText = `
      <div class="centerbox">
        <p class="block-text">We will now begin the test portion.</p>
        <p class="block-text">Keep your <b>right hand index finger</b> on the <b>comma key (,)</b> and your <b>right hand middle finger</b> on the <b>period key (.)</b></p>
        <p class="block-text">Keep your <b>left hand index finger</b> on the <b>X key</b> and your <b>left hand middle finger</b> on the <b>Z key</b></p>
        <p class="block-text">Press <i>enter</i> to continue.</p>
      </div>`;

      expStage = 'test';
      stims = createTrialTypes(numTrialsPerBlock);
      return false;
    } else {
      feedbackText =
        '<div class = centerbox><p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>';

      if (aveShapeRespondCorrect <= practiceAccuracyThresh) {
        feedbackText += `
        <p class="block-text">Your shape accuracy is low. Remember:</p>
        ${phase2PromptTextList}`;
      }

      if (recognitionAccuracy <= practiceLetterAccuracyThresh) {
        feedbackText += `
        <p class="block-text">Your letter memory accuracy is low. Remember:</p>
        ${phase1PromptTextList}`;
      }

      if (avgGoRT > rtThresh) {
        feedbackText += `
        <p class="block-text">You have been responding too slowly to the shapes.</p>
        ${speedReminder}`;
      }

      if (avgRecognitionRT > letterRtThresh) {
        feedbackText += `
        <p class="block-text">You have been responding too slowly to the letters.</p>
        ${speedReminder}`;
      }

      if (
        missedGoResponses > missedResponseThresh ||
        missedLetterResponses > missedResponseThresh
      ) {
        if (missedGoResponses > missedResponseThresh) {
          feedbackText += `
          <p class="block-text">You have missed a number of shape trials. Remember to respond to every shape as quickly and accurately as possible.</p>`;
        }
        if (missedLetterResponses > missedResponseThresh) {
          feedbackText += `
          <p class="block-text">You have missed a number of letter trials. Remember to respond to every letter as quickly and accurately as possible.</p>`;
        }
      }

      if (stopSignalRespond === maxStopCorrectPractice) {
        feedbackText += `
        <p class="block-text">You have not been stopping your response when stars are present.</p>
        <p class="block-text">Please try your best to stop your response if you see a star.</p>`;
      }

      if (stopSignalRespond === minStopCorrectPractice) {
        feedbackText += `
        <p class="block-text">Please do not slow down and wait for the star to appear. Respond as quickly and accurately as possible when a star does not appear.</p>`;
      }

      feedbackText +=
        `<p class="block-text">We are now going to repeat the practice round.</p>` +
        `<p class="block-text">Press <i>enter</i> to begin.</p></div>`;

      stims = createPracticeTrialTypes(practiceLen);
      return true;
    }
  },
};

var testTrials = [];
testTrials.push(attentionNode);
for (i = 0; i < numTrialsPerBlock; i++) {
  if (i == 0) {
    testTrials.push(fixationBlock);
  }
  var testMemoryPresentation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getMemoryPresentationStim,
    data: {
      trial_id: 'test_memory_trial',
      exp_stage: 'test',
      trial_duration: 2000,
      stimulus_duration: 2000,
    },
    choices: ['NO_KEYS'],
    stimulus_duration: 2000,
    trial_duration: 2000,
    response_ends_trial: false,
    post_trial_gap: 500,
    on_finish: function(data) {
      appendMemoryPresentationData(data);
    },
  };

  var testStopTrial = {
    type: jsPoldracklabStopSignal,
    stimulus: getStim,
    SS_stimulus: getStopStim,
    SS_trial_type: getCondition,
    data: {
      trial_id: 'test_stop_trial',
      exp_stage: 'test',
      trial_duration: stimTrialDuration,
      stimulus_duration: stimStimulusDuration,
    },
    choices: stopChoices,
    correct_choice: getCorrectResponse,
    stimulus_duration: stimStimulusDuration, // 1000
    trial_duration: stimTrialDuration, // 1500
    timing_duration: 1500,
    response_ends_trial: false,
    SSD: function () {
      presentationData = jsPsych.data.get().last(1).values()[0];
      return getSSD(presentationData);
    },
    SS_duration: 500, // 500
    post_trial_gap: 500,
    on_finish: function (data) {
      presentationData = jsPsych.data.get().last(2).values()[0];
      appendStopData(data, presentationData);
    },
  };

  var testMemoryRecognition = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: getMemoryRecognitionStim,
    data: {
      trial_id: 'test_memory_recognition',
      exp_stage: 'test',
      trial_duration: 1500,
      stimulus_duration: 2000,
    },
    choices: letterChoices,
    correct_choice: getCorrectResponse,
    stimulus_duration: 1500,
    trial_duration: 2000,
    response_ends_trial: false,
    post_trial_gap: 0,
    on_finish: function (data) {
      appendMemoryTrialData(data);
    },
  };
  testTrials.push(
    fixationBlock,
    testMemoryPresentation,
    testStopTrial,
    testMemoryRecognition,
    ITIBlock
  );
}

var testCount = 0;
var testNode = {
  timeline: [feedbackBlock].concat(testTrials),
  loop_function: function (data) {
    currentTrial = 0;
    testCount += 1;

    // go trials
    var goLength = 0;
    var sumGoRT = 0;
    var numGoResponses = 0;
    var sumGoCorrect = 0;
    // stop trials
    var stopLength = 0;
    var numStopResponses = 0;
    // SSDs
    SSDs = [];

    // memory trails
    var recognitionLength = 0;
    var recognitionRT = 0;
    var recognitionCorrect = 0;
    var recognitionResponses = 0;

    for (i = 0; i < data.trials.length; i++) {
      if (
        data.trials[i].condition == 'go' ||
        data.trials[i].condition == 'stop'
      ) {
        SSDs.push(data.trials[i].SSD);
      }
      if (
        data.trials[i].condition == 'go' &&
        data.trials[i].block_num == getCurrBlockNum() - 1
      ) {
        goLength += 1;
        if (data.trials[i].rt != null) {
          numGoResponses += 1;
          sumGoRT += data.trials[i].rt;
          if (data.trials[i].response == data.trials[i].correct_response) {
            sumGoCorrect += 1;
          }
        }
      } else if (
        data.trials[i].condition == 'stop' &&
        data.trials[i].block_num == getCurrBlockNum() - 1
      ) {
        stopLength += 1;
        if (data.trials[i].rt != null) {
          numStopResponses += 1;
        }
      } else if (
        (data.trials[i].condition == 'in memory set' ||
          data.trials[i].condition == 'not in memory set') &&
        data.trials[i].block_num == getCurrBlockNum() - 1
      ) {
        recognitionLength += 1;
        if (data.trials[i].rt != null) {
          recognitionResponses += 1;
          recognitionRT += data.trials[i].rt;
          if (data.trials[i].response == data.trials[i].correct_response) {
            recognitionCorrect += 1;
          }
        }
      }
    }

    var avgGoRT = sumGoRT / numGoResponses;
    var missedGoResponses = (goLength - numGoResponses) / goLength;
    var aveShapeRespondCorrect = sumGoCorrect / goLength;
    var stopSignalRespond = numStopResponses / stopLength;
    var avgRecognitionRT = recognitionRT / recognitionResponses;
    var recognitionAccuracy = recognitionCorrect / recognitionLength;
    var missedLetterResponses =
      (recognitionLength - recognitionResponses) / recognitionLength;
    var SSD_0_percentage = SSDs.filter((x) => x == 0).length / SSDs.length;

    currentAttentionCheckData = attentionCheckData.shift();

    if (testCount == numTestBlocks) {
      feedbackText = `<div class=centerbox>
        <p class=block-text>Done with this task.</p>
        <p class=centerbox>Press <i>enter</i> to continue.</p>
        </div>`;

      return false;
    } else {
      feedbackText =
        '<div class = centerbox><p class = block-text>Please take this time to read your feedback! This screen will advance automatically in 1 minute.</p>';
      feedbackText += `<p class=block-text>You have completed ${testCount} out of ${numTestBlocks} blocks of trials.</p>`;

      if (aveShapeRespondCorrect <= accuracyThresh) {
        feedbackText += `
        <p class="block-text">Your shape accuracy is low. Remember:</p>
        ${phase2PromptTextList}`;
      }

      if (recognitionAccuracy <= accuracyThresh) {
        feedbackText += `
        <p class="block-text">Your letter memory accuracy is low. Remember:</p>
        ${phase1PromptTextList}`;
      }

      if (avgGoRT > rtThresh) {
        feedbackText += `
        <p class="block-text">You have been responding too slowly to the shapes.</p>
        ${speedReminder}`;
      }

      if (avgRecognitionRT > letterRtThresh) {
        feedbackText += `
        <p class="block-text">You have been responding too slowly to the letters.</p>
        ${speedReminder}`;
      }

      if (
        missedGoResponses > missedResponseThresh ||
        missedLetterResponses > missedResponseThresh
      ) {
        if (missedGoResponses > missedResponseThresh) {
          feedbackText += `
          <p class="block-text">You have missed a number of shape trials. Remember to respond to every shape as quickly and accurately as possible.</p>`;
        }
        if (missedLetterResponses > missedResponseThresh) {
          feedbackText += `
          <p class="block-text">You have missed a number of letter trials. Remember to respond to every letter as quickly and accurately as possible.</p>`;
        }
      }

      if (stopSignalRespond >= maxStopCorrect) {
        feedbackText += `
        <p class="block-text">You have not been stopping your response when stars are present.</p>
        <p class="block-text">Please try your best to stop your response if you see a star.</p>`;
      }

      if (stopSignalRespond <= minStopCorrect || SSD_0_percentage < 0.5) {
        feedbackText += `
        <p class="block-text">Please do not slow down and wait for the star to appear. Respond as quickly and accurately as possible when a star does not appear.</p>`;
      }

      feedbackText +=
        '<p class=block-text>Press <i>enter</i> to continue.</p>' + '</div>';

      stims = createTrialTypes(numTrialsPerBlock);
      return true;
    }
  },
  on_timeline_finish: function () {
    window.dataSync();
  },
};

var postTaskQuestion =
  'Do you have any comments, concerns, or issues pertaining to this task?';

var postTaskBlock = {
  type: jsPsychSurveyText,
  questions: [
    {
      prompt: `<h1 class=block-text>${postTaskQuestion}</h1>`,
      name: postTaskQuestion,
      required: false,
      rows: 20,
      columns: 80,
    },
  ],
  response_ends_trial: true,
  data: {
    trial_id: 'post_task_feedback',
  },
  on_finish: function (data) {
    data.question = postTaskQuestion;
    data.response = data.response[postTaskQuestion];
  },
};

var fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
};
var exitFullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
};

var expID = 'stop_signal_wm_task';

var endBlock = {
  type: jsPsychHtmlKeyboardResponse,
  data: {
    trial_id: 'end',
    exp_id: expID,
    trial_duration: 180000,
  },
  trial_duration: 180000,
  stimulus: endText,
  choices: ['Enter'],
  post_trial_gap: 0,
};

var stop_signal_wm_task_experiment = [];
var stop_signal_wm_task_init = () => {
  jsPsych.pluginAPI.preloadImages(images);
  stop_signal_wm_task_experiment.push(fullscreen);
  goStims = createGoTrialTypes(goPracticeLen);
  stop_signal_wm_task_experiment.push(goInstructionNode);
  stop_signal_wm_task_experiment.push(goPracticeNode);
  phase2Stims = createPhase2TrialTypes(phase2PracticeLen);
  stop_signal_wm_task_experiment.push(phase2InstructionNode);
  stop_signal_wm_task_experiment.push(phase2PracticeNode);
  phase1Stims = createPhase1TrialTypes(phase1PracticeLen);
  stop_signal_wm_task_experiment.push(phase1InstructionNode);
  stop_signal_wm_task_experiment.push(phase1PracticeNode);
  stims = createPracticeTrialTypes(practiceLen);
  stop_signal_wm_task_experiment.push(instructionNode);
  stop_signal_wm_task_experiment.push(practiceNode);
  stop_signal_wm_task_experiment.push(testNode);
  stop_signal_wm_task_experiment.push(postTaskBlock);
  stop_signal_wm_task_experiment.push(endBlock);
  stop_signal_wm_task_experiment.push(exitFullscreen);
};
