import { ChevronDown } from './ChevronDown'

type IconType = {
  size?: number
}

interface IconProps extends IconType {
  name: string
}

const Icon = ({ name, size = 24 }: IconProps) => {
  switch (name.toLowerCase()) {
    case 'chevrondown':
      return <ChevronDown size={size} />
  }
}

export { Icon, IconType }
