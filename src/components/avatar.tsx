import { generateColorHSL } from '@/utils/color'
import { slate } from '@radix-ui/colors'

export const Avatar = ({ name, children }: { name: string; children: React.ReactNode }) => {
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: generateColorHSL(name),
        borderRadius: '2px',
        color: slate.slate1,
        minWidth: '48px',
        height: '100%',
        minHeight: '48px',
      }}
    >
      {children}
    </div>
  )
}
