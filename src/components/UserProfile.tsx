import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useToast } from './ui/use-toast'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import { Loader2, Upload } from 'lucide-react'
import { supabase } from '../integrations/supabase/client'
import { User } from '@supabase/supabase-js'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
interface Profile {
  full_name: string
  phone_number: string
  address: string
  avatar_url: string
  loyalty_points: number
}

// Using the imported interface

export function UserProfile() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>({
    full_name: '',
    phone_number: '',
    address: '',
    avatar_url: '',
    loyalty_points: 0
  })
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const { toast } = useToast()

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0 || !user) {
        return
      }

      setUploadingImage(true)
      
      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png'
      const fileName = `profile-${Date.now()}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      // Check file type
      if (!['jpg', 'jpeg', 'png', 'gif'].includes(fileExt)) {
        throw new Error('Unsupported file type. Please upload an image file.')
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size too large. Maximum size is 5MB.')
      }

      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { 
          upsert: true,
          contentType: file.type
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id)

      if (updateError) throw updateError

      // Update local state
      setProfile(prev => ({ ...prev, avatar_url: publicUrl }))
      
      toast({
        title: 'Success',
        description: 'Profile picture updated successfully!',
      })
    } catch (error) {
      console.error('Error uploading image:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to upload profile picture.',
        variant: 'destructive'
      })
    } finally {
      setUploadingImage(false)
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, phone_number, address, avatar_url, loyalty_points')
          .eq('id', user.id)
          .single()

        if (error) {
          if (error.code === 'PGRST116') {
            // Profile doesn't exist, create one
            const initialProfile = {
              id: user.id,
              full_name: '',
              phone_number: '',
              address: '',
              avatar_url: '',
              loyalty_points: 0
            }

            const { error: createError } = await supabase
              .from('profiles')
              .insert([initialProfile])

            if (createError) {
              console.error('Error creating profile:', createError)
              throw createError
            }

            // Set initial profile state
            setProfile({
              full_name: '',
              phone_number: '',
              address: '',
              avatar_url: '',
              loyalty_points: 0
            })
          } else {
            throw error
          }
        } else if (data) {
          // Set profile from fetched data
          setProfile({
            full_name: data.full_name || '',
            phone_number: data.phone_number || '',
            address: data.address || '',
            avatar_url: data.avatar_url || '',
            loyalty_points: data.loyalty_points || 0
          })
        }
      } catch (error) {
        console.error('Error loading profile:', error)
        toast({
          title: 'Error',
          description: 'Failed to load profile. Please try again.',
          variant: 'destructive'
        })
      }
    }

    fetchProfile()
  }, [user, toast])

  const getLoyaltyTier = (points: number) => {
    if (points >= 5000) return { name: 'Platinum', color: 'text-secondary' }
    if (points >= 1000) return { name: 'Gold', color: 'text-primary' }
    return { name: 'Silver', color: 'text-gray-500' }
  }

  const deleteAccount = async () => {
    if (!user) return

    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    )

    if (!confirmed) return

    setLoading(true)
    try {
      // Delete user's profile first
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id)

      if (profileError) throw profileError

      // Sign out the user
      await signOut()
      toast({
        title: "Account Deleted",
        description: "Your account has been successfully deleted. Please contact support if you need to restore your account.",
      })
      
      // Use React Router's navigate for redirection
      navigate('/')
    } catch (error) {
      console.error('Error deleting account:', error)
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again or contact support.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async () => {
    if (!user) return

    setLoading(true)
    try {
      // Prepare update data
      const updateData = {
        id: user.id,
        full_name: profile.full_name,
        phone_number: profile.phone_number,
        address: profile.address,
        avatar_url: profile.avatar_url,
        loyalty_points: profile.loyalty_points,
        updated_at: new Date().toISOString()
      }

      // First try update
      let { error } = await supabase
        .from('profiles')
        .upsert(updateData)

      if (error) {
        console.error('Error updating profile:', error)
        throw error
      }

      // Fetch the updated profile to confirm changes
      const { data: updatedProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('full_name, phone_number, address, avatar_url, loyalty_points')
        .eq('id', user.id)
        .single()

      if (fetchError) {
        console.error('Error fetching updated profile:', fetchError)
        throw fetchError
      }

      // Update local state with the fetched data
      if (updatedProfile) {
        setProfile({
          full_name: updatedProfile.full_name || '',
          phone_number: updatedProfile.phone_number || '',
          address: updatedProfile.address || '',
          avatar_url: updatedProfile.avatar_url || '',
          loyalty_points: updatedProfile.loyalty_points || 0
        })
      }

      toast({
        title: "Success",
        description: "Profile updated successfully!",
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: name === 'loyalty_points' ? parseInt(value) || 0 : value
    }))
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p>Please sign in to view your profile.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="relative group">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
              <AvatarImage src={profile.avatar_url || ''} className="object-cover" />
              <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <Label
              htmlFor="avatar-upload"
              className="absolute inset-0 flex items-center justify-center bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              {uploadingImage ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Upload className="h-6 w-6" />
              )}
            </Label>
            <Input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploadingImage}
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold">{profile.full_name || 'Update Your Profile'}</h2>
            <p className="text-gray-500">{user.email}</p>
            <div className="mt-2 flex items-center gap-2 justify-center sm:justify-start">
              <Badge variant="outline" className={getLoyaltyTier(profile.loyalty_points).color}>
                {getLoyaltyTier(profile.loyalty_points).name} Member
              </Badge>
              <Badge variant="secondary">
                {profile.loyalty_points} Points
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="full_name" className="text-sm font-medium">Full Name</label>
          <Input
            id="full_name"
            name="full_name"
            value={profile.full_name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone_number" className="text-sm font-medium">Phone Number</label>
          <Input
            id="phone_number"
            name="phone_number"
            value={profile.phone_number}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium">Address</label>
          <Input
            id="address"
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
        </div>
        <div className="space-y-4">
          <Button 
            onClick={updateProfile} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
          
          <Button 
            onClick={deleteAccount}
            disabled={loading}
            variant="destructive"
            className="w-full"
          >
            {loading ? 'Processing...' : 'Delete Account'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}