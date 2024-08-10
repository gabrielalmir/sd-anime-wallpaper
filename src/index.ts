import { env } from "./config/env";
import { CreatePromptDTO } from "./image/dto/create-prompt.dto";
import { ImageService } from "./image/service/image.service";

import fs from 'fs/promises';
import path from 'path';

async function main() {
    const prompt = new CreatePromptDTO({
        prompt: '1girl, souryuu asuka langley, neon genesis evangelion, plugsuit, pilot suit, red bodysuit, sitting, crossing legs, black eye patch, cat hat, throne, symmetrical, looking down, from bottom, looking at viewer, outdoors, (wallpaper), (masterpiece), (safe)',
        negative: 'longbody, lowres, bad anatomy, bad hands, missing fingers, pubic hair, extra digit, fewer digits, cropped, worst quality, low quality, very displeasing, badanatomy, nsfw, lowres, (bad), text, error, fewer, extra, missing, worst quality, jpeg artifacts, low quality, watermark, unfinished, displeasing, oldest, early, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract]',
        resolution: {
            width: 1280,
            height: 720
        },
        upscaler: {
            enabled: true,
            multiplier: 1.5,
            strength: 0.55
        },
        qualityTags: 'Heavy v3.1'
    });

    const imageService = new ImageService();
    const { image, filename } = await imageService.generate(prompt, false);

    await fs.writeFile(path.join(env.OUTPUT_DIR, filename), image)
}

void main().catch(console.error);
