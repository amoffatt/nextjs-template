'use client'

import { SignInButton } from '../app/sign-in/SignInButton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ProfileIcon } from './ProfileIcon'
import { useSession } from 'next-auth/react'

export function HeaderMenu() {
  const { data: session } = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="default">
          <ProfileIcon />
          <span className="sr-only">Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-background/80 backdrop-blur-lg z-50">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          {session?.user ? (
            <div className="flex flex-col space-y-1">
              <p className="leading-none">{session.user.name}</p>
              <p className="leading-none text-muted-foreground">{session.user.email}</p>
            </div>
          ) : (
            'Not Logged In'
          )}
        </DropdownMenuLabel>
        <DropdownMenuItem className="p-0">
          <SignInButton />
        </DropdownMenuItem>
        {/* Additional menu items can be added here based on auth status */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 