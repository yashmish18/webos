import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'

// Use environment variable if available, otherwise default to DEVNET
const networkEnv = import.meta.env.VITE_APTOS_NETWORK?.toLowerCase() || 'devnet'
const networkMap: Record<string, Network> = {
  devnet: Network.DEVNET,
  testnet: Network.TESTNET,
  mainnet: Network.MAINNET,
}

const selectedNetwork = networkMap[networkEnv] || Network.DEVNET
const config = new AptosConfig({ network: selectedNetwork })
export const aptosClient = new Aptos(config)

console.log(`🌐 Connected to Aptos ${selectedNetwork} network`)

export const APTOS_OS_ADDRESS = '0x72429289f21708f0c5b8c69f9404e2973e725c6e5ab4611e66abd95a0d76e6f1'

// Move module addresses
export const MODULE_ADDRESSES = {
  DRIVE: `${APTOS_OS_ADDRESS}::drive`,
  FILE_NFT: `${APTOS_OS_ADDRESS}::file_nft`,
  ACL: `${APTOS_OS_ADDRESS}::acl`,
  APPS: `${APTOS_OS_ADDRESS}::apps`,
  SENTIENCE_CORE: `${APTOS_OS_ADDRESS}::sentience_core`,
  GOVERNANCE: `${APTOS_OS_ADDRESS}::governance`,
  CONTRACT_DAO: `${APTOS_OS_ADDRESS}::contract_dao`,
}

