import Scale from "../classes/Scale";
const generateScaleBtn = document.getElementById('create-scale-btn');
const author = document.getElementById('scale-author-input')
const scaleName = document.getElementById('scale-name-input')
const startingFreq = document.getElementById('starting-frequency-input')
const numOfScaleDeg = document.getElementById('num-of-scale-degrees-input')

  const createScale = async function () {
    await fetch(`http://localhost:8080/api/scale`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({

        author: author.value,
        name: scaleName.value,
        startingFreq: startingFreq.value,
        numOfScaleDeg: numOfScaleDeg.value

        })
      }).then(resp => resp.json());

  }

  generateScaleBtn.addEventListener('click', createScale )
