import { posts as defaultPosts } from './posts'
import { apiUrl } from '../config/env'

const STORAGE_KEY = 'porti-publications-posts'
const JSON_PATH = '/data/posts.json'

function clonePosts(posts) {
  return posts.map((post) => ({ ...post, images: [...post.images] }))
}

function parsePosts(raw) {
  const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
  if (!Array.isArray(parsed)) return null
  return clonePosts(parsed)
}

export async function loadPosts() {
  try {
    const response = await fetch(apiUrl('/api/posts'))
    if (response.ok) {
      const parsed = parsePosts(await response.json())
      if (parsed) return parsed
    }
  } catch (err) {
    console.error('Erro ao carregar do backend:', err)
  }

  // Fallback: se o backend falhar, carrega os default
  return clonePosts(defaultPosts)
}

export async function savePosts(posts) {
  try {
    await fetch(apiUrl('/api/posts/batch'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(posts)
    })
  } catch (err) {
    console.error('Erro ao salvar no backend:', err)
  }
}

export async function resetPosts() {
  const defaults = clonePosts(defaultPosts)
  await savePosts(defaults)
  return defaults
}

export function createPostId(title) {
  const slug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)

  const suffix = Date.now().toString(36)
  return slug ? `${slug}-${suffix}` : `post-${suffix}`
}

export function downloadPostsJson(posts) {
  const blob = new Blob([JSON.stringify(posts, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'posts.json'
  link.click()
  URL.revokeObjectURL(url)
}

export async function importPostsFromFile(file) {
  const text = await file.text()
  const parsed = parsePosts(text)
  if (!parsed) throw new Error('Arquivo JSON inválido ou vazio.')
  savePosts(parsed)
  return parsed
}
