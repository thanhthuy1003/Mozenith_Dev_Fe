import React, { useState, useCallback } from 'react'

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseApiResult<T> extends UseApiState<T> {
  execute: () => Promise<void>
  refetch: () => Promise<void>
}

/**
 * Custom hook for API calls with loading and error states
 */
export function useApi<T>(
  apiFunction: () => Promise<T>,
  autoExecute = false
): UseApiResult<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: autoExecute,
    error: null
  })

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null })
    try {
      const result = await apiFunction()
      setState({ data: result, loading: false, error: null })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setState({ data: null, loading: false, error: errorMessage })
    }
  }, [apiFunction])

  const refetch = useCallback(() => execute(), [execute])

  // Auto-execute on mount if enabled
  React.useEffect(() => {
    if (autoExecute) {
      execute()
    }
  }, [autoExecute, execute])

  return { ...state, execute, refetch }
}

/**
 * Hook for mutation API calls (POST, PUT, DELETE)
 */
export function useMutation<T, P>(
  mutationFn: (payload: P) => Promise<T>
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null
  })

  const mutate = useCallback(
    async (payload: P) => {
      setState({ data: null, loading: true, error: null })
      try {
        const result = await mutationFn(payload)
        setState({ data: result, loading: false, error: null })
        return result
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred'
        setState({ data: null, loading: false, error: errorMessage })
        throw err
      }
    },
    [mutationFn]
  )

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return { ...state, mutate, reset }
}
