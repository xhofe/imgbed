import { apis, useApiStore } from '@/store/api'
import { Card, CardBody, Radio, RadioGroup } from '@nextui-org/react'

export function ApiSelect() {
  const [current, setCurrent] = useApiStore((state) => [
    state.current,
    state.setCurrent,
  ])
  return (
    <div>
      <Card>
        <CardBody>
          <RadioGroup
            orientation="horizontal"
            value={current}
            onValueChange={(v) => {
              const api = apis.find((item) => item.name === v)
              if (api) {
                setCurrent(api.name)
              }
            }}
          >
            {apis.map((item, index) => (
              <Radio key={`${item}${index}`} value={item.name}>
                {item.name}
              </Radio>
            ))}
          </RadioGroup>
        </CardBody>
      </Card>
    </div>
  )
}
