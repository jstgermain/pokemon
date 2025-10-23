import {
  getRandomPokemonIds,
  getPokemonImageUrl,
  formatPokemonName,
  getGenderDisplay,
  fetchPokemon,
  fetchPokemonSpecies,
} from "./pokemonApi";

describe("getRandomPokemonIds", () => {
  it("should return the correct number of unique IDs", () => {
    const count = 6;
    const ids = getRandomPokemonIds(count);

    expect(ids.length).toBe(count);
    expect(new Set(ids).size).toBe(count);
  });

  it("should return IDs within valid range", () => {
    const ids = getRandomPokemonIds(10);

    ids.forEach((id) => {
      expect(id).toBeGreaterThanOrEqual(1);
      expect(id).toBeLessThanOrEqual(898);
    });
  });

  it("should return different IDs on subsequent calls", () => {
    const ids1 = getRandomPokemonIds(6);
    const ids2 = getRandomPokemonIds(6);

    expect(ids1).not.toEqual(ids2);
  });
});

describe("getPokemonImageUrl", () => {
  it("should return correct image URL format", () => {
    const url = getPokemonImageUrl(25);

    expect(url).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
    );
  });

  it("should handle different Pokemon IDs", () => {
    expect(getPokemonImageUrl(1)).toContain("/1.png");
    expect(getPokemonImageUrl(150)).toContain("/150.png");
    expect(getPokemonImageUrl(898)).toContain("/898.png");
  });
});

describe("formatPokemonName", () => {
  it("should capitalize single word names", () => {
    expect(formatPokemonName("pikachu")).toBe("Pikachu");
    expect(formatPokemonName("bulbasaur")).toBe("Bulbasaur");
  });

  it("should handle hyphenated names", () => {
    expect(formatPokemonName("ho-oh")).toBe("Ho Oh");
    expect(formatPokemonName("porygon-z")).toBe("Porygon Z");
  });

  it("should capitalize each word in hyphenated names", () => {
    expect(formatPokemonName("tapu-koko")).toBe("Tapu Koko");
    expect(formatPokemonName("mr-mime")).toBe("Mr Mime");
  });
});

describe("getGenderDisplay", () => {
  it("should return 'Genderless' for gender rate -1", () => {
    expect(getGenderDisplay(-1)).toBe("Genderless");
  });

  it("should calculate 50/50 split for gender rate 4", () => {
    expect(getGenderDisplay(4)).toBe("Male: 50% / Female: 50%");
  });

  it("should calculate correct percentages for other rates", () => {
    expect(getGenderDisplay(0)).toBe("Male: 100% / Female: 0%");
    expect(getGenderDisplay(8)).toBe("Male: 0% / Female: 100%");
    expect(getGenderDisplay(2)).toBe("Male: 75% / Female: 25%");
    expect(getGenderDisplay(6)).toBe("Male: 25% / Female: 75%");
  });
});

describe("fetchPokemon", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch Pokemon data successfully", async () => {
    const mockPokemon = {
      id: 25,
      name: "pikachu",
      sprites: {
        front_default: "url",
        other: { "official-artwork": { front_default: "url" } },
      },
      types: [],
      abilities: [],
      height: 4,
      weight: 60,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemon,
    });

    const result = await fetchPokemon(25);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/25"
    );
    expect(result).toEqual(mockPokemon);
  });

  it("should throw error when fetch fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchPokemon(999)).rejects.toThrow(
      "Failed to fetch Pokemon with id 999"
    );
  });
});

describe("fetchPokemonSpecies", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch Pokemon species data successfully", async () => {
    const mockSpecies = {
      flavor_text_entries: [
        {
          flavor_text: "A test description",
          language: { name: "en" },
        },
      ],
      gender_rate: 4,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSpecies,
    });

    const result = await fetchPokemonSpecies(25);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon-species/25"
    );
    expect(result).toEqual(mockSpecies);
  });

  it("should throw error when fetch fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchPokemonSpecies(999)).rejects.toThrow(
      "Failed to fetch Pokemon species with id 999"
    );
  });
});
