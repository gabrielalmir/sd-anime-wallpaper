import { cli } from "./cli";
import { env } from "./config/env";

type AppCommand = () => Promise<void>;
type AppCommands = Record<string, AppCommand>;

async function main() {
    const commands: AppCommands = { 'cli': cli }
    const command = commands[env.APP_MODE];

    if (!command) {
        throw new Error(`Unknown command: ${env.APP_MODE}`);
    }

    await command();
}

void main().catch(console.error);
