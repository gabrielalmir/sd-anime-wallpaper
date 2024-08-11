# sd-anime-wallpaper

## Overview

`sd-anime-wallpaper` is a CLI tool for generating anime-style wallpapers using Stable Diffusion.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/gabrielalmir/sd-anime-wallpaper.git
    ```
2. Install dependencies:
    ```bash
    cd sd-anime-wallpaper
    npm install
    ```

## Usage

Generate an image with the following command:

```bash
node dist/main.js generate [options]
```

## Options
* -p, --prompt <prompt>: Image prompt.
* -n, --negative <negative>: Negative prompt.
* -w, --width <width>: Image width (default: 1280).
* -h, --height <height>: Image height (default: 720).
* -u, --upscaler <upscaler>: Upscaler settings (enabled,multiplier,strength, default: true,1.5,0.55).
* -q, --qualityTags <qualityTags>: Quality tags (default: Heavy v3.1).
* -m, --method <method>: Generation method (gradio or browser, default: gradio).
* -o, --output <output>: Output directory (default: ./output).

## Example

```bash
node dist/main.js generate -p "A beautiful anime landscape" -w 1920 -h 1080 -u true,2.0,0.75 -q "Heavy v3.1" -m gradio -o ./images
```
## Configuration
Adjust settings in config/env.js as needed or using the enviromnent variables.

## License

[MIT License.](./LICENSE)
