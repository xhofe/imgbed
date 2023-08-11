import { Api } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const apis: Array<Api> = []
const apiModules = import.meta.glob('@/apis/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, Api | Array<Api>>
for (const path in apiModules) {
  const api = apiModules[path]
  if (api instanceof Array) {
    for (const item of api) {
      !item.disabled && apis.push(item)
    }
  } else {
    !api.disabled && apis.push(api)
  }
}

export const useApiStore = create(
  persist<{
    current: string
    setCurrent: (api: string) => void
    getApi: () => Api
  }>(
    (set, get) => ({
      setCurrent(api) {
        set({ current: api })
      },
      current: apis[0].name,
      getApi() {
        return apis.find((api) => api.name === get().current)!
      },
    }),
    {
      name: 'api',
    },
  ),
)

if (!useApiStore.getState().getApi()) {
  useApiStore.getState().setCurrent(apis[0].name)
}
