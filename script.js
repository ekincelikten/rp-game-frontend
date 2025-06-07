const socket = io('https://hortlakli-koy-demo-1.onrender.com');
let nickname = '';

function joinGame() {
  nickname = document.getElementById('nickname').value;
  if (!nickname) {
    alert("Lütfen bir takma ad girin.");
    return;
  }
  socket.emit('joinGame', nickname);
  document.getElementById('lobby').style.display = 'none';
  document.getElementById('game').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('joinBtn').addEventListener('click', joinGame);
});

socket.on('assignRole', data => {
  document.getElementById('roleInfo').innerText = `Rolünüz: ${data.role}`;
});

socket.on('phaseChange', phase => {
  const chat = document.getElementById('chat');
  chat.innerHTML += `<p><em>Faz: ${phase}</em></p>`;
});

socket.on('updatePlayers', players => {
  const container = document.getElementById('players');
  container.innerHTML = '';
  players.forEach(p => {
    const wrapper = document.createElement('div');
    const img = document.createElement('img');
    img.src = p.avatar;
    img.title = p.nickname;
    img.onclick = () => alert(`${p.nickname} seçildi (görev tıklaması)`); // placeholder
    const label = document.createElement('div');
    label.innerText = p.nickname;
    wrapper.appendChild(img);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
});