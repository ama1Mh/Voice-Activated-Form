/*******************************************/
/*******************************************/
/********* recording and display ***********/
/*******************************************/
/*******************************************/
const display = document.querySelector('.display')
const controllerWrapper = document.querySelector('.controllers')

const State = ['Initial', 'Record', 'Download']
let stateIndex = 0
let mediaRecorder, chunks = [], audioURL = ''
//for trascribe 
let transcribedText = '';


// mediaRecorder setup for audio
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
    console.log('mediaDevices supported..')
    navigator.mediaDevices.getUserMedia({
    audio: true
    }).then(stream => {
    mediaRecorder = new MediaRecorder(stream)
    mediaRecorder.ondataavailable = (e) => {
    chunks.push(e.data)
    }
    mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, {'type': 'audio/ogg; codecs=opus'})
    chunks = []
    audioURL = window.URL.createObjectURL(blob)
    document.querySelector('audio').src = audioURL
    }
    }).catch(error => { console.log('Following error has occured : ',error) })
}else{
    stateIndex = ''
    application(stateIndex)
}
const clearDisplay = () => { display.textContent = '' }
const clearControls = () => { controllerWrapper.textContent = '' }
const record = () => {
    stateIndex = 1
    mediaRecorder.start()
    recognition.start();
    application(stateIndex)
}
const stopRecording = () => {
    stateIndex = 2
    mediaRecorder.stop()
    //calling transcribeAndFillForm() function
    transcribeAndFillForm();
    application(stateIndex)
}
//set 1 minute limit for recording
setTimeout(() => { stopRecording();  }, 60000);

//to diwnload the audio
const downloadAudio = () => {
    const downloadLink = document.createElement('a')
    downloadLink.href = audioURL
    downloadLink.setAttribute('download', 'audio')
    downloadLink.click()
}

//to add a button 
const addButton = (id, funString, text) => {
    const btn = document.createElement('button')
    btn.id = id
    btn.setAttribute('onclick', funString)
    btn.textContent = text
    controllerWrapper.append(btn)
}
//to diplay the text (reacording..)
const addMessage = (text) => {
    const msg = document.createElement('p')
    msg.textContent = text
    display.append(msg)
}
// the audio
const addAudio = () => {
    const audio = document.createElement('audio')
    audio.controls = true
    audio.src = audioURL
    display.append(audio)
}
// in the start
const application = (index) => {
    switch (State[index]) {
    case 'Initial':
        clearDisplay()
        clearControls()
        addButton('record', 'record()', 'speak')
        break;
    case 'Record':
        clearDisplay()
        clearControls()
        addMessage('Recording...')
        addButton('stop', 'stopRecording()', 'Stop Recording')
        break;
    case 'Download':
        clearControls()
        clearDisplay()
        addAudio()
        addButton('record', 'record()', 'speak Again')
        break;
    default:
        clearControls()
        clearDisplay()
        addMessage('Your browser does not support mediaDevices')
        break;
    }
}
application(stateIndex)

/*******************************************/
/*******************************************/
/*********      recognition      ***********/
/*******************************************/
/*******************************************/
const outputDiv = document.getElementById('output');
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.continuous = true;

recognition.onresult = event => {
    const result = event.results[event.results.length - 1][0].transcript;
    outputDiv.textContent = result;
    transcribedText = result;
};

recognition.onerror = event => {
 console.error('Speech recognition error:', event.error);
};

recognition.onnomatch = () => {
 console.log('No speech was recognized.');
};
/*******************************************/
/*******************************************/
/*********      transcribetion   ***********/
/*******************************************/
/*******************************************/
const transcribeAndFillForm = () => {
    const values = transcribedText.split('next');

    const nameInput = document.getElementById('name');
    const cityInput = document.getElementById('city');
    const emailInput = document.getElementById('email');
    const ageInput = document.getElementById('age');

    if (nameInput && values[0]) {
        nameInput.value = values[0].trim();
    }

    if (cityInput && values[1]) {
        cityInput.value = values[1].trim();
    }

    if (emailInput && values[2]) {
        emailInput.value = values[2].trim();
    }

    if (ageInput && values[3]) {
        ageInput.value = values[3].trim();
    }
};