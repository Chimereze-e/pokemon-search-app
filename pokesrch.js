document.getElementById('searchButton').addEventListener('click', searchPokemon);

async function searchPokemon() {
  const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
  const resultDiv = document.getElementById('result');

  if (!searchInput) {
    resultDiv.innerHTML = '<p>Please enter a Pokémon name or ID.</p>';
    return;
  }

  try {
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`);
    if (!response.ok) {
      throw new Error('Pokémon not found');
    }
    const data = await response.json();

    resultDiv.innerHTML = `
      <div class="pokemon-card">
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p><strong>ID:</strong> ${data.id}</p>
        <p><strong>Type:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
        <p><strong>Height:</strong> ${data.height / 10}m</p>
        <p><strong>Weight:</strong> ${data.weight / 10}kg</p>
      </div>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p>${error.message}</p>`;
  }
}