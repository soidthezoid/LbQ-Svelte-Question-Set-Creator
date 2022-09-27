module.exports = {
    content: ['./src/**/*.svelte'],
    theme: {
        screens: {
          'xsm': '320px',
          // => @media (min-width: 640px) { ... }

          'sm': '480px',
          // => @media (min-width: 640px) { ... }

          'md': '640px',
          // => @media (min-width: 768px) { ... }

          'lg': '768px',
          // => @media (min-width: 1024px) { ... }

          'xl': '960px',
          // => @media (min-width: 1024px) { ... }

          '2xl': '1024px',
          // => @media (min-width: 1280px) { ... }

          '3xl': '1280px',
          // => @media (min-width: 1536px) { ... }

          '4xl': '1536px',
          // => @media (min-width: 1536px) { ... }
        },
        extend: {
            backgroundImage: {
                'random': "url('/src/asset/random-icon.svg')",
                'nav': "url('/src/asset/nav-icon.svg')",
                'duplicate': "url('/src/asset/duplicate-icon.png')",
                'feedback': "url('/src/asset/feedback-icon.png')",
                'feedback-disabled': "url('/src/asset/feedback-icon-disabled.png')",
                'settings': "url('/src/asset/settings-icon.png')",
                'feedback-minimise': "url('/src/asset/supplement-minimise-icon.svg')",
                'preview': "url('/src/asset/preview-image-icon.svg')",
                'question-warn': "url('/src/asset/question-warn-icon.png')",
                'camera-img': "url('/src/asset/camera-img.png')",
                'answer-container-sorter': "url('/src/asset/sort-icon-selected.svg')",
                'creative-panel-level': "url('/src/asset/CreativePanel/cp-question-level-icon.svg')",
                'creative-panel-text-type': "url('/src/asset/CreativePanel/cp-question-text-icon.svg')",
                'creative-panel-numeric-type': "url('/src/asset/CreativePanel/cp-question-numeric-icon.svg')",
                'creative-panel-yesno-type': "url('/src/asset/CreativePanel/cp-question-yesno-icon.svg')",
                'creative-panel-truefalse-type': "url('/src/asset/CreativePanel/cp-question-truefalse-icon.svg')",
                'creative-panel-mc-type': "url('/src/asset/CreativePanel/cp-question-mc-icon.svg')",
                'creative-panel-sort-type': "url('/src/asset/CreativePanel/cp-question-sort-icon.svg')"
            }
        }
    },
    plugins: [ ]
}