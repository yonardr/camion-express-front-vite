import { onMounted, onUnmounted, watch } from 'vue'

export function useSeo(options) {
  const defaultOptions = {
    title: 'КамионЭкспресс — грузоперевозки по России',
    description: 'КамионЭкспресс — надёжные грузоперевозки по России. Расчёт стоимости онлайн, отслеживание груза в реальном времени.',
    keywords: 'грузоперевозки, транспортная компания, доставка грузов',
    ogImage: 'https://camion-express.ru/og-image.jpg',
    canonical: null
  }

  const config = { ...defaultOptions, ...options }

  const updateMeta = () => {
    document.title = config.title

    const updateMetaTag = (name, content, property = false) => {
      const attr = property ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attr}="${name}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attr, name)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    updateMetaTag('description', config.description)
    updateMetaTag('keywords', config.keywords)
    updateMetaTag('og:title', config.title, true)
    updateMetaTag('og:description', config.description, true)
    updateMetaTag('og:image', config.ogImage, true)
    updateMetaTag('twitter:title', config.title)
    updateMetaTag('twitter:description', config.description)
    updateMetaTag('twitter:image', config.ogImage)

    if (config.canonical) {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', config.canonical)
    }
  }

  onMounted(() => {
    updateMeta()
  })

  return { updateMeta }
}
