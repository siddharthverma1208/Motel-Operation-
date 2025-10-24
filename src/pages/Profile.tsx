import { UserProfile } from '../components/UserProfile'

export default function Profile() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <UserProfile />
    </div>
  )
}