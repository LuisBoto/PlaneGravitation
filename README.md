# PlaneGravitation

The aim of this project was to create a simplistic, 2D gravitation simulation with a twist: Instead of directly applying newtonian gravitational forces, the goal was to create a somewhat more realistic system with an actual space-time deformation.

**Warning:** The code is a bit CPU intensive, it should be GPU-optimised and probably the overall loop could also be made faster. Equations, scales and constants were chosen by feeling alone as I am not versed in physics 😛

# Designing the approach

To make the idea work there were some problems that built on one another, and thus needed to be tackled sequentially. These were:

- How to achieve gravitational drift
  - How to make the combination of drift and movement translate into orbits
    - How to make multiple bodies affect each other gravitationally

Next we'll go into how each one of these issues was approached.

## Achieving gravitational drift

This first question was maybe the hardest to grasp, as it wasn't straightforward to me how to translate the gravitational bend of space into a 2D plane. After scrambling my brains for some time I came up with the basis for this simulation, which I thought about as "plane compression".

The idea is that the actual coordinate space is the same at all times (i.e. a stationary object in coordinates (5, 5) would always remain in those coordinates, even when falling into another object and seemingly moving), but the coordinate plane itself is "deformed" by the gravitational force.

To better picture it, imagine a sheet of paper where two points have a gravitational attraction. The objects themselves do not actually move, rather the paper itself wrinkles instead to make them closer, and so a gravitational field compresses the coordinate space around it bringing it towards itself.

<p align="center"><img src=".readme/planeDeformation.png" alt="Logo"/></p>

As execution time passes, the compression accelerates, thus achieving the effect of objects accelerating and falling into gravitational pits. With this approach we then have our "base" plane with the real coordinate positions of objects, and our "visual" or deformed plane, which is the one we actually draw on screen and where we see objects interacting gravitationally. This way, stationary objects do not actually move, but gravity makes the space between them collapse until they collide.

In code, we perform this by traslating an objects real coordinate to its deformed position before drawing it.

<p align="center"><img width="25%" src=".readme/gravitationalDrift.gif" alt="Logo"/></p>

## Creating orbits

TBD