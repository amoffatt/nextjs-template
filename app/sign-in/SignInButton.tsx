'use client'

import { cn } from '@/lib/utils'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function SignInButton() {
  return (
    <Button
      className="w-full"
      variant="ghost"
      size="sm"
      asChild
    >
      <Link href="/sign-in">
        Sign In
      </Link>
    </Button>
  )
} 