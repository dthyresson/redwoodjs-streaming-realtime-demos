import { IconType } from './Icon'

const ChevronDown = ({ size }: IconType) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.71002 14.71C7.10002 15.1 7.73002 15.1 8.12002 14.71L12 10.83L15.88 14.71C16.27 15.1 16.9 15.1 17.29 14.71C17.68 14.32 17.68 13.69 17.29 13.3L12.7 8.71C12.31 8.32 11.68 8.32 11.29 8.71L6.70002 13.3C6.32002 13.68 6.32002 14.32 6.71002 14.71Z" />
    </svg>
  )
}

export { ChevronDown }
