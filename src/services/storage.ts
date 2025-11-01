// IPFS/Arweave storage integration
import { create } from 'ipfs-core'

let ipfs: any = null

export const initIPFS = async () => {
  if (!ipfs) {
    ipfs = await create({
      repo: 'aptos-files',
      config: {
        Addresses: {
          Swarm: [
            '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
            '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
          ],
        },
      },
    })
  }
  return ipfs
}

export const uploadToIPFS = async (content: Uint8Array | string): Promise<string> => {
  const ipfsInstance = await initIPFS()
  const contentBuffer = typeof content === 'string' 
    ? new TextEncoder().encode(content) 
    : content
  
  const { cid } = await ipfsInstance.add(contentBuffer)
  return cid.toString()
}

export const getFromIPFS = async (cid: string): Promise<Uint8Array> => {
  const ipfsInstance = await initIPFS()
  const chunks: Uint8Array[] = []
  
  for await (const chunk of ipfsInstance.cat(cid)) {
    chunks.push(chunk)
  }
  
  // Concatenate chunks without using Buffer (browser-compatible)
  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0)
  const result = new Uint8Array(totalLength)
  let offset = 0
  for (const chunk of chunks) {
    result.set(chunk, offset)
    offset += chunk.length
  }
  
  return result
}

// Arweave integration (placeholder - would need arweave SDK)
export const uploadToArweave = async (content: Uint8Array | string): Promise<string> => {
  // Implementation would use arweave SDK
  // For now, return a placeholder
  throw new Error('Arweave integration not yet implemented')
}

// Filecoin integration (placeholder)
export const uploadToFilecoin = async (content: Uint8Array | string): Promise<string> => {
  // Implementation would use Filecoin SDK
  throw new Error('Filecoin integration not yet implemented')
}

