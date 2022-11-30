String.prototype.shuffle = function() {
  const letters = this.split(""),
    length = letters.length;
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters.join("");
};

function fullyShuffle(input) {
  return input.shuffle();
}

function preserveWords(input) {
  const words = input.split(' ');
  return words.map(fullyShuffle).join(' ');
}

function findShuffled(text, preserve) {
  if(preserve) {
    return preserveWords(text);
  } else {
    return fullyShuffle(text);
  }
}

function showNotification(node) {
  notification.classList.remove('hide');
  setTimeout(()=>notification.classList.add('hide'), 1500);
}

(function() {
  const form = document.querySelector('#shuffle-form');
  const resultText = document.querySelector('#shuffled-text');
  const notification = document.querySelector('#notification');
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const target = event.target.text.value.trim();
    const preserve = event.target.preserve.checked;
    const shuffledText = findShuffled(target, preserve);
    resultText.value = shuffledText;
  });
  
  resultText.addEventListener('click', function(event) {
    event.preventDefault();
    this.select();
    document.execCommand("copy");
    showNotification(notification);
  });
  
})();
