(function(window) {

  const bpm = 28;

  const songNotes = ["D","C","Ab","G","D","C","Ab","G","D","C","Ab","G","D","C","Ab","G","D","C","Ab","G","D","C","Ab","G"];

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


  function playOne (note, delay, i) {
    function play () {
      console.log("playing", note);
      tones.play(note);
      noteHolder.innerHTML = note;
      changeBackground();
    }

    setTimeout(play, delay * i);
  }

  function autoPlayAll (delay) {
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
