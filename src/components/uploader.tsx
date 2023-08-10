import { TFile, useFileStore } from '@/store/file'
import { Card, CardBody, Progress } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

function Item(props: { f: TFile }) {
  const ref = useRef<HTMLImageElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.src = URL.createObjectURL(props.f.file)
    }
    return () => {
      if (ref.current) {
        URL.revokeObjectURL(ref.current.src)
      }
    }
  }, [])
  return (
    <div
      className={clsx(
        {
          '!border-primary-500/60': props.f.focus,
        },
        'relative h-36 w-36 overflow-hidden rounded-xl border-2 border-slate-500/30 p-[0.5px]',
      )}
      onMouseOver={() => {
        useFileStore.getState().focus(props.f.id)
      }}
      onMouseOut={() => {
        useFileStore.getState().focus('')
      }}
    >
      <img ref={ref} className="h-full w-full rounded-xl object-cover" />
      <Progress
        size="sm"
        aria-label="Uploading..."
        value={props.f.progress}
        className="absolute bottom-0"
      />
    </div>
  )
}

export function Uploader() {
  const [drag, setDrag] = useState(false)
  const [files] = useFileStore((state) => [state.files])
  function handleAddFiles(files: FileList | File[]) {
    for (const file of files) {
      if (file.type.includes('image')) {
        useFileStore.getState().add(file)
      }
    }
  }
  function pasteListener(e: ClipboardEvent) {
    const files = e.clipboardData?.files
    files && handleAddFiles(files)
  }
  useEffect(() => {
    document.addEventListener('paste', pasteListener)
    return () => {
      document.removeEventListener('paste', pasteListener)
    }
  })
  return (
    <Card
      className={clsx({
        'bg-primary-500/20': drag,
      })}
    >
      <CardBody>
        <input
          type="file"
          multiple
          className="hidden"
          id="upload-input"
          onChange={(e) => {
            const { files } = e.target
            handleAddFiles(files ?? [])
            e.target.value = ''
          }}
        />
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDrag(true)
          }}
          onDragLeave={() => {
            setDrag(false)
          }}
          onDrop={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setDrag(false)
            const { files } = e.dataTransfer
            handleAddFiles(files)
          }}
          className="flex flex-wrap gap-2"
        >
          {files.map((f) => (
            <Item f={f} key={f.id} />
          ))}
          <div
            className="flex h-36 w-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-slate-500/20 p-2 hover:border-primary-500/60"
            onClick={(e) => {
              e.preventDefault()
              const input = document.getElementById('upload-input')
              if (input) {
                input.click()
              }
            }}
          >
            <p>粘贴/拖拽/点击</p>
            {/* <p>或通过URL上传</p> */}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
