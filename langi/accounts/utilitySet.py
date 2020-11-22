def getLanguageCode(language):
    switcher = {
        'Deutsch': 'de',
        'česky': 'cs',
        'English': 'en',
        'español': 'es',
        'français': 'fr',
        'italiano': 'it',
        'Lietuviškai': 'lt',
        'Nederlands': 'nl',
        'polski': 'pl',
        'Português': 'pt',
        'Türkçe': 'tr',
        'Русский': 'ru',
        '繁體中文': 'zh-tw',
        '日本語': 'ja',
        '한국어': 'ko',
        'Ελληνικά': 'el'
    }
    return switcher.get(language, "Invalid language name")
