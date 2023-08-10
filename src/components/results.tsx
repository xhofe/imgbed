import { Copy, Remove } from '@/icons'
import { TFile, useFileStore } from '@/store/file'
import { copyToClip } from '@/utils/copy'
import {
  Button,
  Card,
  CardBody,
  Code,
  Snippet,
  Tab,
  Tabs,
} from '@nextui-org/react'
import clsx from 'clsx'
import { ComponentProps } from 'react'
import { toast } from 'react-hot-toast'

enum UrlShowType {
  URL = 'Url',
  HTML = 'Html',
  BBCODE = 'BBcode',
  MARKDOWN = 'Markdown',
  MARKDOWNWITHLINK = 'Markdown with link',
}

const getUrlShow = (f: TFile, type: UrlShowType) => {
  switch (type) {
    case UrlShowType.URL:
      return f.url
    case UrlShowType.HTML:
      return `<img src="${f.url}" alt="${f.file.name}" title="${f.file.name}" referrerPolicy="no-referrer" />`
    case UrlShowType.BBCODE:
      return `[img]${f.url}[/img]`
    case UrlShowType.MARKDOWN:
      return `![${f.file.name}](${f.url})`
    case UrlShowType.MARKDOWNWITHLINK:
      return `[![${f.file.name}](${f.url})](${f.url})`
  }
}
function Result(props: { f: TFile; type: UrlShowType }) {
  const { f } = props
  let color = 'primary' as ComponentProps<typeof Code>['color']
  let text = ''
  switch (f.status) {
    case 'error': {
      color = 'danger'
      text = f.err!
      break
    }
    case 'prepare': {
      color = 'warning'
      text = '等待上传中...'
      break
    }
    case 'uploading': {
      color = 'success'
      text = '上传中...'
      break
    }
    case 'uploaded': {
      color = 'primary'
      text = getUrlShow(f, props.type)
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
      className={clsx(
        {
          '!border-primary-500/60': props.f.focus,
        },
        'flex items-center justify-between gap-1 rounded-lg border-1 border-slate-500/30 p-1',
      )}
    >
      <Code
        color={color}
        size="sm"
        className="whitespace-break-spaces break-all"
      >
        {text}
      </Code>
      <div className="flex items-center gap-1">
        <Button
          isIconOnly
          color="danger"
          variant="flat"
          onPress={() => {
            useFileStore.getState().del(f.id)
          }}
          size="sm"
        >
          <Remove fontSize={20} />
        </Button>
        <Button
          isIconOnly
          color="primary"
          variant="flat"
          onPress={() => {
            copyToClip(text)
            toast.success('复制成功')
          }}
          size="sm"
        >
          <Copy fontSize={20} />
        </Button>
      </div>
    </div>
  )
}
export function Results() {
  const [files] = useFileStore((state) => [state.files])
  return (
    <Card>
      <CardBody>
        <Tabs color="primary">
          {Object.values(UrlShowType).map((type) => (
            <Tab key={type} title={type}>
              <div className="flex flex-col gap-1">
                {files.map((f) => (
                  <Result key={f.id} f={f} type={type} />
                ))}
              </div>
            </Tab>
          ))}
        </Tabs>
      </CardBody>
    </Card>
  )
}
