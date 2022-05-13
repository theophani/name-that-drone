function playTone (note, octave) {
  tones.play(note, octave);
}

/* Special features */

// The “type” determines the shape of the sound wave.
// The available types are: "sine", "square", "sawtooth", "triangle"
tones.type = "sine";

// The “attack” determines how intensely the sound starts.
// Try other numbers to see how it smooths out the tone.
tones.attack = 1;

// The “release” determines how quickly the sound fades out.
// Try other numbers to see how it creates clipped or echoey sounds.
tones.release = 100;

// Takes an integer and returns a note in Hz.
// Integers 0 though 7 are the notes on the C Major scale.
function noteFromNumber (i) {
  const centerOctave = 4;
  const notes = ["c", "d", "e", "f", "g", "a", "b"];
  const notesPerOctave = notes.length;

  const j = i + (notesPerOctave * centerOctave);
  const octave = Math.floor(j / notesPerOctave);
  const note = notes[j % notesPerOctave];

  // Only octaves 0 through 9 are supported
  if (octave < 0 || octave > 9) {
    throw new Error("The number " + i + " is outside of the supported range of the noteFromNumber function");
  } else {
    return tones.map[octave][note];
  }
}

window.addEventListener("load", function () {
    let instructions = document.createElement("section");
    instructions.className = "instructions";
    instructions.innerHTML = "<p>Click, press spacebar,<br>or tap to begin</p>";

    function startDrone () {
      tones.init();

      if ('ontouchstart' in window) {
        tones.play("c");
      }

      document.body.removeChild(instructions);

      drone.start();
    }

    document.addEventListener("keydown", function (e) {
      if (e.code === "Space") {
        startDrone();
      }
    }, { once: true });

    instructions.onclick = startDrone;

    document.body.appendChild(instructions);
}, false);
