'use client'

import { BrandConfig } from '@/lib/types'
import { useState, useEffect, useRef } from 'react'

interface T11Props {
  brand: BrandConfig
}

interface ScratchBox {
  id: number
  scratched: number
  prize: string
  icon: string
}

export function Template11({ brand }: T11Props) {
  const [boxes, setBoxes] = useState<ScratchBox[]>([])
  const [showWinModal, setShowWinModal] = useState(false)
  const [winningPrize, setWinningPrize] = useState('')
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])
  const [isScratching, setIsScratching] = useState(false)
  const hasWonRef = useRef(false)

  const brandName = brand.brandName || 'Your Brand'
  const headline = brand.copy?.headline || 'SCRATCH & WIN'
  const logoUrl = brand.logoUrl || ''
  const ctaUrl = brand.ctaUrl || '#'
  const cta = brand.copy?.cta || 'CLAIM YOUR PRIZE!'
  
  const colors = {
    primary: brand.colors?.primary || '#FFD700',
    secondary: brand.colors?.secondary || '#8B5A2B',
    accent: brand.colors?.accent || '#8B0000'
  }
  
  const prizes = ['$500', '$1000', '$5000', '100 FREE SPINS', '200 FREE SPINS', '$10000']
  const icons = ['💎', '🎰', '🏆', '⭐', '💰', '🎁']

  useEffect(() => {
    // Seleccionar un premio ganador
    const winnerPrize = prizes[Math.floor(Math.random() * prizes.length)]
    const winnerIcon = icons[Math.floor(Math.random() * icons.length)]
    
    // Crear array de cajas con al menos 3 del premio ganador
    const initialBoxes: ScratchBox[] = []
    
    // Agregar 3 cajas ganadoras
    for (let i = 0; i < 3; i++) {
      initialBoxes.push({
        id: i,
        scratched: 0,
        prize: winnerPrize,
        icon: winnerIcon
      })
    }
    
    // Agregar 6 cajas con otros premios
    for (let i = 3; i < 9; i++) {
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)]
      const randomIcon = icons[Math.floor(Math.random() * icons.length)]
      initialBoxes.push({
        id: i,
        scratched: 0,
        prize: randomPrize,
        icon: randomIcon
      })
    }
    
    // Mezclar las cajas aleatoriamente
    for (let i = initialBoxes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [initialBoxes[i], initialBoxes[j]] = [initialBoxes[j], initialBoxes[i]]
      // Actualizar IDs después de mezclar
      initialBoxes[i].id = i
      initialBoxes[j].id = j
    }
    
    console.log('🎰 PREMIOS GENERADOS:')
    console.log('Premio ganador:', winnerPrize, winnerIcon)
    console.log('Todas las cajas:', initialBoxes.map(b => ({ id: b.id, prize: b.prize, icon: b.icon })))
    
    setBoxes(initialBoxes)
  }, [])

  useEffect(() => {
    if (boxes.length === 0) return
    
    canvasRefs.current.forEach((canvas, index) => {
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Obtener el tamaño real del canvas desde su parent
      const parent = canvas.parentElement
      if (!parent) return
      
      const rect = parent.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#FFD700')
      gradient.addColorStop(0.5, '#FFA500')
      gradient.addColorStop(1, '#FFD700')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.globalCompositeOperation = 'overlay'
      const shine = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      shine.addColorStop(0, 'rgba(255, 255, 255, 0.5)')
      shine.addColorStop(0.5, 'rgba(255, 255, 255, 0)')
      shine.addColorStop(1, 'rgba(255, 255, 255, 0.3)')
      ctx.fillStyle = shine
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'source-over'
    })
  }, [boxes])

  const handleScratch = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    const canvas = canvasRefs.current[index]
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    
    // Calcular coordenadas relativas al canvas
    const x = (clientX - rect.left) * (canvas.width / rect.width)
    const y = (clientY - rect.top) * (canvas.height / rect.height)

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 30, 0, Math.PI * 2)
    ctx.fill()

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    let transparent = 0
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++
    }
    const scratchedPercent = (transparent / (pixels.length / 4)) * 100

    setBoxes(prev => {
      const updated = prev.map(box => 
        box.id === index ? { ...box, scratched: scratchedPercent } : box
      )
      
      // Verificar si hay 3 cajas rascadas (>50%) con el mismo premio
      checkWinCondition(updated)
      
      return updated
    })
  }

  const checkWinCondition = (currentBoxes: ScratchBox[]) => {
    if (hasWonRef.current) return // Ya ganó
    
    // Filtrar cajas que están rascadas más del 50%
    const scratchedBoxes = currentBoxes.filter(box => box.scratched > 50)
    
    console.log('Cajas rascadas (>50%):', scratchedBoxes.length)
    console.log('Detalles:', scratchedBoxes.map(b => ({ id: b.id, prize: b.prize, scratched: b.scratched.toFixed(1) })))
    
    // Cuando el jugador raspe 3 cajas, gana automáticamente
    if (scratchedBoxes.length >= 3) {
      // Contar ocurrencias de cada premio
      const prizeCount: Record<string, number> = {}
      scratchedBoxes.forEach(box => {
        prizeCount[box.prize] = (prizeCount[box.prize] || 0) + 1
      })
      
      console.log('Conteo de premios:', prizeCount)
      
      // Encontrar el premio que más se repite (sabemos que hay al menos 3 iguales)
      let winnerPrize = ''
      let maxCount = 0
      for (const [prize, count] of Object.entries(prizeCount)) {
        if (count > maxCount) {
          maxCount = count
          winnerPrize = prize
        }
      }
      
      console.log('¡GANADOR! Premio:', winnerPrize)
      hasWonRef.current = true
      setWinningPrize(winnerPrize)
      setTimeout(() => {
        console.log('Mostrando modal...')
        setShowWinModal(true)
      }, 300)
    }
  }

  const handleClaimBonus = () => {
    window.open(ctaUrl, '_blank')
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: `
        repeating-linear-gradient(90deg, 
          ${colors.secondary} 0px, 
          #654321 2px, 
          ${colors.secondary} 4px, 
          #654321 6px
        ),
        radial-gradient(circle at 50% 50%, ${colors.accent} 0%, #4B0000 100%)
      `,
      backgroundSize: '6px 100%, 100%',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Casino Brand Logo - Perfect for iGaming Affiliates */}
      {logoUrl && (
        <div style={{
          textAlign: 'center',
          padding: '20px',
          background: 'linear-gradient(90deg, rgba(139, 90, 43, 0.8), rgba(101, 67, 33, 0.8))'
        }}>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(12px)',
            borderRadius: '1.5rem',
            padding: '1rem',
            border: '2px solid rgba(255,215,0,0.4)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '1rem',
              padding: '0.75rem',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={logoUrl} 
                alt={`${brandName} Casino Logo`}
                style={{
                  height: '4rem',
                  width: 'auto',
                  maxWidth: '15rem',
                  objectFit: 'contain',
                  margin: '0 auto',
                  display: 'block',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2)) brightness(1.1)'
                }}
              />
            </div>
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.25rem 1rem',
              background: 'rgba(255,215,0,0.2)',
              border: '1px solid rgba(255,215,0,0.3)',
              borderRadius: '9999px',
              backdropFilter: 'blur(4px)'
            }}>
              <span style={{
                color: '#FFD700',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.05em'
              }}>🎰 OFFICIAL PARTNER</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Header */}
      <div style={{
        width: '100%',
        padding: '20px 30px',
        background: `
          linear-gradient(90deg, rgba(139, 90, 43, 0.95), rgba(101, 67, 33, 0.95)),
          repeating-linear-gradient(90deg, 
            #8B5A2B 0px, 
            #654321 2px, 
            #8B5A2B 4px, 
            #654321 6px
          )
        `,
        backgroundSize: '100%, 6px 100%',
        boxShadow: `
          inset 0 4px 8px rgba(255, 255, 255, 0.1),
          inset 0 -4px 8px rgba(0, 0, 0, 0.3),
          0 10px 30px rgba(0, 0, 0, 0.5)
        `,
        borderBottom: '6px solid #4a3219',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 900,
          color: colors.primary,
          textTransform: 'uppercase',
          letterSpacing: '5px',
          textShadow: `
            0 2px 0 #654321,
            0 4px 0 #4a3219,
            0 6px 10px rgba(0, 0, 0, 0.8),
            0 0 40px rgba(255, 215, 0, 0.6)
          `,
          margin: 0
        }}>
          {headline}
        </h1>
      </div>

      {/* Scratch Cards Grid */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        gap: '30px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          maxWidth: '900px',
          width: '100%',
          margin: '0 auto'
        }}>
          {boxes.map((box, index) => (
            <div key={box.id} style={{
              aspectRatio: '1',
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: `
                0 10px 30px rgba(0, 0, 0, 0.6),
                inset 0 0 0 3px rgba(255, 215, 0, 0.3)
              `,
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at 50% 50%, ${colors.accent} 0%, #4B0000 100%)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '20px'
              }}>
                <div style={{ fontSize: '3rem' }}>{box.icon}</div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  color: '#FFD700',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
                  textAlign: 'center'
                }}>
                  {box.prize}
                </div>
              </div>
              
              <canvas
                ref={el => { canvasRefs.current[index] = el }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  touchAction: 'none'
                }}
                onMouseDown={() => setIsScratching(true)}
                onMouseUp={() => setIsScratching(false)}
                onMouseLeave={() => setIsScratching(false)}
                onMouseMove={(e) => isScratching && handleScratch(e, index)}
                onTouchStart={() => setIsScratching(true)}
                onTouchEnd={() => setIsScratching(false)}
                onTouchMove={(e) => handleScratch(e, index)}
              />
            </div>
          ))}
        </div>

        <div style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: colors.primary,
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ fontSize: '2rem' }}>🪙</span>
          Scratch to reveal your prizes!
        </div>
      </div>

      {/* Win Modal */}
      {showWinModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: `
              repeating-linear-gradient(90deg, 
                #8B5A2B 0px, 
                #654321 2px, 
                #8B5A2B 4px, 
                #654321 6px
              ),
              #5a3a1a
            `,
            backgroundSize: '6px 100%, 100%',
            border: '8px solid #3d2914',
            borderRadius: '15px',
            padding: '50px 40px',
            textAlign: 'center',
            maxWidth: '600px',
            width: '90%',
            boxShadow: `
              inset 0 0 0 3px #8B5A2B,
              inset 0 0 0 5px #654321,
              0 20px 60px rgba(0, 0, 0, 0.9)
            `,
            position: 'relative'
          }}>
            <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🎉</div>
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: 900,
              color: colors.primary,
              textTransform: 'uppercase',
              letterSpacing: '4px',
              margin: '0 0 15px 0',
              textShadow: `
                0 2px 0 #654321,
                0 4px 0 #4a3219,
                0 6px 10px rgba(0, 0, 0, 0.8)
              `
            }}>
              WINNER!
            </h2>
            <p style={{ fontSize: '1.3rem', color: 'white', marginBottom: '20px' }}>
              You matched 3 symbols!
            </p>
            
            <div style={{
              background: '#2d1810',
              border: '4px solid #654321',
              borderRadius: '10px',
              padding: '30px',
              margin: '30px 0',
              boxShadow: 'inset 0 0 0 2px #8B5A2B',
              textAlign: 'center'
            }}>
              <span style={{
                display: 'block',
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '20px',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                Your Prize:
              </span>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '20px'
              }}>
                {boxes.filter(b => b.prize === winningPrize && b.scratched > 50).slice(0, 3).map(box => (
                  <div key={box.id} style={{
                    fontSize: '3rem'
                  }}>
                    {box.icon}
                  </div>
                ))}
              </div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                color: colors.primary,
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                marginTop: '10px'
              }}>
                {winningPrize}
              </div>
            </div>
            
            <button
              onClick={handleClaimBonus}
              style={{
                width: '100%',
                background: colors.primary,
                color: '#2d1810',
                border: '4px solid #8B5A2B',
                borderRadius: '10px',
                padding: '20px 40px',
                fontSize: '1.5rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: 'inset 0 0 0 2px #ffd700',
                letterSpacing: '3px',
                fontFamily: 'Arial Black, sans-serif'
              }}
            >
              🎁 {cta}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export { renderTemplate } from './server'
