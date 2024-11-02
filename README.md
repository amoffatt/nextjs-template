# NextJS 14 Template with Prisma 5 and NextAuth 4 support

This template provides a starting point for building NextJS applications with Prisma as the ORM and NextAuth for authentication. It includes boilerplate code to get you started quickly.

## Features

* NextJS for server-side rendering and static site generation
* Prisma for database operations and schema management
* NextAuth for authentication and session management
* Support for multiple authentication providers (Email, GitHub, Google)
* Email verification and magic link sign-in
* Customizable email templates for verification and magic link
* Prisma schema and migrations setup
* NextAuth configuration for providers and session management

## Getting Started

Choose one of these methods to create your project:

### Using create-next-app (Recommended)
```bash
npx create-next-app@latest my-app --example https://github.com/amoffatt/nextjs-prisma-nextauth-template
```

### Manual Clone
```bash
git clone https://github.com/your-username/nextjs-prisma-nextauth-template.git
cd nextjs-prisma-nextauth-template
npm install
```

After using either method:
1. Copy the `.env` file to `.env.local` to set up your environment variables. This file will be ignored by Git due to the `.gitignore` file.
2. Start the development server: `npm run dev`
3. Open your browser at `http://localhost:3000`

## Configuration

### Environment Variables

* `NEXTAUTH_SECRET`: Secret key for NextAuth
* `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`: SMTP server settings for email verification (optional)
* `GITHUB_ID` and `GITHUB_SECRET`: GitHub OAuth credentials (optional)
* `GOOGLE_ID` and `GOOGLE_SECRET`: Google OAuth credentials (optional)

### Prisma Schema

The Prisma schema is defined in `prisma/schema.prisma`. You can modify it to fit your database schema needs. After making changes to your Prisma models, you need to generate and apply the corresponding database migrations. To do this, run `npx prisma generate` to generate the Prisma client and `npx prisma migrate dev` to apply the migrations.

### NextAuth Configuration

The NextAuth configuration is in `app/api/auth/config.ts`. You can modify it to add or remove authentication providers, change session settings, and more.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
