#!/usr/bin/node

import fs from 'fs/promises';
import path from 'path';

import { Command } from "commander";
import { env } from '../config/env';
import { CreatePromptDTO } from "../image/dto/create-prompt.dto";
import { ImageGenerationMethod } from '../image/enums/image-generation-method.enum';
import { ImageService } from "../image/service/image.service";

export async function cli() {
    const cmd = new Command();

    // Set up the CLI
    cmd.name('sd-anime-wallpaper')
        .description('Generate anime wallpapers using Stable Diffusion')
        .version('0.1.0')

    // Setup parameters of 'generate'
    cmd.command('generate')
        .description('Generate an image')
        .option('-p, --prompt <prompt>', 'Image prompt')
        .option('-n, --negative <negative>', 'Negative prompt')
        .option('-w, --width <width>', 'Image width', '1280')
        .option('-h, --height <height>', 'Image height', '720')
        .option('-u, --upscaler <upscaler>', 'Upscaler settings (enabled, multiplier, strength)', 'true,1.5,0.55')
        .option('-q, --qualityTags <qualityTags>', 'Quality tags', 'Heavy v3.1')
        .option('-m, --method <method>', 'Image generation method (gradio, browser)', 'gradio')
        .option('-o, --output <output>', 'Output directory', env.OUTPUT_DIR)
        .action(async (options) => {
            const [enabled, multiplier, strength] = options.upscaler.split(',').map((v: string) => v.trim());
            const upscaler = {
                enabled: enabled === 'true',
                multiplier: parseFloat(multiplier),
                strength: parseFloat(strength)
            };

            const promptDTO = new CreatePromptDTO({
                prompt: options.prompt,
                negative: options.negative,
                resolution: { width: parseInt(options.width), height: parseInt(options.height) },
                upscaler,
                qualityTags: options.qualityTags
            });

            try {
                const imageService = new ImageService();
                const imageGenerationMethod = options.method as ImageGenerationMethod;
                const { image, filename } = await imageService.generate(promptDTO, imageGenerationMethod);

                await fs.writeFile(path.join(options.output, filename), image);
                console.log(`Image generated successfully: ${filename}`);
            } catch (error) {
                console.error('Error generating image:', error);
            }
        });

    cmd.parse(process.argv);
}

