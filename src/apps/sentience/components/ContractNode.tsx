import { motion } from 'framer-motion'
import { Contract } from '../SentienceNetwork'

interface ContractNodeProps {
  contract: Contract
  isSelected: boolean
  onClick: () => void
}

export function ContractNode({ contract, isSelected, onClick }: ContractNodeProps) {
  const size = Math.sqrt(contract.sentienceScore) / 10 + 20
  const intensity = Math.min(contract.sentienceScore / 10000, 1)

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.2 }}
      onClick={onClick}
      className="absolute cursor-pointer"
      style={{
        left: contract.x,
        top: contract.y,
        width: size,
        height: size,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <motion.div
        animate={{
          boxShadow: isSelected
            ? [
                '0 0 20px rgba(255, 0, 255, 0.8)',
                '0 0 40px rgba(255, 0, 255, 1)',
                '0 0 20px rgba(255, 0, 255, 0.8)',
              ]
            : [
                '0 0 10px rgba(255, 0, 255, 0.5)',
                '0 0 20px rgba(255, 0, 255, 0.7)',
                '0 0 10px rgba(255, 0, 255, 0.5)',
              ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-full h-full rounded-full border-2 border-neon-purple"
        style={{
          background: `radial-gradient(circle, rgba(255, 0, 255, ${intensity}), rgba(255, 0, 255, ${intensity * 0.3}))`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white pointer-events-none">
        L{contract.level}
      </div>
    </motion.div>
  )
}

