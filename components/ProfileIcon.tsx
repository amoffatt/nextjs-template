import { FaUser } from 'react-icons/fa'

export function ProfileIcon({ image }: { image?: string }) {
  return image ? (
    <div className="h-7 w-7 rounded-full bg-gray-100 p-1">
      <img src={image} alt="Profile" className="h-full w-full rounded-full" />
    </div>
  ) : (
    <div className="h-7 w-7 rounded-full bg-gray-100 p-1">
      <FaUser className="h-full w-full text-blue-400" />
    </div>
  )
} 