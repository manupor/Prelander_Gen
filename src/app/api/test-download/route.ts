import { NextResponse } from 'next/server'
import JSZip from 'jszip'

export async function GET() {
  try {
    // Create a simple test ZIP
    const zip = new JSZip()
    zip.file('test.txt', 'This is a test file. If you can download this, the system works.')
    zip.file('index.html', '<html><body><h1>Test Success!</h1></body></html>')
    
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' })

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename=test.zip',
      },
    })
  } catch (error) {
    console.error('Test download error:', error)
    return NextResponse.json({ error: 'Test failed' }, { status: 500 })
  }
}
