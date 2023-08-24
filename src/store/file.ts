import { create } from 'zustand'
import { nanoid } from 'nanoid'
import { toast } from 'react-hot-toast'
import { upload } from '@/utils/upload'
import { useApiStore } from './api'
import { createAsyncPool } from '@/utils/async-pool'

export type TFileStatus = 'prepare' | 'uploading' | 'uploaded' | 'error'
export type TFile = {
  file: File
  focus: boolean
  url: string
  status: TFileStatus
  progress: number
  id: string
  err?: string
}
const pool = createAsyncPool(5)
export const useFileStore = create<{
  files: TFile[]
  add: (file: File) => void
  retry: (id: string) => void
  del: (id: string) => void
  clear: () => void
  edit: (f: TFile) => void
  focus: (id: string) => void
}>((set, get) => ({
  files: [],
  add(file) {
    const id = nanoid()
    set((state) => ({
      files: [
        ...state.files,
        {
          file,
          focus: false,
          url: '',
          status: 'prepare',
          progress: 0,
          id: id,
        },
      ],
    }))
    pool(async () => {
      get().edit({
        ...get().files.find((f) => f.id === id)!,
        status: 'uploading',
      })
      const res = await upload(useApiStore.getState().getApi(), file, (p) => {
        get().edit({
          ...get().files.find((f) => f.id === id)!,
          progress: p,
        })
      })
      get().edit({
        ...get().files.find((f) => f.id === id)!,
        url: res.url,
        status: res.err ? 'error' : 'uploaded',
        err: res.err,
      })
      res.err && toast.error(res.err)
    })
  },
  retry(id) {
    const file = get().files.find((f) => f.id === id)
    if (!file) {
      return
    }
    get().edit({
      ...file,
      status: 'prepare',
    })
    pool(async () => {
      get().edit({
        ...get().files.find((f) => f.id === id)!,
        status: 'uploading',
      })
      const res = await upload(
        useApiStore.getState().getApi(),
        file.file,
        (p) => {
          get().edit({
            ...get().files.find((f) => f.id === id)!,
            progress: p,
          })
        },
      )
      get().edit({
        ...get().files.find((f) => f.id === id)!,
        url: res.url,
        status: res.err ? 'error' : 'uploaded',
        err: res.err,
      })
      res.err && toast.error(res.err)
    })
  },
  del(id) {
    set((state) => ({
      files: state.files.filter((f) => f.id !== id),
    }))
  },
  clear() {
    set({ files: [] })
  },
  edit(f) {
    set((state) => ({
      files: state.files.map((item) => {
        if (item.id === f.id) {
          return f
        }
        return item
      }),
    }))
  },
  focus(id) {
    set((state) => ({
      files: state.files.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            focus: true,
          }
        }
        return {
          ...item,
          focus: false,
        }
      }),
    }))
  },
}))
