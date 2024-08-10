import { Client } from "@gradio/client";
import { LoggerService } from "../../logger/logger.service";
import type { GradioResponse } from "../@types/gradio";
import type { ImageServiceResponse } from "../@types/image-response";
import type { CreatePromptDTO } from "../dto/create-prompt.dto";
import { PuppeteerService } from "./puppeteer.service";

export class ImageService {
    private readonly logger = LoggerService.new();
    private readonly puppeteer = new PuppeteerService();

    async generate(prompt: CreatePromptDTO, browser: boolean = false): Promise<ImageServiceResponse> {
        if (browser) {
            return await this.browser(prompt);
        }

        return await this.gradio(prompt);
    }

    async browser(prompt: CreatePromptDTO): Promise<ImageServiceResponse> {
        return await this.puppeteer.generate(prompt);
    }

    private async gradio({ prompt, negative, resolution, upscaler, sampler, guidance, inferenceSteps, qualityTags, stylePreset }: CreatePromptDTO) {
        this.logger.debug(prompt, "received");

        const api = await Client.connect("cagliostrolab/animagine-xl-3.1");
        const result = await api.predict('/run', [
            prompt,
            negative,
            Math.floor(Math.random() * 2147483647),
            resolution.width,
            resolution.height,
            guidance,
            inferenceSteps,
            sampler,
            'Custom',
            stylePreset,
            qualityTags,
            upscaler?.enabled ?? false,
            upscaler?.strength ?? 0,
            upscaler?.multiplier ?? 1,
            false,
        ]);

        const data = result.data as GradioResponse;
        this.logger.debug(data[1])

        const image = data[0][0].image;
        const { orig_name: filename, url: imageUrl } = image;

        this.logger.info(`fetching ${filename} ...`);
        const response = await fetch(imageUrl);
        const imageBuffer = Buffer.from(await response.arrayBuffer());

        return { image: imageBuffer, filename };
    }
}
