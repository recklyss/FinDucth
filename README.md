# FinDutch - AI Expense Splitting App

FinDutch is a modern expense splitting application with a chat-based interface. It allows users to easily record expenses, create groups, and split bills with friends.

## Features

- 💬 Chat-based interface for natural interaction
- 💰 Record expenses with simple commands
- 👥 Create and manage expense groups
- 🧮 Automatic expense splitting
- 📱 Responsive design for mobile and tablet

## Tech Stack

- **Frontend**: React + TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: react-icons
- **Desktop App**: Tauri (Rust)

## Commands

The app supports the following commands:

- `/record` - Record a new expense
- `/group create` - Create a new expense group
- `/add_friend` - Add friends to your contacts
- `/finalize` - Finalize and settle up expenses
- `/help` - Show help dialog

## Development

### Prerequisites

- Node.js (v16+)
- pnpm
- Rust (for Tauri)

### Setup

1. Clone the repository
2. Install dependencies:
   ```
   pnpm install
   ```
3. Run the development server:
   ```
   pnpm tauri dev
   ```

## Building

To build the application for production:

```
pnpm tauri build
```

This will create platform-specific installers in the `src-tauri/target/release/bundle` directory.

## License

MIT

## Acknowledgements

- [Tauri](https://tauri.app/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Daisy UI](https://daisyui.com/docs/)

