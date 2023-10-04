const githubForm = document.getElementById('github-form');
const searchInput = document.getElementById('search');
const userList = document.getElementById('user-list');
const reposList = document.getElementById('repos-list');

githubForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();

  if (searchTerm) {
    try {
      const users = await searchUsers(searchTerm);
      displayUsers(users)
    };

    searchInput.value = '';
  }
});

async function searchUsers(username) {
  const searchUrl = "https://api.github.com/search/users?q=${username}";
  
  try {
    const response = await fetch(searchUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    const data = await response.json();
    return data.items;
  };
}

function displayUsers(users) {
  userList.innerHTML = '';

  users.forEach(user => {
    const userItem = document.createElement('li');
    userItem.innerHTML = `
      <img src="${user.avatar_url}" alt="${user.login}" width="50">
      <a href="${user.html_url}" target="_blank">${user.login}</a>
      <button onclick="getUserRepos('${user.login}')">Show Repositories</button>
    `;
    userList.appendChild(userItem);
  });
}

async function getUserRepos(username) {
  const repoUrl = "https://api.github.com/users/${username}/repos";

  try {
    const response = await fetch(repoUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
  });
}}
  
function displayRepos(repos) {
  reposList.innerHTML = '';

  if (repos.length === 0) {
    reposList.textContent = 'No repositories found.';
    return;
  }

  const reposHeading = document.createElement('li');
  reposHeading.textContent = 'Repositories:';
  reposList.appendChild(reposHeading);

  repos.forEach(repo => {
    const repoItem = document.createElement('li');
    repoItem.innerHTML = <a href="${repo.html_url}" target="_blank">${repo.name}</a>;
    reposList.appendChild(repoItem);
 })}
