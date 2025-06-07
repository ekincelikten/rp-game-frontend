const socket = io('https://hortlakli-koy-demo-1.onrender.com');
let nickname = '';
let role = '';
let phase = '';

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

socket.on('phaseChange', newPhase => {
  phase = newPhase;
  const chat = document.getElementById('chatMessages');
  chat.innerHTML += `<p><em>Faz: ${newPhase}</em></p>`;
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
    img.src = "https://hortlakli-koy-demo-1.onrender.com" + p.avatar;
    img.title = p.nickname;
    img.onclick = () => {
      if (!p.isAlive) return;
      if (phase === 'day') {
        if (role === 'Gardiyan') {
          socket.emit('markJailTarget', p.nickname);
        } else {
          socket.emit('vote', p.nickname);
        }
      } else if (phase === 'night') {
        if (role === 'Dedektif') {
          socket.emit('investigate', p.nickname);
        } else if (role === 'Doktor') {
          socket.emit('protect', p.nickname);
        } else if (role === 'Gulyabani') {
          socket.emit('kill', p.nickname);
        } else if (role === 'İfrit') {
          socket.emit('silence', p.nickname);
        } else if (role === 'Gardiyan') {
          socket.emit('jail', p.nickname);
        }
      }
    };
    const label = document.createElement('div');
    label.innerText = p.nickname;
    wrapper.appendChild(img);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
});