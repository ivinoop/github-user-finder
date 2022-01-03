let userAvatar = document.querySelector('.user');
let userURL = document.querySelector('.user-url')
let githubName = document.querySelector('h2');
let username = document.querySelector('a');
let followers = document.querySelector('.followers');
let following = document.querySelector('.following');
let input = document.querySelector('input');
let catButton = document.querySelector('button');
let catImg = document.querySelector('.cat-img');

function fetch(url, successHandler) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => successHandler(JSON.parse(xhr.response));

  xhr.onerror = function() {
    console.error('Something went wrong 🙁');
  };
  xhr.send();
}


// GitHub User Finder 

function displayFollowers(username) {
  followers.innerHTML = "";
  fetch(`https://api.github.com/users/${username}/followers`, function(followersList){
    let topFive = followersList.slice(0,5);
    topFive.forEach(info => {
      let li = document.createElement('li');
      let img = document.createElement('img');
      img.src = info.avatar_url;
      img.href = info.html_url;
      li.append(img);
      followers.append(li); 
    })
  });
}

function displayFollowing(username) {
  following.innerHTML = "";
  fetch(`https://api.github.com/users/${username}/following`, function(followersList){
    let topFive = followersList.slice(0,5);
    topFive.forEach(info => {
      let li = document.createElement('li');
      let img = document.createElement('img');
      img.src = info.avatar_url;
      img.href = info.html_url;
      li.append(img);
      following.append(li); 
    })
  });
}

function createUI(data) {
  userAvatar.src = data.avatar_url;
  githubName.innerText = data.name;
  username.innerText = `@${data.login}`;
  userURL.href = data.html_url;
  displayFollowers(data.login);
  displayFollowing(data.login);
}

function handleEnter(event) {
  if(event.keyCode === 13 && input.value) {
    let user = event.target.value;
    const url = `https://api.github.com/users/${user}`;
    fetch(url, createUI);
    input.value = "";
  }
}

input.addEventListener('keyup', handleEnter);

// Get New Cat

catButton.addEventListener('click', () => {
  let cat = new XMLHttpRequest();
  cat.open('GET', 'https://api.thecatapi.com/v1/images/search?limit=1&size=full');

  cat.onload = function() {
    let catData = JSON.parse(cat.response);
    catImg.src = catData[0].url;
  }
  cat.send();
});