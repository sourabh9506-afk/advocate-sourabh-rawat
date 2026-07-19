import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'Advocate Sourabh Rawat'
  const subtitle = searchParams.get('subtitle') || 'Criminal · Civil · Family Law'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#1B2A4A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          fontFamily: 'serif',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px', height: '48px',
            background: '#C9963A',
            borderRadius: '4px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#1B2A4A', fontSize: '20px', fontWeight: 700
          }}>SR</div>
          <span style={{ color: '#F5F0E8', fontSize: '18px', letterSpacing: '2px' }}>
            HIGH COURT · LUCKNOW
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            color: '#C9963A', fontSize: '16px',
            letterSpacing: '4px', textTransform: 'uppercase'
          }}>
            PRACTICING ADVOCATE · LUCKNOW
          </div>
          <div style={{
            color: '#F5F0E8', fontSize: '56px',
            fontWeight: 700, lineHeight: 1.1
          }}>
            {title}
          </div>
          <div style={{
            color: '#C9963A', fontSize: '24px',
            letterSpacing: '2px'
          }}>
            {subtitle}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(201,150,58,0.3)',
          paddingTop: '24px'
        }}>
          <span style={{ color: '#F5F0E8', opacity: 0.6, fontSize: '16px' }}>
            advocatelucknow.in
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Bar Council of UP', 'High Court Lucknow', 'BCI Compliant'].map(tag => (
              <span key={tag} style={{
                color: '#C9963A', fontSize: '13px',
                letterSpacing: '1px', opacity: 0.8
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
