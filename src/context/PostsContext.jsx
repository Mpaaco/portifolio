import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  createPostId,
  downloadPostsJson,
  importPostsFromFile,
  loadPosts,
  resetPosts as resetStoredPosts,
  savePosts,
} from '../data/postsStorage'

const PostsContext = createContext(null)

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    loadPosts().then((loadedPosts) => {
      if (isMounted) {
        setPosts(loadedPosts)
        setIsLoading(false)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  const persist = useCallback((nextPosts) => {
    setPosts(nextPosts)
    savePosts(nextPosts)
  }, [])

  const addPost = useCallback(
    (postData) => {
      const newPost = {
        ...postData,
        id: createPostId(postData.title),
      }
      persist([newPost, ...posts])
      return newPost
    },
    [persist, posts]
  )

  const updatePost = useCallback(
    (id, postData) => {
      persist(
        posts.map((post) => (post.id === id ? { ...post, ...postData, id } : post))
      )
    },
    [persist, posts]
  )

  const removePost = useCallback(
    (id) => {
      persist(posts.filter((post) => post.id !== id))
    },
    [persist, posts]
  )

  const movePost = useCallback(
    (id, direction) => {
      const index = posts.findIndex((post) => post.id === id)
      if (index === -1) return

      const targetIndex = direction === 'up' ? index - 1 : index + 1
      if (targetIndex < 0 || targetIndex >= posts.length) return

      const nextPosts = [...posts]
      ;[nextPosts[index], nextPosts[targetIndex]] = [nextPosts[targetIndex], nextPosts[index]]
      persist(nextPosts)
    },
    [persist, posts]
  )

  const toggleFeatured = useCallback(
    (id) => {
      persist(
        posts.map((post) =>
          post.id === id ? { ...post, featured: !post.featured } : post
        )
      )
    },
    [persist, posts]
  )

  const resetPosts = useCallback(async () => {
    const defaults = await resetStoredPosts()
    setPosts(defaults)
    return defaults
  }, [])

  const exportPosts = useCallback(() => {
    downloadPostsJson(posts)
  }, [posts])

  const importPosts = useCallback(async (file) => {
    const imported = await importPostsFromFile(file)
    setPosts(imported)
    return imported
  }, [])

  const featuredPosts = useMemo(
    () => posts.filter((post) => post.featured),
    [posts]
  )

  const value = useMemo(
    () => ({
      posts,
      featuredPosts,
      isLoading,
      addPost,
      updatePost,
      removePost,
      movePost,
      toggleFeatured,
      resetPosts,
      exportPosts,
      importPosts,
    }),
    [
      posts,
      featuredPosts,
      isLoading,
      addPost,
      updatePost,
      removePost,
      movePost,
      toggleFeatured,
      resetPosts,
      exportPosts,
      importPosts,
    ]
  )

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
}

export function usePosts() {
  const context = useContext(PostsContext)
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider')
  }
  return context
}
