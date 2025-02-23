import { DesktopIcon, MoonIcon, PersonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import RainbowConnectButton from './ConnectButton'

export default function MainMenu() {
  const avatar = ''

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
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar>
            <AvatarImage src={avatar} />
            <AvatarFallback><PersonIcon className="w-[20px] h-[20px]" /></AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuLabel>
            <RainbowConnectButton />
          </DropdownMenuLabel>
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
