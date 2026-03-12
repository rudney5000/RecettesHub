import { describe, it, expect, vi, beforeEach } from 'vitest'
import { searchMeals, getMealById, getCategories, getAreas } from '../api'
import {mockAreas, mockCategories, mockMeal} from "../../test/mock.ts";

const mockFetch = vi.fn()
// global.fetch = mockFetch

describe('API Service', () => {
    beforeEach(() => {
        mockFetch.mockReset()
    })

    describe('searchMeals', () => {
        it('returns meals for a valid query', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({ meals: [mockMeal] }),
            })

            const result = await searchMeals('chicken')
            expect(result).toEqual([mockMeal])
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('search.php?s=chicken')
            )
        })

        it('returns empty array when no results', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({ meals: null }),
            })

            const result = await searchMeals('nonexistent')
            expect(result).toEqual([])
        })

        it('throws on HTTP error', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
            })

            await expect(searchMeals('error')).rejects.toThrow('HTTP error')
        })
    })

    describe('getMealById', () => {
        it('returns a meal for a valid id', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({ meals: [mockMeal] }),
            })

            const result = await getMealById('52772')
            expect(result).toEqual(mockMeal)
        })

        it('returns null when not found', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({ meals: null }),
            })

            const result = await getMealById('99999')
            expect(result).toBeNull()
        })
    })

    describe('getCategories', () => {
        it('returns categories', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({ categories: mockCategories }),
            })

            const result = await getCategories()
            expect(result).toEqual(mockCategories)
            expect(result).toHaveLength(3)
        })
    })

    describe('getAreas', () => {
        it('returns areas', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({ meals: mockAreas }),
            })

            const result = await getAreas()
            expect(result).toEqual(mockAreas)
            expect(result).toHaveLength(3)
        })
    })
})
