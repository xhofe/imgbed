import { Switch } from '@nextui-org/react'
import { SunIcon, MoonIcon } from './icons'

export function Header() {
  return (
    <div className="relative z-40 mx-auto my-4 flex max-w-[1280px] flex-row flex-nowrap items-center justify-between px-6">
      <h1 className="text-2xl font-bold">Image Uploader</h1>
      <Switch
        defaultSelected
        size="lg"
        color="secondary"
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <SunIcon className={className} />
          ) : (
            <MoonIcon className={className} />
          )
        }
        onValueChange={(v) => {
          if (v) {
            document.documentElement.classList.remove('dark')
          } else {
            document.documentElement.classList.add('dark')
          }
        }}
      ></Switch>
    </div>
  )
}
