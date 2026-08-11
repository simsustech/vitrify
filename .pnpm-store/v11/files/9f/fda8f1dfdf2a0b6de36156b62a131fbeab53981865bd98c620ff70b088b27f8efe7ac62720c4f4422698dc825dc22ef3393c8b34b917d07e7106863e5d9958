import { computed } from 'vue'

export const useRatioProps = {
  ratio: [String, Number]
}

export default function useRatio(props, naturalRatio) {
  return computed(() => {
    const rawValue = props.ratio || naturalRatio?.value
    if (typeof rawValue === 'string' && rawValue.trim() === '') {
      return null
    }

    const ratio = Number(rawValue)
    return Number.isFinite(ratio) && ratio > 0
      ? { paddingBottom: `${100 / ratio}%` }
      : null
  })
}
