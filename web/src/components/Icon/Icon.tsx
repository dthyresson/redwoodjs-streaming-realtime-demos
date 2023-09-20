import { ArrowUpRight } from './ArrowUpRight'
import { ChevronDown } from './ChevronDown'
import { Github } from './Github'
import { Send } from './Send'

export type IconType = {
  size?: number
}

interface IconProps extends IconType {
  name: string
}

const Icon = ({ name, size = 24 }: IconProps) => {
  switch (name.toLowerCase()) {
    case 'arrowupright':
      return <ArrowUpRight size={size} />
    case 'chevrondown':
      return <ChevronDown size={size} />
    case 'github':
      return <Github size={size} />
    case 'send':
      return <Send size={size} />
  }
}

export default Icon
