import { ChevronDown } from './ChevronDown'
import { Send } from './Send'

export type IconType = {
  size?: number
}

interface IconProps extends IconType {
  name: string
}

const Icon = ({ name, size = 24 }: IconProps) => {
  switch (name.toLowerCase()) {
    case 'chevrondown':
      return <ChevronDown size={size} />
    case 'send':
      return <Send size={size} />
  }
}

export default Icon
