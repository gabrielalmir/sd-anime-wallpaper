import { z } from 'zod';

const envSchema = z.object({
    // general
    NODE_ENV: z.string().default('development'),
    OUTPUT_DIR: z.string().default('output'),
    APP_MODE: z.string().default('cli'),
    // hugging face
    HUGGING_MODEL: z.string(),
    HUGGING_SPACE_URL: z.string(),
    // css paths
    CSS_PROMPT_PATH: z.string(),
    CSS_NEGATIVE_PATH: z.string(),
    CSS_QUALITY_TAGS_PATH: z.string(),
    CSS_ADVANCED_PATH: z.string(),
    CSS_CUSTOM_RADIO_PATH: z.string(),
    CSS_INPUT_WIDTH_PATH: z.string(),
    CSS_INPUT_HEIGHT_PATH: z.string(),
    CSS_INPUT_UPSCALE_PATH: z.string(),
    CSS_GENERATE_BUTTON_PATH: z.string(),
    CSS_IMAGE_PREVIEW_PATH: z.string(),
});

export const env = envSchema.parse(process.env);
