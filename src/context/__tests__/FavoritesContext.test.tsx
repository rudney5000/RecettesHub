import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { FavoritesProvider, useFavorites } from '../FavoritesContext'
import type { ReactNode } from 'react'
import {mockMeal, mockMeal2} from "../../test/mock.ts";

const wrapper = ({ children }: { children: ReactNode }) => (
    <FavoritesProvider>{children}</FavoritesProvider>
)

describe('FavoritesContext', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('starts with empty favorites', () => {
        const { result } = renderHook(() => useFavorites(), { wrapper })
        expect(result.current.favorites).toEqual([])
        expect(result.current.favoritesCount).toBe(0)
    })

    it('adds a favorite', () => {
        const { result } = renderHook(() => useFavorites(), { wrapper })

        act(() => {
            result.current.addFavorite(mockMeal)
        })

        expect(result.current.favorites).toHaveLength(1)
        expect(result.current.favoritesCount).toBe(1)
        expect(result.current.isFavorite(mockMeal.idMeal)).toBe(true)
    })

    it('removes a favorite', () => {
        const { result } = renderHook(() => useFavorites(), { wrapper })

        act(() => {
            result.current.addFavorite(mockMeal)
        })
        act(() => {
            result.current.removeFavorite(mockMeal.idMeal)
        })

        expect(result.current.favorites).toHaveLength(0)
        expect(result.current.isFavorite(mockMeal.idMeal)).toBe(false)
    })

    it('toggles favorite on and off', () => {
        const { result } = renderHook(() => useFavorites(), { wrapper })

        act(() => {
            result.current.toggleFavorite(mockMeal)
        })
        expect(result.current.isFavorite(mockMeal.idMeal)).toBe(true)

        act(() => {
            result.current.toggleFavorite(mockMeal)
        })
        expect(result.current.isFavorite(mockMeal.idMeal)).toBe(false)
    })

    it('manages multiple favorites', () => {
        const { result } = renderHook(() => useFavorites(), { wrapper })

        act(() => {
            result.current.addFavorite(mockMeal)
        })
        act(() => {
            result.current.addFavorite(mockMeal2)
        })

        expect(result.current.favoritesCount).toBe(2)
        expect(result.current.isFavorite(mockMeal.idMeal)).toBe(true)
        expect(result.current.isFavorite(mockMeal2.idMeal)).toBe(true)

        act(() => {
            result.current.removeFavorite(mockMeal.idMeal)
        })

        expect(result.current.favoritesCount).toBe(1)
        expect(result.current.isFavorite(mockMeal.idMeal)).toBe(false)
        expect(result.current.isFavorite(mockMeal2.idMeal)).toBe(true)
    })

    it('throws when used outside provider', () => {
        expect(() => {
            renderHook(() => useFavorites())
        }).toThrow('useFavorites must be used within a FavoritesProvider')
    })
})
