import puppeteer, { Page } from "puppeteer";
import { env } from "../../config/env";
import type { ImageServiceResponse } from "../@types/image-response";
import type { CreatePromptDTO, ImageUpscaler } from "../dto/create-prompt.dto";

export class PuppeteerService {
    async generate({ prompt, negative, qualityTags, resolution, upscaler }: CreatePromptDTO): Promise<ImageServiceResponse> {
        const browser = await puppeteer.launch({ headless: env.NODE_ENV === 'production' });
        let image: Buffer;

        try {
            const page = await browser.newPage();

            await page.goto(env.HUGGING_SPACE_URL);

            // set prompts
            await this.setPrompts(page, prompt, negative);

            // change quality tags
            await this.setQualityTags(page, qualityTags ?? '(None)');

            // set resolutions
            await this.setResolution(page, resolution.width, resolution.height);

            // set upscaler
            if (upscaler) {
                await this.setUpscaler(page, upscaler);
            }

            // generate image
            image = await this.queueImageGeneration(page);
        } catch (error) {
            throw error;
        }

        await browser.close();

        return { image, filename: `${crypto.randomUUID()}.png` };
    }

    private async setPrompts(page: Page, prompt: string, negative: string) {
        await page.waitForSelector(env.CSS_PROMPT_PATH);
        await page.type(env.CSS_PROMPT_PATH, prompt);
        await page.waitForSelector(env.CSS_NEGATIVE_PATH);
        await page.type(env.CSS_NEGATIVE_PATH, negative);
    }

    private async setQualityTags(page: Page, qualityTags: string) {
        await page.waitForSelector(env.CSS_QUALITY_TAGS_PATH);
        await page.click(env.CSS_QUALITY_TAGS_PATH);
        await page.keyboard.down('Control');
        await page.keyboard.press('KeyA');
        await page.keyboard.up('Control');
        await page.keyboard.press('Backspace');
        await page.keyboard.type(qualityTags)
        await page.keyboard.press('Enter');
    }

    private async clickOnAdvanced(page: Page) {
        await page.waitForSelector(env.CSS_ADVANCED_PATH);
        await page.click(env.CSS_ADVANCED_PATH);
    }

    private async setResolution(page: Page, width: number, height: number) {
        await this.clickOnAdvanced(page);

        // click on custom
        await page.waitForSelector(env.CSS_CUSTOM_RADIO_PATH);
        await page.click(env.CSS_CUSTOM_RADIO_PATH);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // type width
        await page.waitForSelector(env.CSS_INPUT_WIDTH_PATH);
        await this.setInputValueEvent(page, env.CSS_INPUT_WIDTH_PATH, width);

        // type height
        await page.waitForSelector(env.CSS_INPUT_HEIGHT_PATH);
        await this.setInputValueEvent(page, env.CSS_INPUT_HEIGHT_PATH, height);
    }

    private async setInputValueEvent(page: Page, selector: string, value: number) {
        await page.evaluate((selector, value) => {
            const input = document.querySelector(selector) as HTMLInputElement;
            input.value = value.toString();
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }, selector, value);
    }

    private async setUpscaler(page: Page, upscaler: ImageUpscaler) {
        if (!upscaler.enabled) return;
        await page.waitForSelector(env.CSS_INPUT_UPSCALE_PATH);

        // click on upscale
        await page.click(env.CSS_INPUT_UPSCALE_PATH);
    }

    private async queueImageGeneration(page: Page): Promise<Buffer> {
        await page.waitForSelector(env.CSS_GENERATE_BUTTON_PATH);
        await page.click(env.CSS_GENERATE_BUTTON_PATH, { delay: 500 });

        await new Promise(resolve => setTimeout(resolve, 30_000));
        await page.waitForSelector(env.CSS_IMAGE_PREVIEW_PATH);

        // Get image of the url
        const image = await page.$(env.CSS_IMAGE_PREVIEW_PATH);
        const imageUrl = await image?.evaluate(node => (node as HTMLImageElement).src) as string;

        const response = await fetch(imageUrl);
        const imageBuffer = Buffer.from(await response.arrayBuffer());

        return imageBuffer;
    }
}
