import { z } from 'zod';

const envSchema = z.object({
    // general
    NODE_ENV: z.string().default('development'),
    OUTPUT_DIR: z.string().default('output'),
    APP_MODE: z.string().default('cli'),
    // hugging face
    HUGGING_MODEL: z.string().default('cagliostrolab/animagine-xl-3.1'),
    HUGGING_SPACE_URL: z.string().default('https://cagliostrolab-animagine-xl-3-1.hf.space'),
    // css paths
    CSS_PROMPT_PATH: z.string().default('#component-8 textarea'),
    CSS_NEGATIVE_PATH: z.string().default('#component-9 textarea'),
    CSS_QUALITY_TAGS_PATH: z.string().default('#component-12 input'),
    CSS_ADVANCED_PATH: z.string().default('#component-15-button'),
    CSS_CUSTOM_RADIO_PATH: z.string().default("input[name='radio-20']"),
    CSS_INPUT_WIDTH_PATH: z.string().default('#component-24 input[type=number]'),
    CSS_INPUT_HEIGHT_PATH: z.string().default('#component-25 input[type=number]'),
    CSS_INPUT_UPSCALE_PATH: z.string().default('#component-28 input[type=checkbox]'),
    CSS_GENERATE_BUTTON_PATH: z.string().default('#component-49'),
    CSS_IMAGE_PREVIEW_PATH: z.string().default('#component-50 .preview img'),
});

export const env = envSchema.parse(process.env);
