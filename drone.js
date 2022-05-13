(function(window) {

  const bpm = 28;

  function randomSong () {

    const catalogue = [
      // https://noobnotes.net/nevergonnagiverickastley/
      ["A","B",["D",5],"B",["F#",5],["F#",5],["E",5],
      "A","B",["D",5],"B",["E",5],["E",5],["D",5],["C#",5],"B",
      "A","B",["D",5],"B",["D",5],["E",5],["C#",5],"A","A",["E",5],["D",5]],

      // https://noobnotes.net/myheartwillgooncelinedion/
      ["G", "A", "D", ["D",5], ["C",5], "B", "A",
      "B", ["C",5], "B", "A", "G", "F#", "G", "G", "D",
      "G", "A", "D", ["D",5], ["C",5], "B", "A",
      "B", ["C",5], "B", "A", "G", "F#", "G",
      "G", "F#", "G", "A", "B", "A", "G"],

      ["D","C","Ab","G","D","C","Ab","G","D","C","Ab","G","D","C","Ab","G","D","C","Ab","G","D","C","Ab","G"]
    ];

    return catalogue[Math.floor(Math.random() * catalogue.length)];
  }

  let noteHolder = document.createElement("section");
  noteHolder.className = "note";
  document.body.appendChild(noteHolder);

  function changeBackground () {
    const backgrounds = [
      "sky",
      "sea",
      "bubble-gum",
      "fireball",
      "sunset",
      "cool-mint",
      "fuji",
      "rainbow",
      "sideways-rainbow"
    ];

    let i = Math.floor(Math.random() * backgrounds.length);

    while (document.body.className === backgrounds[i]) {
      i = Math.floor(Math.random() * backgrounds.length);
    }

    document.body.className = backgrounds[i];
  }


  function playOne (no, delay, i) {
    function play () {
      console.log("playing", no);

      const note = (Array.isArray(no) ? no[0] : no);
      const octave = (Array.isArray(no) ? no[1] : 4);

      tones.play(note, octave);
      noteHolder.innerHTML = note;
      changeBackground();
    }

    setTimeout(play, delay * i);
  }

  function autoPlayAll (delay) {
    const songNotes = randomSong();

    function playAll () {
      for (let i = 0; i < songNotes.length; i++) {
        playOne(songNotes[i], delay, i);
      }
    }

    playAll();
    setInterval(playAll, delay * songNotes.length + delay * 4);
  }

  function clearAllTimeouts () {
    const nextTimeout = setTimeout(function(){}, 0);
    for (let i = 1; i <= nextTimeout; i++) {
      clearTimeout(i);
    }
  }

  function stopPlayback () {
    clearAllTimeouts();
    noteHolder.innerHTML = "";
    console.log("stopped playback")
  }

  const drone = {
    start: function () {
      autoPlayAll(60 * 1000 / bpm);

      document.addEventListener("keydown", function (e) {
        if (e.code === "Space") {
          autoPlayAll(60 * 1000 / bpm);
        }

        if (e.code === "Escape") {
          stopPlayback();
        }
      });

      console.log("drone started");
    }
  };

  window.drone = drone;

}(window));
