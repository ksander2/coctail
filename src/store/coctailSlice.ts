import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Coctail } from '../models/coctail';


const fetchCoctailsAPI = async (coctailName: string): Promise<{drinks: Coctail[]}> => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${coctailName}`);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};

export const fetchCoctails = createAsyncThunk(
  'coctails/fetchAll',
  async (coctailName: string, { rejectWithValue }) => {
    try {
      return await fetchCoctailsAPI(coctailName);
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

type CoctailState = {
  data: Coctail[];
  loading: boolean;
  error: string | null;
};

const initialState: CoctailState = {
  data: [],
  loading: false,
  error: null,
};

const coctailSlice = createSlice({
  name: 'coctails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoctails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoctails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.drinks;
      })
      .addCase(fetchCoctails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default coctailSlice.reducer;
