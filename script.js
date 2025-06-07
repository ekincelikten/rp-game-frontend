const socket = io('https://hortlakli-koy-demo-1.onrender.com');
let nickname = '';
let role = '';

function joinGame() {
  nickname = document.getElementById('nickname').value;
  if (!nickname) return;
  socket.emit('joinGame', nickname);
  document.getElementById('lobby').style.display = 'none';
  document.getElementById('game').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('joinBtn').addEventListener('click', joinGame);
  document.getElementById('sendBtn').addEventListener('click', sendMessage);
});

function sendMessage() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (msg) {
    socket.emit('chatMessage', msg);
    input.value = '';
  }
}

socket.on('assignRole', data => {
  role = data.role;
  document.getElementById('roleInfo').innerText = `Rolünüz: ${role}`;
});

socket.on('chatMessage', msg => {
  const box = document.getElementById('chatMessages');
  box.innerHTML += `<p>${msg}</p>`;
  box.scrollTop = box.scrollHeight;
});

socket.on('updatePlayers', players => {
  const container = document.getElementById('players');
  container.innerHTML = '';
  players.forEach(p => {
    const wrapper = document.createElement('div');
    const img = document.createElement('img');
    img.src = p.avatar;
    img.title = p.nickname;
    const label = document.createElement('div');
    label.innerText = p.nickname;
    wrapper.appendChild(img);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
});

socket.on('updatePlayers', players => {
  const container = document.getElementById('players');
  container.innerHTML = '';
  players.forEach(p => {
    const div = document.createElement('div');
    div.innerHTML = `<img src="https://hortlakli-koy-demo-1.onrender.com${p.avatar}"><br>${p.nickname}`;
    container.appendChild(div);
  });
});