/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { describe, expect, test } from 'vitest'

import {
  convertDetectedLanguage,
  normalizeInterfaceLanguage,
} from './languages'

describe('convertDetectedLanguage', () => {
  test('maps browser BCP-47 Chinese tags onto interface codes', () => {
    expect(convertDetectedLanguage('zh-TW')).toBe('zhTW')
    expect(convertDetectedLanguage('zh-HK')).toBe('zhTW')
    expect(convertDetectedLanguage('zh-MO')).toBe('zhTW')
    expect(convertDetectedLanguage('zh-Hant-TW')).toBe('zhTW')
    expect(convertDetectedLanguage('zh')).toBe('zhCN')
    expect(convertDetectedLanguage('zh-CN')).toBe('zhCN')
    expect(convertDetectedLanguage('zh-Hans')).toBe('zhCN')
  })

  test('keeps already-normalized interface codes stable (localStorage round-trip)', () => {
    // i18next caches `zhTW`/`zhCN` (the supportedLngs codes) to localStorage,
    // and the detector runs this converter on the cached value at every page
    // load — if `zhTW` does not survive the round-trip, a user who picked
    // Traditional Chinese is flipped to Simplified on the next load and the
    // cache is overwritten, making the flip permanent.
    expect(convertDetectedLanguage('zhTW')).toBe('zhTW')
    expect(convertDetectedLanguage('zhCN')).toBe('zhCN')
  })

  test('passes non-Chinese values through unchanged', () => {
    expect(convertDetectedLanguage('en')).toBe('en')
    expect(convertDetectedLanguage('fr-FR')).toBe('fr-FR')
    expect(convertDetectedLanguage('ja')).toBe('ja')
    expect(convertDetectedLanguage('es-MX')).toBe('es-MX')
    expect(convertDetectedLanguage('pt-BR')).toBe('pt-BR')
    expect(convertDetectedLanguage('ko-KR')).toBe('ko-KR')
  })
})

describe('normalizeInterfaceLanguage', () => {
  test('keeps supported interface codes', () => {
    for (const code of ['en', 'zhCN', 'zhTW', 'fr', 'ru', 'ja', 'vi']) {
      expect(normalizeInterfaceLanguage(code)).toBe(code)
    }
  })

  test('maps Spanish, Portuguese and Korean regional tags onto base codes', () => {
    expect(normalizeInterfaceLanguage('es')).toBe('es')
    expect(normalizeInterfaceLanguage('es-MX')).toBe('es')
    expect(normalizeInterfaceLanguage('pt')).toBe('pt')
    expect(normalizeInterfaceLanguage('pt-BR')).toBe('pt')
    expect(normalizeInterfaceLanguage('pt_PT')).toBe('pt')
    expect(normalizeInterfaceLanguage('ko')).toBe('ko')
    expect(normalizeInterfaceLanguage('ko-KR')).toBe('ko')
  })

  test('falls back to en for unknown values', () => {
    expect(normalizeInterfaceLanguage('de')).toBe('en')
    expect(normalizeInterfaceLanguage('')).toBe('en')
    expect(normalizeInterfaceLanguage(null)).toBe('en')
  })
})
