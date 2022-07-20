import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import animeApi from "../../apis/animeApi"
const initialState = {
  loading: false,
  error: false,
  data: [],
  hasNext: false,
  page: 1,
  limit: 16,
  sort: "desc",
  order_by: "favorites"
}
export const fetchCharacter = createAsyncThunk("character", async (params) => {
  const data = await animeApi.getCharacters(params)
  return data
})

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacter.pending, (state) => {
        if (state.page !== 1) {
          state.loading = false
        } else {
          state.loading = true
        }
        state.error = false
      })
      .addCase(fetchCharacter.fulfilled, (state, action) => {
        state.data.push(...action.payload.data)
        ++state.page
        state.hasNext = action.payload.pagination.has_next_page
        state.loading = false
        state.error = false
      })
      .addCase(fetchCharacter.rejected, (state, action) => {
        state.error = action.error
        state.loading = false
      })
  }
})

export default characterSlice
