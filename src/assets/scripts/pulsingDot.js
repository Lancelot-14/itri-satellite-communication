export const pulsingDot = (
  map,
  size = 200,
  color = '72, 202, 228',
  glowColor = '',
  radiusRatio = 0.2
) => ({
  width: size,
  height: size,
  data: new Uint8Array(size * size * 4),

  // When the layer is added to the map,
  // get the rendering context for the map canvas.
  onAdd: function () {
    const canvas = document.createElement('canvas')
    canvas.width = this.width
    canvas.height = this.height
    this.context = canvas.getContext('2d', {
      willReadFrequently: true,
    })
  },

  // Call once before every frame where the icon will be used.
  render: function () {
    const duration = 1000
    const t = (performance.now() % duration) / duration

    const radius = (size / 2) * radiusRatio
    const outerRadius = (size / 2) * (radiusRatio + 0.1) * t + radius
    const context = this.context

    // Draw the outer circle.
    context.clearRect(0, 0, this.width, this.height)
    context.beginPath()
    context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2)
    context.fillStyle = `rgba(${glowColor ? glowColor : color}, ${1 - t})`
    context.fill()

    // Draw the inner circle.
    context.beginPath()
    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2)
    context.fillStyle = `rgba(${color}, 1)`
    context.strokeStyle = 'white'
    context.lineWidth = 2 + 4 * (1 - t)
    context.fill()
    context.stroke()

    // Update this image's data with data from the canvas.
    this.data = context.getImageData(0, 0, this.width, this.height).data

    // Continuously repaint the map, resulting
    // in the smooth animation of the dot.
    map.triggerRepaint()

    // Return `true` to let the map know that the image was updated.
    return true
  },
})
