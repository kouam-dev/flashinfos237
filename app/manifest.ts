import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Flash Infos 237',
    short_name: 'flashinfos237',
    description: "Découvrez les dernières actualités et articles de votre source d'information préférée",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icons/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}