const generateScaleBtn = document.getElementById('create-scale-btn');
const author = document.getElementById('scale-author-input')
const scaleName = document.getElementById('scale-name-input')
const startingFreq = document.getElementById('starting-frequency-input')
const numOfScaleDeg = document.getElementById('num-of-scale-degrees-input')



  const addScale = async function(e) {
    try {
        e.preventDefault();
        const newScaleData = {
            author: author.value,
            name: scaleName.value,
            startingFreq: startingFreq.value,
            numOfScaleDeg: numOfScaleDeg.value
        };

        await fetch("/api/scale"), {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newScaleData),
        };

        console.log('completed')

    } catch (error) {
             console.log(error) 
        };
  };

  generateScaleBtn.addEventListener('click', addScale )
