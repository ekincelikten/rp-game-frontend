const socket = io("https://hortlakli-koy-demo-1.onrender.com");
let nickname = '';
let role = '';

function joinGame() {
  nickname = document.getElementById("nickname").value;
  if (nickname) {
    socket.emit("joinGame", nickname);
  }
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  if (input.value) {
    socket.emit("chatMessage", input.value);
    input.value = '';
  }
}

socket.on("assignRole", data => {
  role = data.role;
  document.getElementById("phase").innerText = `Rol: ${role}`;
});

socket.on("phaseChange", phase => {
  document.getElementById("phase").innerText = `Faz: ${phase === 'day' ? 'Gündüz' : 'Gece'} - Rol: ${role}`;
});

socket.on("updatePlayers", players => {
  const container = document.getElementById("players");
  container.innerHTML = '';
  players.forEach(p => {
    const div = document.createElement("div");
    div.innerHTML = `<img src="https://hortlakli-koy-demo-1.onrender.com${p.avatar}"><br>${p.nickname}`;
    container.appendChild(div);
  });
});

socket.on("chatMessage", msg => {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.innerText = msg;
  chat.appendChild(div);
});