/**
 * Create one card from item data.
 */
function createCardElement(item) {
    return `
        <li class="card">
            <img src=${item.image} alt="">
            <div class="card-content">
            <h3 class="header">
            ${item.title}
                </h3>
                <p class="subheader">
                    ${item.subtitle}
                </p>
            </div>
        </li>
      `;
  }
  
  /**
   * Create multiple cards from array of item data.
   */
  function createCardElements(data) {
    return data.map(createCardElement).join("");
  }
  
  /**
   * Fetch list of pokemon names and urls.
   */
  async function fetch150PokemonList() {
    try {
      // Get a list of Pokemon numbered 0-150
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?offset=0&limit=150"
      );
      const data = await response.json();
      return data.results;
      //Error handling
    } catch (error) {
      console.log(error);
    }
  }
  console.log(fetch150PokemonList())
  
  /**
   * Fetch details of a pokemon.
   */
  async function fetchPokemonDetails(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json;
      //Error handling
    } catch (error) {
      console.log(error);
    }
  }
  
  /**
   * Fetch details of all 150 pokemon.
   */
  async function fetch150PokemonDetails() {
    const detailsList = [];
    for (let i = 0; i <= 493; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      const data = await fetchPokemonDetails(url);
      if (data) {
        detailsList.push(data);
      }
    }
  
    return detailsList;
  }
  
  /**
   * Option https://pokeapi.co/api/v2/pokemon/
   */
  function renderOption1Results(data) {
    const card = createCardElement({
      title: data.name,
      subtitle: data.types.map((type) => type.type.name).join(", "),
      image: data.sprites.other["official-artwork"].front_default,
    });
    document.getElementById("option-1-results").innerHTML = card;
  }
  
  /**
   * Option 2
   */
  async function renderOption2() {
    const myFavouritePokemon = ["gengar", "luxray", "gyarados", "arcanine", "ampharos", "breloom", "garchomp", "mismagius" ];
  
    const fetchPokemonData = async (pokemon) => {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      return await fetchPokemonDetails(url);
    };
  
    // Map the pokemon names to pokemon data.
    const pokemonData = await Promise.all(
      myFavouritePokemon.map(fetchPokemonData)
    );
  
    // Map the pokemon data to card data.
    const cardData = pokemonData.map((itemData) => {
      return {
        title: itemData.name,
        image: itemData.sprites.other["official-artwork"].front_default,
        subtitle: itemData.types.map((type) => type.type.name).join(", "),
      };
    });
  
    const cards = createCardElements(cardData);
    document.getElementById("option-2-results").innerHTML = cards;
  }
  
  renderOption2();