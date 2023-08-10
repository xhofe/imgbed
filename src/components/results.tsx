import { TFile, useFileStore } from '@/store/file'
import { Card, CardBody, Code, Snippet } from '@nextui-org/react'
import clsx from 'clsx'

function Result(props: { f: TFile }) {
  const { f } = props
  let c
  switch (f.status) {
    case 'error': {
      c = <Code color="danger">{f.err}</Code>
      break
    }
    case 'prepare': {
      c = <Code color="warning">等待上传中...</Code>
      break
    }
    case 'uploading': {
      c = <Code color="primary">上传中...</Code>
      break
    }
    case 'uploaded': {
      c = <Snippet symbol>{f.url}</Snippet>
    }
  }
  return (
    <div
      onMouseOver={() => {
        useFileStore.getState().focus(f.id)
      }}
      onMouseOut={() => {
        useFileStore.getState().focus('')
      }}
      className={clsx({
        'border-primary-500/60': props.f.focus,
      })}
    >
      {c}
    </div>
  )
}
export function Results() {
  const [files] = useFileStore((state) => [state.files])
  return (
    <Card>
      <CardBody>
        <div>
          {files.map((f) => (
            <Result key={f.id} f={f} />
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
