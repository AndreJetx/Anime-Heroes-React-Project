import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Character {
  _id: string;
  name: string;
  power: string;
  imageUrl: string;
}

interface CharacterState {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: CharacterState = {
  characters: [],
  loading: false,
  error: null,
};

// Thunk para buscar os personagens da API
export const fetchCharacters = createAsyncThunk("characters/fetch", async () => {
  const response = await fetch("/api/characters");
  return (await response.json()) as Character[];
});

const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<Character>) => {
      state.characters.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao buscar personagens";
      });
  },
});

export const { addCharacter } = characterSlice.actions;
export default characterSlice.reducer;
