import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Coctail } from '../models/coctail';
import httpClient from '../servises/httpClient';

type CocktailsResponse = {drinks: Coctail[]};

const fetchCoctailsAPI = async (coctailName: string): Promise<CocktailsResponse> => {
  const response = await httpClient.get<CocktailsResponse>(`/1/search.php?s=${coctailName}`);
  
  return response.data;
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
