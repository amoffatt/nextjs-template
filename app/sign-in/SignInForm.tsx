'use client'

import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ProfileIcon } from '@/components/ProfileIcon'
import { EnabledAuthProviders, getEnabledAuthProviders } from '@/app/api/auth/auth-config'

export function SignInForm({ user }: { user?: { image?: string } }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [providers, setProviders] = useState<EnabledAuthProviders>({})

  useEffect(() => {
    getEnabledAuthProviders().then(setProviders)
  }, [])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await signIn('email', { email, callbackUrl: '/' })
    setLoading(false)
  }

  console.log("Providers:", providers)


  return (
    <div className="space-y-6">
      {providers.email && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Sending link...' : 'Sign in with Email'}
          </Button>
        </form>
      )}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {providers.google && (
          <Button
            variant="outline"
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full"
          >
            <ProfileIcon image={user?.image} />
            <span className="ml-3">Google</span>
          </Button>
        )}

        {providers.github && (
          <Button
            variant="outline"
            onClick={() => signIn('github', { callbackUrl: '/' })}
            className="w-full"
          >
            <ProfileIcon image={user?.image} />
            <span className="ml-3">GitHub</span>
          </Button>
        )}
      </div>
    </div>
  )
} 