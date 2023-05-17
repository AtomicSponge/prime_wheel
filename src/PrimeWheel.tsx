import { useRef, useEffect } from 'react'
import './PrimeWheel.scss'

const PrimeWheel = (props: any) => {  
  const canvasRef = useRef(null)

  /*
   * Wheel data used to render
   */
  const wheelData = {
    scale: props.scale,
    speed: props.speed,
    color: props.color,
    size: props.size,
    font: 'Arial',
    last_prime: 2,
    max_size: props.max_size
  }

  /*
   * Check for prime numbers
   */
  const isPrime = (num: number) => {
    for(var i = 2; i < num; i++) {
        if(num % i == 0) return false
    }
    return true
  }

  /*
   * Draw the prime wheel
   */
  const draw = (ctx: any, frameCount: number) => {
    //  Prime number found, draw it using cartesian coordinates
    if(isPrime(wheelData.last_prime)) {
      ctx.font = wheelData.size + " " + wheelData.font
      ctx.fillStyle = wheelData.color
      ctx.fillText(
        wheelData.last_prime,
          ((ctx.canvas.width / 2) + (wheelData.last_prime * Math.cos(wheelData.last_prime)) / wheelData.scale),
          ((ctx.canvas.height / 2) - (wheelData.last_prime * Math.sin(wheelData.last_prime)) / wheelData.scale)
      )
    }

    if(frameCount % wheelData.speed === 0)
      wheelData.last_prime++  //  Increment counter to check for next prime

    //  Reset wheel at max size
    if(wheelData.last_prime > wheelData.max_size) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      wheelData.last_prime = 2
    }
  }
  
  /*
   * Set up drawing 
   */
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    let frameCount = 0
    let animationFrameId = 0
    
    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return <canvas className="prime-wheel" ref={canvasRef} {...props}/>
}

export default PrimeWheel