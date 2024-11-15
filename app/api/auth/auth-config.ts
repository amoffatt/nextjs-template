"use server"

import { providers } from "./config"

export interface EnabledAuthProviders {
  github?: boolean
  google?: boolean
  email?: boolean
}

export async function getEnabledAuthProviders(): Promise<EnabledAuthProviders> {
  return {
    github: !!providers.github,
    google: !!providers.google,
    email: !!providers.email,
  }
}