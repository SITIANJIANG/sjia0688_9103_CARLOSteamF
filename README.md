# sjia0688_9103_CARLOSteamF

## 🍎Instructions on how to interact with the work

- Click the “Generate Apple Tree” button to create a new arrangement of apple shapes.

- Use the “Play/Pause Music” button to toggle background music. The color of the apples will smoothly transition based on the music’s low-frequency energy.

- Adjust the “Noise Amplitude” slider to control the strength of the Perlin noise offset (how much the apples "wobble").

- Adjust the “Noise Speed” slider to change how fast the Perlin noise fluctuates (affecting the speed of the apple’s movement).

## 📝Details of individual approach
My contribution focuses on adding more **organic, lifelike motion** to the apple shapes using **Perlin noise** and making this motion adjustable in real-time via **interactive sliders**. While other group members are focusing on color changes or user interaction, I’m primarily animating the **position of the apples** to create a dynamic, wavy feel that enhances the “tree” metaphor.


## ✨Inspiration
My work was inspired by the organic forms seen in nature (e.g., the gentle sway of tree branches in the wind). 

## 🔧Technical explanation
### Sliders:
- Implemented using createSlider(min, max, initial, step) in p5.js.

- The noise amplitude slider adjusts how far the apples can “float” from their original positions (noiseAmplitude).

- The noise speed slider adjusts the rate of change in noise values (noiseScale).

### Perlin noise：
- In `draw()`, I use `noise(frameCount * noiseScale + c.noiseSeedX)` and `noise(frameCount * noiseScale + c.noiseSeedY)`.
- unlike `random()`, `noise()` returns smoothly varying values, giving natural and organic motion (no sudden jumps).
- The noise values are mapped to small offsets (`offsetX`, `offsetY`) that animate the apple positions in a subtle, wavy pattern.

## 📖Reference and Explanation

In this project, the noiseSlider is a user interface element created with the p5.js library’s built-in function [createSlider()](https://p5js.org/reference/p5/createSlider/). It allows users to dynamically adjust the amplitude of Perlin noise applied to the animation of the apples on the tree. 

### How it works?

The slider generates a numeric value within a specified range (0 to 30 in this case).
This value controls the maximum offset applied to each apple's position using Perlin noise, producing smooth, natural-looking movements rather than random jitter.
During each animation frame, the code reads the current slider value via `noiseSlider.value()` and applies it to modify the apples’ positions, allowing real-time interactive control of the "wobbliness" or "floatiness" of the apples.

### Why it was used?

The slider provides an intuitive, real-time way to control a key visual parameter without hardcoding values, enhancing user interaction.

Perlin noise produces organic, smooth randomness that looks visually appealing for natural elements like leaves or apples swaying gently, which is preferable to pure random movement.