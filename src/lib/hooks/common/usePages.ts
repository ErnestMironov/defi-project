import { useState } from 'react'

export const usePages = (initialPage = 1, initialSize = 10) => {
  const [page, setPage] = useState(initialPage)
  const [size, setSize] = useState(initialSize)

  const onPageChange = (pageNumber: number) => setPage(pageNumber)
  const onPageSizeChange = (pageSize: number) => {
    setSize(pageSize)
    setPage(1)
  }

  return { page, size, onPageChange, onPageSizeChange }
}
