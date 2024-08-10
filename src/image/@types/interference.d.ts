export type InferenceResponse = [InferenceImages[], InferencePrompt]

export interface InferenceImages {
    image: InferenceImage
    caption: any
}

export interface InferenceImage {
    orig_name: string
    path: string
    url: string
    is_stream: false
}

export interface InferencePrompt {
    prompt: string
    negative_prompt: string
    resolution: string
    guidance_scale: number
    num_inference_steps: number
    seed: number
    sampler: string
    sdxl_style: string
    add_quality_tags: boolean
    quality_tags: string
    use_upscaler: any
    Model: InferenceImageModel
}

export interface InferenceImageModel {
    Model: string
    "Model hash": string
}
