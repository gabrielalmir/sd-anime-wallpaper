type ImageResolution = { width: number, height: number };
export type ImageUpscaler = {
    enabled: boolean,
    strength: number,
    multiplier: number
}

export class CreatePromptDTO {
    readonly prompt: string;
    readonly negative: string;
    readonly resolution: ImageResolution;
    readonly upscaler?: ImageUpscaler;
    readonly sampler?: string;
    readonly inferenceSteps?: number;
    readonly guidance?: number;
    readonly qualityTags?: string;
    readonly stylePreset?: string;

    constructor({
        prompt, negative, resolution, upscaler, sampler = "Euler a", guidance = 7,
        inferenceSteps = 28, qualityTags = '(None)', stylePreset = '(None)'
    }: CreatePromptDTO) {
        this.prompt = prompt;
        this.negative = negative;
        this.resolution = resolution;
        this.upscaler = upscaler;
        this.sampler = sampler;
        this.guidance = guidance;
        this.inferenceSteps = inferenceSteps;
        this.qualityTags = qualityTags;
        this.stylePreset = stylePreset;
    }
}
