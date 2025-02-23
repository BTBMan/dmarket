import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'

export default function MainMenu() {
  const { setTheme, theme } = useTheme()
  const themes = [
    {
      key: 'light',
      icon: <SunIcon />,
    },
    {
      key: 'system',
      icon: <DesktopIcon />,
    },
    {
      key: 'dark',
      icon: <MoonIcon />,
    },
  ]

  return (
    <div className="space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>
            <Tabs
              defaultValue={theme}
              onValueChange={(value) => {
                setTheme(value)
              }}
            >
              <TabsList className="w-full">
                {themes.map(theme => (
                  <TabsTrigger className="flex-1" key={theme.key} value={theme.key}>
                    {theme.icon}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
