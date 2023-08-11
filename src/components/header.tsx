import { Switch } from '@nextui-org/react'
import { SunIcon, MoonIcon } from '../icons'
import { useEffect, useState } from 'react'

export function Header() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light')
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [theme])
  return (
    <div className="relative z-40 mx-auto py-4 flex max-w-[1280px] flex-row flex-nowrap items-center justify-between px-6">
      <h1 className="text-2xl font-bold">图片上传</h1>
      <Switch
        defaultSelected
        size="md"
        color="primary"
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <SunIcon className={className} />
          ) : (
            <MoonIcon className={className} />
          )
        }
        isSelected={theme === 'light'}
        onValueChange={(v) => {
          setTheme(v ? 'light' : 'dark')
        }}
      ></Switch>
    </div>
  )
}
