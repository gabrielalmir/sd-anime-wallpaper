export type GradioResponse = [GradioImages[], GradioPrompt]

export interface GradioImages {
    image: GradioImage
    caption: any
}

export interface GradioImage {
    orig_name: string
    path: string
    url: string
    is_stream: false
}

export interface GradioPrompt {
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
    Model: GradioImageModel
}

export interface GradioImageModel {
    Model: string
    "Model hash": string
}
