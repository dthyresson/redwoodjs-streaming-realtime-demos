interface AvatarProps {
  name: string
  color: string
}

const Avatar = ({ name, color }: AvatarProps) => {
  const getInitials = (name: string) => {
    const names = name.split(' ')
    const firstInitial = names[0].substring(0, 1).toUpperCase()
    if (names.length === 1) return firstInitial
    const lastInitial = names[names.length - 1].substring(0, 1).toUpperCase()
    return `${firstInitial}${lastInitial}`
  }

  return (
    <div
      className={`rounded-full bg-${color} center text-sans h-12 w-12 text-xl font-bold text-darkSlateBlue`}
    >
      {getInitials(name)}
    </div>
  )
}

export default Avatar
