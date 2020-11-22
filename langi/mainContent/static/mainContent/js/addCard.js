//Get all buttons which open or close add card window
const openAddCardButtons = document.querySelectorAll('[data-addcard-open]');
const closeAddCardButtons = document.querySelectorAll('[data-addcard-close]');

//Front keyboard
const keyboardFrontButton = document.querySelector("#keyboard-front-btn");
const keyboardFront = document.querySelector("#keyboard-front");
const keyboardFrontContainer = document.querySelector(".keyboard-buttons-container-front");

//Back keyboard
const keyboardBackButton = document.querySelector("#keyboard-back-btn");
const keyboardBack = document.querySelector("#keyboard-back");
const keyboardBackContainer = document.querySelector(".keyboard-buttons-container-back");

//Text fields (front & back)
var textFieldFront = document.querySelector(".flashcard-text-front");
var textFieldBack = document.querySelector(".flashcard-text-back");

//Selected languages (front & back)
const selectedLangFront = document.querySelector("#selected-front-lang");
const selectedLangBack = document.querySelector("#selected-back-lang");
var textLangFront = getSelectedText('selected-front-lang');
var textLangBack = getSelectedText('selected-back-lang');

//Buttons with sings (on the keyboards)
var signButtonsFront = document.querySelectorAll('.keyboard-sign-btn-front');
var signButtonsBack = document.querySelectorAll('.keyboard-sign-btn-back');

//Characters counter Max Value
const MAX_CHARS = 150;
var charactersNumberFront = 0;
var charactersNumberBack = 0;

//Characters counters
var wordCounterFront = document.getElementById('flashcard-text-wordCounter-front');
var wordCounterBack = document.getElementById('flashcard-text-wordCounter-back');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Example sentences
var exampleSentencesContainer = document.getElementById('example-sentences-container');
//Keyboards
//sentence 1
const keyboardSentenceButtonOne = document.querySelector("#keyboard-sentence-1-btn");
const keyboardSentenceOne = document.querySelector("#keyboard-sentence-1");
const keyboardSentenceOneContainer = document.querySelector(".keyboard-buttons-sentence-1-container");
//sentence 2
const keyboardSentenceButtonTwo = document.querySelector("#keyboard-sentence-2-btn");
const keyboardSentenceTwo = document.querySelector("#keyboard-sentence-2");
const keyboardSentenceTwoContainer = document.querySelector(".keyboard-buttons-sentence-2-container");
//sentence 3
const keyboardSentenceButtonThree = document.querySelector("#keyboard-sentence-3-btn");
const keyboardSentenceThree = document.querySelector("#keyboard-sentence-3");
const keyboardSentenceThreeContainer = document.querySelector(".keyboard-buttons-sentence-3-container");
//Buttons with sings (on the keyboards)
var signButtonsSentenceOne = document.querySelectorAll('.keyboard-sign-btn-sen-one');
var signButtonsSentenceTwo = document.querySelectorAll('.keyboard-sign-btn-sen-two');
var signButtonsSentenceThree = document.querySelectorAll('.keyboard-sign-btn-sen-three');
//Text fields
const textFieldOne = document.querySelector("#sentence-textarea-1");
const textFieldTwo = document.querySelector("#sentence-textarea-2");
const textFieldThree = document.querySelector("#sentence-textarea-3");
//Save image file 
var flashcardImage = null;
//Save audio file
var flashcardAudio = null;
//Remove image file
var removeExampleImgBtn = document.getElementById('remove-example-img');
//No deck error text
var noDeckErrorText = document.getElementById('add-card-no-deck-error');

//Distionary: language --> list of alphabet signs
var signsDictionary = {
    'Afrikaans': [],
    'Shqiptar': ['ç', 'Ç', 'ë', 'Ë'],
    'English': [],
    'Arabic': ['ظ', 'ز', 'و', 'ة', 'ى', 'لا', 'ر', 'ؤ', 'ء', 'ئ', 'ط', 'ك', 'م', 'ن', 'ت', 'ا', 'ل', 'ب', 'ي', 'س', 'ش', 'د', 'ج', 'ح', 'خ', 'ه', 'ع', 'غ', 'ف', 'ق', 'ث', 'ص', 'ض'],
    'Azeri': [],
    'Euskal': ['ñ', 'Ñ'],
    'বাংলা': [],
    'Беларуская': ['й', 'Й', 'ц', 'Ц', 'у', 'У', 'к', 'К', 'е', 'Е', 'н', 'Н', 'г', 'Г', 'ш', 'Ш', 'ў', 'Ў', 'з', 'З', 'х', 'Х', 'ф', 'Ф', 'ы', 'Ы', 'в', 'В', 'а', 'А', 'п', 'П', 'р', 'Р', 'о', 'О', 'л', 'Л', 'д', 'Д', 'ж', 'Ж', 'э', 'Э', 'я', 'Я', 'ч', 'Ч', 'с', 'С', 'м', 'М', 'і', 'І', 'т', 'Т', 'ь', 'Ь', 'б', 'Б', 'ю', 'Ю'],
    'Bosanski': ['š', 'Š', 'đ', 'Đ', 'ž', 'Ž', 'č', 'Č', 'ć', 'Ć'],
    'български': ['у', 'У', 'е', 'Е', 'и', 'И', 'ш', 'Ш', 'щ', 'Щ', 'к', 'К', 'с', 'С', 'д', 'Д', 'з', 'З', 'ц', 'Ц', 'ь', 'Ь', 'я', 'Я', 'а', 'А', 'о', 'О', 'ж', 'Ж', 'г', 'Г', 'т', 'Т', 'н', 'Н', 'в', 'В', 'м', 'М', 'ч', 'Ч', 'ю', 'Ю', 'й', 'Й', 'ъ', 'Ъ', 'э', 'Э', 'ф', 'Ф', 'х', 'Х', 'п', 'П', 'р', 'Р', 'л', 'Л', 'б', 'Б', 'ы', 'Ы'],
    '繁體中文': [],
    '简体中文': [],
    'Hrvatski': ['š', 'Š', 'đ', 'Đ', 'ž', 'Ž', 'č', 'Č', 'ć', 'Ć'],
    'Český': ['á', 'Á', 'č', 'Č', 'ď', 'Ď', 'é', 'É', 'ě', 'Ě', 'í', 'Í', 'ň', 'Ň', 'ó', 'Ó', 'ř', 'Ř', 'š', 'Š', 'ť', 'Ť', 'ú', 'Ú', 'ů', 'Ů', 'ý', 'Ý', 'ž', 'Ž'],
    'Dansk': ['æ', 'Æ', 'ø', 'Ø', 'å', 'Å'],
    'Esperanto': ['ĉ', 'Ĉ', 'ĝ', 'Ĝ', 'ĥ', 'Ĥ', 'ĵ', 'Ĵ', 'ŝ', 'Ŝ', 'ŭ', 'Ŭ'],
    'Eestlane': ['š', 'Š', 'ž', 'Ž', 'õ', 'Õ', 'ä', 'Ä', 'ö', 'Ö', 'ü', 'Ü'],
    'Pilipino': ['ñ', 'Ñ', 'ng', 'NG'],
    'Suomalainen': ['š', 'Š', 'ž', 'Ž', 'å', 'Å', 'ä', 'Ä', 'ö', 'Ö'],
    'Français': ['à', 'À', 'â', 'Â', 'ç', 'Ç', 'é', 'É', 'è', 'È', 'ê', 'Ê', 'ë', 'Ë', 'î', 'Î', 'ï', 'Ï', 'ô', 'Ô', 'û', 'Û', 'ù', 'Ù', 'ü', 'Ü', 'ÿ', 'Ÿ', 'æ', 'Æ', 'œ', 'Œ'],
    'Frysk': [],
    'Galego': [],
    'Ελληνική': ['α', 'Α', 'β', 'Β', 'γ', 'Γ', 'δ', 'Δ', 'ε', 'Ε', 'ζ', 'Ζ', 'η', 'Η', 'θ', 'Θ', 'ι', 'Ι', 'κ', 'Κ', 'λ', 'Λ', 'μ', 'Μ', 'ν', 'Ν', 'ξ', 'Ξ', 'ο', 'Ο', 'π', 'Π', 'ρ', 'Ρ', 'σ', 'Σ', 'τ', 'Τ', 'υ', 'Υ', 'φ', 'Φ', 'χ', 'Χ', 'ψ', 'Ψ', 'ω', 'Ω'],
    'ქართული': ['ა', 'ბ', 'გ', 'დ', 'ე', 'ვ', 'ზ', 'თ', 'ი', 'კ', 'ლ', 'მ', 'ნ', 'ო', 'პ', 'ჟ', 'რ', 'ს', 'ტ', 'უ', 'ფ', 'ქ', 'ღ', 'ყ', 'შ', 'ჩ', 'ც', 'ძ', 'წ', 'ჭ', 'ხ', 'ჯ', 'ჰ'],
    'ગુડારતી': [],
    'Hausa': [],
    'Ōlelo Hawaiʻi': [],
    'Hebrew': ['ת', 'ש', 'ר', 'ק', 'צץ', 'פף', 'ע', 'ס', 'נן', 'מם', 'ל', 'כך', 'י', 'ט', 'ח', 'ז', 'ו', 'ה', 'ד', 'ג', 'ב', 'א'],
    'हिन्दी': [],
    'Español': ['á', 'Á', 'é', 'É', 'í', 'Í', 'ó', 'Ó', 'ú', 'Ú', 'ü', 'Ü', 'ñ', 'Ñ', '¿', '¡'],
    'bahasa Indonesia': [],
    'Gaeilge': ['á', 'Á', 'é', 'É', 'í', 'Í', 'ó', 'Ó', 'ú', 'Ú'],
    'Íslensku': ['á', 'Á', 'ð', 'Ð', 'é', 'É', 'í', 'Í', 'ó', 'Ó', 'ú', 'Ú', 'ý', 'Ý', 'þ', 'Þ', 'æ', 'Æ', 'ö', 'Ö'],
    '日本語': [],
    'Basa jawa': [],
    'Yiddish': ['ת', 'ש', 'ר', 'ק', 'צ', 'ץ', 'פ', 'ע', 'נ', 'מ', 'ל', 'כ', 'י', 'ט', 'ח', 'ז', 'ו', 'ה', 'ד', 'ג', 'ב', 'א', 'תּ', 'שׂ', 'פּ', 'כֿ', 'בֿ', 'אָ', 'אַ', 'ץ', 'ף', 'ן', 'ם', 'ך', 'זש', 'ױ', 'װ', 'דזש', 'ײַ', 'ײ', 'טש'],
    'Yoruba': [],
    'ಕನ್ನಡ': [],
    'Català': ['ñ', 'Ñ', 'ç', 'Ç'],
    'Қазақ': ['А', 'а', 'Ә', 'ә', 'Б', 'б', 'В', 'в', 'Г', 'г', 'Ғ', 'ғ', 'Д', 'д', 'Е', 'е', 'Ё', 'ё',
        'Ж', 'ж', 'З', 'з', 'И', 'и', 'Й', 'й', 'К', 'к', 'Қ', 'қ', 'Л', 'л', 'М', 'м', 'Н', 'н',
        'Ң', 'ң', 'О', 'о', 'Ө', 'ө', 'П', 'п', 'Р', 'р', 'С', 'с', 'Т', 'т', 'У', 'у', 'Ұ', 'ұ',
        'Ү', 'ү', 'Ф', 'ф', 'Х', 'х', 'Һ', 'һ', 'Ц', 'ц', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ъ', 'ъ',
        'Ы', 'ы', 'І', 'і', 'Ь', 'ь', 'Э', 'э', 'Ю', 'ю', 'Я', 'я'],
    'ខ្មែរ': [],
    'Кыргызча': ['А', 'а', 'Б', 'б', 'В', 'в', 'Г', 'г', 'Д', 'д', 'Е', 'е', 'Ё', 'ё',
        'Ж', 'ж', 'З', 'з', 'И', 'и', 'Й', 'й', 'К', 'к', 'Л', 'л', 'М', 'м', 'Н', 'н',
        'Ң', 'ң', 'О', 'о', 'Ө', 'ө', 'П', 'п', 'Р', 'р', 'С', 'с', 'Т', 'т', 'У', 'у',
        'Ү', 'ү', 'Ф', 'ф', 'Х', 'х', 'Ц', 'ц', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ъ', 'ъ',
        'Ы', 'ы', 'Ь', 'ь', 'Э', 'э', 'Ю', 'ю', 'Я', 'я'],
    '한국어': ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'ㅏ', 'ㅑ', 'ㅐ', 'ㅒ', 'ㅓ', 'ㅕ', 'ㅔ', 'ㅖ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ'],
    'Corsu': [],
    'Kreyòl': [],
    'Kurdî': [],
    'ລາວ': [],
    'Lietuvių': ['ą', 'Ą', 'č', 'Č', 'ę', 'Ę', 'ė', 'Ė', 'į', 'Į', 'š', 'Š', 'ų', 'Ų', 'ū', 'Ū', 'ž', 'Ž'],
    'Lëtzebuergesch': ['ä', 'Ä', 'ë', 'Ë', 'é', 'É'],
    'Latine': [],
    'Latvietis': ['ā', 'Ā', 'č', 'Č', 'ē', 'Ē', 'ģ', 'Ģ', 'Ī', 'ī', 'ķ', 'Ķ', 'ļ', 'Ļ', 'ņ', 'Ņ', 'š', 'Š', 'ū', 'Ū', 'ž', 'Ž'],
    'Македонски': ['А', 'а', 'Б', 'б', 'В', 'в', 'Г', 'г', 'Д', 'д', 'Ѓ', 'ѓ', 'Е', 'е',
        'Ж', 'ж', 'З', 'з', 's', 'S', 'И', 'и', 'j', 'J', 'К', 'к', 'Л', 'л', 'љ', 'Љ', 'М', 'м', 'Н', 'н', 'њ', 'Њ',
        'О', 'о', 'П', 'п', 'Р', 'р', 'С', 'с', 'Т', 'т', 'ќ', 'Ќ', 'У', 'у',
        'Ф', 'ф', 'Х', 'х', 'Ц', 'ц', 'Ч', 'ч', 'џ', 'Џ', 'Ш', 'ш'],
    'മലയാളം': [],
    'Bahasa Melayu': [],
    'Malagasy': [],
    'Malti': [],
    'Maori': [],
    'मराठी': [],
    'Монгол': [],
    'नेपाली': [],
    'Nederlands': ['á', 'Á', 'é', 'É', 'ё', 'Ё', 'í', 'Í', 'ó', 'Ó', 'ú', 'Ú'],
    'Deutsch': ['ä', 'Ä', 'ö', 'Ö', 'ü', 'Ü', 'ß'],
    'Norsk': ['æ', 'Æ', 'ø', 'Ø', 'å', 'Å'],
    'հայերեն': ['ա', 'Ա', 'բ', 'Բ', 'գ', 'Գ', 'Դ', 'դ', 'Ե', 'ե', 'Զ', 'զ',
        'Է', 'է', 'ը', 'Ը', 'թ', 'Թ', 'ժ', 'Ժ', 'ի', 'Ի', 'լ', 'Լ', 'խ', 'Խ', 'ծ', 'Ծ', 'կ', 'Կ',
        'հ', 'Հ', 'Ձ', 'ձ', 'Ղ', 'ղ', 'Ճ', 'ճ', 'Մ', 'մ', 'Յ', 'յ', 'Ն', 'ն', 'Շ', 'շ', 'Ո', 'ո', 'Չ', 'չ', 'Պ', 'պ',
        'Ջ', 'ջ', 'Ռ', 'ռ', 'Ս', 'ս', 'Վ', 'վ', 'Տ', 'տ', 'Ր', 'ր', 'Ց', 'ց', 'Ւ', 'ւ', 'Փ', 'փ', 'Ք', 'ք', 'Օ', 'օ', 'Ֆ', 'ֆ'],
    'Persian': [],
    'Português': ['á', 'Á', 'à', 'À', 'â', 'Â', 'ã', 'Ã', 'ç', 'Ç', 'é', 'É', 'ê', 'Ê', 'í', 'Í', 'ó', 'Ó', 'ô', 'Ô', 'õ', 'Õ', 'ú', 'Ú', 'ü', 'Ü'],
    'Polski': ['ą', 'Ą', 'ć', 'Ć', 'ę', 'Ę', 'ł', 'Ł', 'ń', 'Ń', 'ó', 'Ó', 'ś', 'Ś', 'ż', 'Ż', 'ź', 'Ź'],
    'Русский': ['А', 'а', 'Б', 'б', 'В', 'в', 'Г', 'г', 'Д', 'д', 'Е', 'е', 'Ё', 'ё',
        'Ж', 'ж', 'З', 'з', 'И', 'и', 'Й', 'й', 'К', 'к', 'Л', 'л', 'М', 'м', 'Н', 'н',
        'О', 'о', 'П', 'п', 'Р', 'р', 'С', 'с', 'Т', 'т', 'У', 'у',
        'Ф', 'ф', 'Х', 'х', 'Ц', 'ц', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ъ', 'ъ',
        'Ы', 'ы', 'Ь', 'ь', 'Э', 'э', 'Ю', 'ю', 'Я', 'я'],
    'Română': ['ă', 'Ă', 'â', 'Â', 'î', 'Î', 'ș', 'Ș', 'ț', 'Ț'],
    'Sāmoa': ['ā', 'Ā', 'ē', 'Ē', 'ī', 'Ī', 'ō', 'Ō', 'ū', 'Ū'],
    'Српски': ['А', 'а', 'Б', 'б', 'В', 'в', 'Г', 'г', 'Д', 'д', 'Ђ', 'ђ', 'Е', 'е',
        'Ж', 'ж', 'З', 'з', 'И', 'и', 'j', 'J', 'К', 'к', 'Л', 'л', 'љ', 'Љ', 'М', 'м', 'Н', 'н',
        'Њ', 'њ', 'О', 'о', 'П', 'п', 'Р', 'р', 'С', 'с', 'Т', 'т', 'Ћ', 'ћ', 'У', 'у',
        'Ф', 'ф', 'Х', 'х', 'Ц', 'ц', 'Ч', 'ч', 'џ', 'Џ', 'Ш', 'ш'],
    'Shona': [],
    'Slovenský': ['á', 'Á', 'ä', 'Ä', 'č', 'Č', 'ď', 'Ď', 'dž', 'Dž', 'é', 'É', 'í', 'Í', 'ĺ', 'Ĺ', 'ľ', 'Ľ', 'ň', 'Ň', 'ó', 'Ó', 'ô', 'Ô', 'ŕ', 'Ŕ', 'š', 'Š', 'ť', 'Ť', 'ý', 'Ý', 'ž', 'Ž'],
    'Slovenščina': ['č', 'Č', 'š', 'Š', 'ž', 'Ž'],
    'Soomaali': [],
    'Kiswahili': [],
    'Urang Sunda': [],
    'Svenska': ['å', 'Å', 'ä', 'Ä', 'ö', 'Ö'],
    'Точик': ['А', 'а', 'Б', 'б', 'В', 'в', 'Г', 'г', 'Д', 'д', 'Е', 'е', 'Ё', 'ё',
        'Ж', 'ж', 'З', 'з', 'И', 'и', 'Й', 'й', 'К', 'к', 'Л', 'л', 'М', 'м', 'Н', 'н',
        'О', 'о', 'П', 'п', 'Р', 'р', 'С', 'с', 'Т', 'т', 'У', 'у',
        'Ф', 'ф', 'Х', 'х', 'Ч', 'ч', 'Ш', 'ш', 'Ъ', 'ъ',
        'Э', 'э', 'Ю', 'ю', 'Я', 'я', 'ғ', 'Ғ', 'ӣ', 'Ӣ', 'қ', 'Қ', 'ӯ', 'Ӯ', 'ҳ', 'Ҳ', 'ҷ', 'Ҷ'],
    'ไทย': [],
    'தமிழ்': [],
    'Татар': ['А', 'а', 'Ә', 'ә', 'Б', 'б', 'В', 'в', 'Г', 'г', 'Д', 'д', 'Е', 'е', 'Ё', 'ё',
        'Ж', 'ж', 'җ', 'Җ', 'З', 'з', 'И', 'и', 'Й', 'й', 'К', 'к', 'Л', 'л', 'М', 'м', 'Н', 'н', 'Ң', 'ң',
        'О', 'о', 'Ө', 'ө', 'П', 'п', 'Р', 'р', 'С', 'с', 'Т', 'т', 'У', 'у', 'Ү', 'ү',
        'Ф', 'ф', 'Х', 'х', 'һ', 'Һ', 'Ц', 'ц', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ъ', 'ъ', 'Ы', 'ы', 'Ь', 'ь',
        'Э', 'э', 'Ю', 'ю', 'Я', 'я'],
    'తెలుగు': [],
    'Türkçe': ['ç', 'Ç', 'ğ', 'Ğ', 'ı', 'I', 'ö', 'Ö', 'ş', 'Ş', 'ü', 'Ü'],
    'Türkmenler': [],
    'Українська': ['А', 'а', 'Б', 'б', 'В', 'в', 'Г', 'г', 'ґ', 'Ґ', 'Д', 'д', 'Е', 'е', 'є', 'Є',
        'Ж', 'ж', 'З', 'з', 'И', 'и', 'І', 'і', 'ї', 'Ї', 'Й', 'й', 'К', 'к', 'Л', 'л', 'М', 'м', 'Н', 'н',
        'О', 'о', 'Ө', 'ө', 'П', 'п', 'Р', 'р', 'С', 'с', 'Т', 'т', 'У', 'у',
        'Ф', 'ф', 'Х', 'х', 'Ц', 'ц', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ь', 'ь',
        'Ю', 'ю', 'Я', 'я'],
    'اردو': [],
    "O'zbek": [],
    'Cymraeg': [],
    'Magyar': [],
    'Tiếng Việt': ['ă', 'Ă', 'â', 'Â', 'đ', 'Đ', 'ê', 'Ê', 'ô', 'Ô', 'Ơ', 'ơ', 'ư', 'Ư'],
    'Italiano': [],
    'Zulu': [],
}

////////////////////////////////////////////////////////////////////////////////////////////////
//ADD CARD WINDOW HANDLE
///////////////////////////////////////////////////////////////////////////////////////////////
//Get overlay (displayed behind the popup windows)
//var overlay = document.getElementById('overlay');

//Open add card window
openAddCardButtons.forEach(button => {
    button.addEventListener('click', () => {
        const addCardWindow = document.querySelector(button.dataset.addcardOpen);
        openAddCardWindow(addCardWindow);
    })
})

function openAddCardWindow(addCardWindow) {
    if (addCardWindow == null) return

    //Set a proper language in select fields, based on the local storage variables
    textLangFront = localStorage.getItem('frontSelectedLang');
    textLangBack = localStorage.getItem('backSelectedLang');

    if (textLangFront === null || textLangFront === '') {
        textLangFront = "English";
    }
    if (textLangBack === null || textLangBack === '') {
        textLangBack = "English";
    }

    //set proper text direction
    if (textLangFront === "عربى" || textLangFront === "עברית" || textLangFront === "יידיש" || textLangFront === "فارسی") {
        textFieldFront.classList.add("rtl");
        wordCounterFront.classList.add("move-wordCounter-rtl-normal");
    }
    if (textLangBack === "عربى" || textLangBack === "עברית" || textLangBack === "יידיש" || textLangBack === "فارسی") {
        textFieldBack.classList.add("rtl");

        textFieldOne.classList.add("rtl");
        textFieldTwo.classList.add("rtl");
        textFieldThree.classList.add("rtl");

        wordCounterBack.classList.add("move-wordCounter-rtl-normal");
    }

    if (textLangFront === "한국어") {
        $("#flashcard-text-front-notkor").css("display", "none");
        $("#flashcard-text-front-kor").css("display", "block");
        textFieldFront = document.querySelector("#flashcard-text-front-kor");
        textFieldFront.value = '';

        document.getElementById("flashcard-btn-bold-front").disabled = true;
        document.getElementById("flashcard-btn-underline-front").disabled = true;
        document.getElementById("flashcard-btn-uppercase-front").disabled = true;
        document.getElementById("flashcard-btn-colorText-front").disabled = true;

        document.getElementById("flashcard-btn-bold-front").classList.add('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-underline-front").classList.add('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-uppercase-front").classList.add('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-colorText-front").classList.add('flashcard-btn-inactive');
    }
    else {
        $("#flashcard-text-front-notkor").css("display", "block");
        $("#flashcard-text-front-kor").css("display", "none");
        textFieldFront = document.querySelector("#flashcard-text-front-notkor");
        $('#flashcard-text-front-notkor').empty();

        document.getElementById("flashcard-btn-bold-front").disabled = false;
        document.getElementById("flashcard-btn-underline-front").disabled = false;
        document.getElementById("flashcard-btn-uppercase-front").disabled = false;
        document.getElementById("flashcard-btn-colorText-front").disabled = false;

        document.getElementById("flashcard-btn-bold-front").classList.remove('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-underline-front").classList.remove('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-uppercase-front").classList.remove('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-colorText-front").classList.remove('flashcard-btn-inactive');
    }

    if (textLangBack === "한국어") {
        $("#flashcard-text-back-notkor").css("display", "none");
        $("#flashcard-text-back-kor").css("display", "block");
        textFieldBack = document.querySelector("#flashcard-text-back-kor");
        textFieldBack.value = '';

        document.getElementById("flashcard-btn-bold-back").disabled = true;
        document.getElementById("flashcard-btn-underline-back").disabled = true;
        document.getElementById("flashcard-btn-uppercase-back").disabled = true;
        document.getElementById("flashcard-btn-colorText-back").disabled = true;

        document.getElementById("flashcard-btn-bold-back").classList.add('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-underline-back").classList.add('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-uppercase-back").classList.add('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-colorText-back").classList.add('flashcard-btn-inactive');
    }
    else {
        $("#flashcard-text-back-notkor").css("display", "block");
        $("#flashcard-text-back-kor").css("display", "none");
        textFieldBack = document.querySelector("#flashcard-text-back-notkor");
        $('#flashcard-text-back-notkor').empty();

        document.getElementById("flashcard-btn-bold-back").disabled = false;
        document.getElementById("flashcard-btn-underline-back").disabled = false;
        document.getElementById("flashcard-btn-uppercase-back").disabled = false;
        document.getElementById("flashcard-btn-colorText-back").disabled = false;

        document.getElementById("flashcard-btn-bold-back").classList.remove('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-underline-back").classList.remove('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-uppercase-back").classList.remove('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-colorText-back").classList.remove('flashcard-btn-inactive');
    }

    selectElement('selected-front-lang', textLangFront);
    selectElement('selected-back-lang', textLangBack);

    //image file drop zone handle
    var dropZoneElement = document.querySelector(".drop-zone");
    if (dropZoneElement.querySelector(".drop-zone__thumb")) {
        dropZoneElement.querySelector(".drop-zone__thumb").remove();
        var prompt = document.createElement("div");
        prompt.classList.add("drop-zone__prompt");
        prompt.innerHTML = promptText;
        dropZoneElement.appendChild(prompt);
    }
    if (flashcardImage != null)
        flashcardImage = null;

    noDeckErrorText.setAttribute("style", "display:none");
    addCardWindow.classList.add('add-card-active');
    //overlay.classList.add('overlay-active');
}

function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}

//Close add card window
closeAddCardButtons.forEach(button => {
    button.addEventListener('click', () => {
        const addCardWindow = button.closest('.add-card-window')
        closeAddCardWindow(addCardWindow);
    })
})

function closeAddCardWindow(addCardWindow) {
    if (addCardWindow == null) return

    addCardWindow.classList.remove('add-card-active');

    //Clear textarea fields 
    if (textLangFront === "한국어") {
        textFieldFront.value = '';
        setScrollBar('#flashcard-text-front-kor', wordCounterFront, "move-wordCounter-rtl");
        setScrollBar('#flashcard-text-front-kor', wordCounterFront, "move-wordCounter");
    }
    else {
        $('#flashcard-text-front-notkor').empty();
        setScrollBar('#flashcard-text-front-notkor', wordCounterFront, "move-wordCounter-rtl");
        setScrollBar('#flashcard-text-front-notkor', wordCounterFront, "move-wordCounter");
    }


    if (textLangBack === "한국어") {
        textFieldBack.value = '';
        setScrollBar('#flashcard-text-back-kor', wordCounterBack, "move-wordCounter-rtl");
        setScrollBar('#flashcard-text-back-kor', wordCounterBack, "move-wordCounter");
    }
    else {
        $('#flashcard-text-back-notkor').empty();
        setScrollBar('#flashcard-text-back-notkor', wordCounterBack, "move-wordCounter-rtl");
        setScrollBar('#flashcard-text-back-notkor', wordCounterBack, "move-wordCounter");
    }

    textFieldOne.value = '';
    textFieldTwo.value = '';
    textFieldThree.value = '';

    //Clear character counters
    $('#flashcard-text-wordCounter-front').text('0/150');
    $('#flashcard-text-wordCounter-back').text('0/150');

    //Clear korean mode variables
    //front
    koreanCodeLists.length = 0;
    koreanSymbolsToDisplay.length = 0;
    koreanWritingState = 0;
    textAreaFrontLength = 0;
    //back
    koreanCodeListsBack.length = 0;
    koreanSymbolsToDisplayBack.length = 0;
    koreanWritingStateBack = 0;
    textAreaBackLength = 0;

    //Clear character counters
    charactersNumberFront = 0;
    charactersNumberBack = 0;

    //Clear keyboards and close them
    while (keyboardFrontContainer.lastElementChild) {
        keyboardFrontContainer.removeChild(keyboardFrontContainer.lastElementChild);
    }
    keyboardFront.style.animation = `keyboardFadeIn 0.5s ease forwards`;
    frontKeyboardOpen = false;
    keyboardFront.classList.add('hidden');

    while (keyboardBackContainer.lastElementChild) {
        keyboardBackContainer.removeChild(keyboardBackContainer.lastElementChild);
    }
    keyboardBack.style.animation = `keyboardFadeIn 0.5s ease forwards`;
    backKeyboardOpen = false;
    keyboardBack.classList.add('hidden');

    //3 sentence textarea's
    while (keyboardSentenceOneContainer.lastElementChild) {
        keyboardSentenceOneContainer.removeChild(keyboardSentenceOneContainer.lastElementChild);
    }
    keyboardSentenceOne.style.animation = `keyboardSentenceFadeIn 0.5s ease forwards`;
    sentenceOneKeyboardOpen = false;
    keyboardSentenceOne.classList.add('hidden');

    while (keyboardSentenceTwoContainer.lastElementChild) {
        keyboardSentenceTwoContainer.removeChild(keyboardSentenceTwoContainer.lastElementChild);
    }
    keyboardSentenceTwo.style.animation = `keyboardSentenceFadeIn 0.5s ease forwards`;
    sentenceTwoKeyboardOpen = false;
    keyboardSentenceTwo.classList.add('hidden');

    while (keyboardSentenceThreeContainer.lastElementChild) {
        keyboardSentenceThreeContainer.removeChild(keyboardSentenceThreeContainer.lastElementChild);
    }
    keyboardSentenceThree.style.animation = `keyboardSentenceFadeIn 0.5s ease forwards`;
    sentenceThreeKeyboardOpen = false;
    keyboardSentenceThree.classList.add('hidden');


    //overlay.classList.remove('overlay-active');
}

///////////////////////////////////////////////////////////////////////////////////////////////
//TEXTAREAS SERVICE
//////////////////////////////////////////////////////////////////////////////////////////////

//insert text in right cursor place
/////////////////////////////////////
function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //Firefox and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
    } else {
        myField.value += myValue;
    }
}

function InsertAtCaret(myField, myValue) {
    myField.focus();
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = myValue;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(myValue);
    }
}

//Get a proper language from a select list
/////////////////////////////////////
function getSelectedText(elementId) {
    var elt = document.getElementById(elementId);

    if (elt.selectedIndex == -1)
        return null;

    return elt.options[elt.selectedIndex].text;
}

//FRONT service code
var frontKeyboardOpen = false;
keyboardFrontButton.addEventListener("click", () => {
    if (!frontKeyboardOpen) {
        //Remove all buttons at the beginning
        while (keyboardFrontContainer.lastElementChild) {
            keyboardFrontContainer.removeChild(keyboardFrontContainer.lastElementChild);
        }

        //Get a proper set of selected language symbols
        var signs;
        if (textLangFront === "عربى") {
            signs = signsDictionary['Arabic'];
        }
        else if (textLangFront === "עברית") {
            signs = signsDictionary['Hebrew'];
        }
        else if (textLangFront === "יידיש") {
            signs = signsDictionary['Yiddish'];
        }
        else if (textLangFront === "فارسی") {
            signs = signsDictionary['Persian'];
        }
        else {
            signs = signsDictionary[textLangFront];
        }

        signs.forEach(function (element) {
            var btn = document.createElement('button');
            btn.classList.add("keyboard-sign-btn-front");
            btn.textContent = element;
            keyboardFrontContainer.appendChild(btn);
        });

        signButtonsFront = document.querySelectorAll('.keyboard-sign-btn-front');
        addEventsToBtns(signButtonsFront);

        keyboardFront.classList.remove('hidden');
        keyboardFront.style.animation = `keyboardFadeOut 0.5s ease forwards`;
    }
    else {
        keyboardFront.style.animation = `keyboardFadeIn 0.5s ease forwards`;
        setTimeout(function () { keyboardFront.classList.add('hidden') }, 500);
    }

    frontKeyboardOpen = !frontKeyboardOpen;
});

//BACK service code
var backKeyboardOpen = false;
keyboardBackButton.addEventListener("click", () => {
    if (!backKeyboardOpen) {
        //Remove all buttons at the beginning
        while (keyboardBackContainer.lastElementChild) {
            keyboardBackContainer.removeChild(keyboardBackContainer.lastElementChild);
        }

        //Get a proper set of selected language symbols
        var signs;
        if (textLangBack === "عربى") {
            signs = signsDictionary['Arabic'];
        }
        else if (textLangBack === "עברית") {
            signs = signsDictionary['Hebrew'];
        }
        else if (textLangBack === "יידיש") {
            signs = signsDictionary['Yiddish'];
        }
        else if (textLangBack === "فارسی") {
            signs = signsDictionary['Persian'];
        }
        else {
            signs = signsDictionary[textLangBack];
        }

        signs.forEach(function (element) {
            var btn = document.createElement('button');
            btn.classList.add("keyboard-sign-btn-back");
            btn.textContent = element;
            keyboardBackContainer.appendChild(btn);
        });

        signButtonsBack = document.querySelectorAll('.keyboard-sign-btn-back');
        addEventsToBtns(signButtonsBack);

        keyboardBack.classList.remove('hidden');
        keyboardBack.style.animation = `keyboardFadeOut 0.5s ease forwards`;
    }
    else {
        keyboardBack.style.animation = `keyboardFadeIn 0.5s ease forwards`;
        setTimeout(function () { keyboardBack.classList.add('hidden') }, 500);
    }

    backKeyboardOpen = !backKeyboardOpen;
});

//Buttons events
function addEventsToBtns(signButtons) {
    signButtons.forEach(button => {
        button.addEventListener('click', () => {
            var closestKeyboardId = button.closest(".keyboard-container").id;
            //put text from clicked button (some sign) into a proper text field
            if (closestKeyboardId.includes("front")) {
                if (getSelectedText('selected-front-lang') === "한국어") {
                    HandleAllCasesFront(button);
                }
                else {
                    InsertAtCaret(textFieldFront, button.textContent);

                    var textHtml = $('#flashcard-text-front-notkor').html();

                    var divs = Array.from(document.querySelectorAll('#flashcard-text-front-notkor div'));
                    var textHtml2 = textHtml.replace(/(<([^>]+)>)/ig, "")
                    var textHtml3 = textHtml2.replace(/&nbsp;/g, ' ');

                    var newlines = 0;
                    if (divs.length > 0) {
                        newlines = divs.length - 1
                    }

                    charactersNumberFront = textHtml3.length + newlines;
                    //insertAtCursor(textFieldFront, button.textContent);
                }

                maxCharactersNumber('front');
            }
            else if (closestKeyboardId.includes("back")) {
                if (getSelectedText('selected-back-lang') === "한국어") {
                    HandleAllCasesBack(button);
                }
                else {
                    InsertAtCaret(textFieldBack, button.textContent);

                    var textHtml = $('#flashcard-text-back-notkor').html();

                    var divs = Array.from(document.querySelectorAll('#flashcard-text-back-notkor div'));
                    var textHtml2 = textHtml.replace(/(<([^>]+)>)/ig, "")
                    var textHtml3 = textHtml2.replace(/&nbsp;/g, ' ');

                    var newlines = 0;
                    if (divs.length > 0) {
                        newlines = divs.length - 1
                    }

                    charactersNumberBack = textHtml3.length + newlines;
                    //insertAtCursor(textFieldBack, button.textContent);
                }

                maxCharactersNumber('back');
            }
        })
    })
}

//KEYBOARD SENTENCE 1
var sentenceOneKeyboardOpen = false;
keyboardSentenceButtonOne.addEventListener("click", () => {
    if (!sentenceOneKeyboardOpen) {
        //Remove all buttons at the beginning
        while (keyboardSentenceOneContainer.lastElementChild) {
            keyboardSentenceOneContainer.removeChild(keyboardSentenceOneContainer.lastElementChild);
        }

        //Get a proper set of selected language symbols
        var signs;
        if (textLangBack === "عربى") {
            signs = signsDictionary['Arabic'];
        }
        else if (textLangBack === "עברית") {
            signs = signsDictionary['Hebrew'];
        }
        else if (textLangBack === "יידיש") {
            signs = signsDictionary['Yiddish'];
        }
        else if (textLangBack === "فارسی") {
            signs = signsDictionary['Persian'];
        }
        else {
            signs = signsDictionary[textLangBack];
        }

        signs.forEach(function (element) {
            var btn = document.createElement('button');
            btn.classList.add("keyboard-sign-btn-sen-one");
            btn.textContent = element;
            keyboardSentenceOneContainer.appendChild(btn);
        });

        signButtonsSentenceOne = document.querySelectorAll('.keyboard-sign-btn-sen-one');
        addEventsToSentenceBtns(signButtonsSentenceOne, textFieldOne);

        keyboardSentenceOne.classList.remove('hidden');
        keyboardSentenceOne.style.animation = `keyboardSentenceFadeOut 0.5s ease forwards`;
    }
    else {
        keyboardSentenceOne.style.animation = `keyboardSentenceFadeIn 0.5s ease forwards`;
        setTimeout(function () { keyboardSentenceOne.classList.add('hidden') }, 500);
    }

    sentenceOneKeyboardOpen = !sentenceOneKeyboardOpen;
});

//KEYBOARD SENTENCE 2
var sentenceTwoKeyboardOpen = false;
keyboardSentenceButtonTwo.addEventListener("click", () => {
    if (!sentenceTwoKeyboardOpen) {
        //Remove all buttons at the beginning
        while (keyboardSentenceTwoContainer.lastElementChild) {
            keyboardSentenceTwoContainer.removeChild(keyboardSentenceTwoContainer.lastElementChild);
        }

        //Get a proper set of selected language symbols
        var signs;
        if (textLangBack === "عربى") {
            signs = signsDictionary['Arabic'];
        }
        else if (textLangBack === "עברית") {
            signs = signsDictionary['Hebrew'];
        }
        else if (textLangBack === "יידיש") {
            signs = signsDictionary['Yiddish'];
        }
        else if (textLangBack === "فارسی") {
            signs = signsDictionary['Persian'];
        }
        else {
            signs = signsDictionary[textLangBack];
        }

        signs.forEach(function (element) {
            var btn = document.createElement('button');
            btn.classList.add("keyboard-sign-btn-sen-two");
            btn.textContent = element;
            keyboardSentenceTwoContainer.appendChild(btn);
        });

        signButtonsSentenceTwo = document.querySelectorAll('.keyboard-sign-btn-sen-two');
        addEventsToSentenceBtns(signButtonsSentenceTwo, textFieldTwo);

        keyboardSentenceTwo.classList.remove('hidden');
        keyboardSentenceTwo.style.animation = `keyboardSentenceFadeOut 0.5s ease forwards`;
    }
    else {
        keyboardSentenceTwo.style.animation = `keyboardSentenceFadeIn 0.5s ease forwards`;
        setTimeout(function () { keyboardSentenceTwo.classList.add('hidden') }, 500);
    }

    sentenceTwoKeyboardOpen = !sentenceTwoKeyboardOpen;
});

//KEYBOARD SENTENCE 2
var sentenceThreeKeyboardOpen = false;
keyboardSentenceButtonThree.addEventListener("click", () => {
    if (!sentenceThreeKeyboardOpen) {
        //Remove all buttons at the beginning
        while (keyboardSentenceThreeContainer.lastElementChild) {
            keyboardSentenceThreeContainer.removeChild(keyboardSentenceThreeContainer.lastElementChild);
        }

        //Get a proper set of selected language symbols
        var signs;
        if (textLangBack === "عربى") {
            signs = signsDictionary['Arabic'];
        }
        else if (textLangBack === "עברית") {
            signs = signsDictionary['Hebrew'];
        }
        else if (textLangBack === "יידיש") {
            signs = signsDictionary['Yiddish'];
        }
        else if (textLangBack === "فارسی") {
            signs = signsDictionary['Persian'];
        }
        else {
            signs = signsDictionary[textLangBack];
        }

        signs.forEach(function (element) {
            var btn = document.createElement('button');
            btn.classList.add("keyboard-sign-btn-sen-three");
            btn.textContent = element;
            keyboardSentenceThreeContainer.appendChild(btn);
        });

        signButtonsSentenceThree = document.querySelectorAll('.keyboard-sign-btn-sen-three');
        addEventsToSentenceBtns(signButtonsSentenceThree, textFieldThree);

        keyboardSentenceThree.classList.remove('hidden');
        keyboardSentenceThree.style.animation = `keyboardSentenceFadeOut 0.5s ease forwards`;
    }
    else {
        keyboardSentenceThree.style.animation = `keyboardSentenceFadeIn 0.5s ease forwards`;
        setTimeout(function () { keyboardSentenceThree.classList.add('hidden') }, 500);
    }

    sentenceThreeKeyboardOpen = !sentenceThreeKeyboardOpen;
});

//Buttons sentence events
function addEventsToSentenceBtns(signButtons, textField) {
    signButtons.forEach(button => {
        button.addEventListener('click', () => {
            insertAtCursor(textField, button.textContent);
        })
    })
}

/////////////////////////////////////////////////////////////////////////////////////////////////
//KOREAN WRITING SYSTEM
////////////////////////////////////////////////////////////////////////////////////////////////
jamoSymbols = {
    'ㄱ': '&#4352;',
    'ㄲ': '&#4353;',
    'ㄴ': '&#4354;',
    'ㄷ': '&#4355;',
    'ㄸ': '&#4356;',
    'ㄹ': '&#4357;',
    'ㅁ': '&#4358;',
    'ㅂ': '&#4359;',
    'ㅃ': '&#4360;',
    'ㅅ': '&#4361;',
    'ㅆ': '&#4362;',
    'ㅇ': '&#4363;',
    'ㅈ': '&#4364;',
    'ㅉ': '&#4365;',
    'ㅊ': '&#4366;',
    'ㅋ': '&#4367;',
    'ㅌ': '&#4368;',
    'ㅍ': '&#4369;',
    'ㅎ': '&#4370;',
    'ㅏ': '&#4449;',
    'ㅐ': '&#4450;',
    'ㅑ': '&#4451;',
    'ㅒ': '&#4452;',
    'ㅓ': '&#4453;',
    'ㅔ': '&#4454;',
    'ㅕ': '&#4455;',
    'ㅖ': '&#4456;',
    'ㅗ': '&#4457;',
    'ㅘ': '&#4458;',
    'ㅙ': '&#4459;',
    'ㅚ': '&#4460;',
    'ㅛ': '&#4461;',
    'ㅜ': '&#4462;',
    'ㅝ': '&#4463;',
    'ㅞ': '&#4464;',
    'ㅟ': '&#4465;',
    'ㅠ': '&#4466;',
    'ㅡ': '&#4467;',
    'ㅢ': '&#4468;',
    'ㅣ': '&#4469;',
}

leadDict = {
    'ㄱ': 1,
    'ㄲ': 2,
    'ㄴ': 3,
    'ㄷ': 4,
    'ㄸ': 5,
    'ㄹ': 6,
    'ㅁ': 7,
    'ㅂ': 8,
    'ㅃ': 9,
    'ㅅ': 10,
    'ㅆ': 11,
    'ㅇ': 12,
    'ㅈ': 13,
    'ㅉ': 14,
    'ㅊ': 15,
    'ㅋ': 16,
    'ㅌ': 17,
    'ㅍ': 18,
    'ㅎ': 19,
}

middleDict = {
    'ㅏ': 1,
    'ㅐ': 2,
    'ㅑ': 3,
    'ㅒ': 4,
    'ㅓ': 5,
    'ㅔ': 6,
    'ㅕ': 7,
    'ㅖ': 8,
    'ㅗ': 9,
    'ㅘ': 10,
    'ㅙ': 11,
    'ㅚ': 12,
    'ㅛ': 13,
    'ㅜ': 14,
    'ㅝ': 15,
    'ㅞ': 16,
    'ㅟ': 17,
    'ㅠ': 18,
    'ㅡ': 19,
    'ㅢ': 20,
    'ㅣ': 21,
}

tailDict = {
    'ㄱ': 1,
    'ㄲ': 2,
    'ㄱㅅ': 3,
    'ㄴ': 4,
    'ㄴㅈ': 5,
    'ㄴㅎ': 6,
    'ㄷ': 7,
    'ㄹ': 8,
    'ㄹㄱ': 9,
    'ㄹㅁ': 10,
    'ㄹㅂ': 11,
    'ㄹㅅ': 12,
    'ㄹㅌ': 13,
    'ㄹㅍ': 14,
    'ㄹㅎ': 15,
    'ㅁ': 16,
    'ㅂ': 17,
    'ㅂㅅ': 18,
    'ㅅ': 19,
    'ㅆ': 20,
    'ㅇ': 21,
    'ㅈ': 22,
    'ㅊ': 23,
    'ㅋ': 24,
    'ㅌ': 25,
    'ㅍ': 26,
    'ㅎ': 27,
}

//FRONT TEXTAREA VARIABLES
var textAreaFrontLength = 0;
var koreanWritingState = 0;
var koreanSymbolsToDisplay = [];
var koreanCodeLists = [];
//BACK TEXTAREA VARIABLES
var textAreaBackLength = 0;
var koreanWritingStateBack = 0;
var koreanSymbolsToDisplayBack = [];
var koreanCodeListsBack = [];

//HANDLE ALL CASES FRONT
function HandleAllCasesFront(button) {
    //get cursor position
    var caretPosition = getCaretPosition(textFieldFront).end;
    var previousCaretPosition = caretPosition - 1;
    if (caretPosition == 0) previousCaretPosition = 0;

    //ALL POSSIBLE CASES
    if (((button.textContent in leadDict) && koreanWritingState === 0)
        || ((button.textContent in leadDict) && koreanWritingState === 1)
        || ((button.textContent in leadDict) && !(button.textContent in tailDict) && koreanWritingState === 2)
        || ((button.textContent in leadDict) && !(button.textContent in tailDict) && koreanWritingState === 3)
        || ((button.textContent in leadDict) && koreanWritingState === 4)
        || ((button.textContent in tailDict) && !((Object.keys(tailDict).find(key => tailDict[key] == koreanCodeLists[previousCaretPosition][2]) + button.textContent) in tailDict) && koreanWritingState === 3)) {

        //change writing state
        koreanWritingState = 1;

        //add to both list (display decimal string and symbol's number)
        koreanSymbolsToDisplay.splice(caretPosition, 0, jamoSymbols[button.textContent]);
        koreanCodeLists.push([leadDict[button.textContent]]);
        //if number of symbols in textarea is multiplicity of 20 - then go to the new line
        if (koreanSymbolsToDisplay.length % 20 === 0) {
            koreanSymbolsToDisplay.splice(caretPosition + 1, 0, '\r\n');
            koreanCodeLists.push([-1, -1, -1]);
            caretPosition = caretPosition + 1;
        }

        //display in the textarea
        let symbols = document.createElement('div');
        koreanSymbolsToDisplay.forEach(function (symbol) {
            symbols.innerHTML += symbol;
        });

        textFieldFront.value = symbols.innerHTML;

        //save number of signs in textarea
        textAreaFrontLength = textFieldFront.value.length;
        //set caret on a proper position;
        textFieldFront.selectionEnd = caretPosition + 1;
    }
    else if (((button.textContent in middleDict) && koreanWritingState === 0)
        || ((button.textContent in middleDict) && koreanWritingState === 2)
        || ((button.textContent in middleDict) && koreanWritingState === 3)
        || ((button.textContent in middleDict) && koreanWritingState === 4)) {
        //change writing state
        koreanWritingState = 0;

        //add to both list (display decimal string and symbol's number)
        koreanSymbolsToDisplay.splice(caretPosition, 0, jamoSymbols[button.textContent]);
        koreanCodeLists.push([middleDict[button.textContent]]);
        //if number of symbols in textarea is multiplicity of 20 - then go to the new line
        if (koreanSymbolsToDisplay.length % 20 === 0) {
            koreanSymbolsToDisplay.splice(caretPosition + 1, 0, '\r\n');
            koreanCodeLists.push([-1, -1, -1]);
            caretPosition = caretPosition + 1;
        }

        //display in the textarea
        let symbols = document.createElement('div');
        koreanSymbolsToDisplay.forEach(function (symbol) {
            symbols.innerHTML += symbol;
        });
        textFieldFront.value = symbols.innerHTML;

        //save number of signs in textarea
        textAreaFrontLength = textFieldFront.value.length;
        //set caret on a proper position;
        textFieldFront.selectionEnd = caretPosition + 1;
    }
    else if ((button.textContent in middleDict) && koreanWritingState === 1) {
        if (koreanCodeLists[previousCaretPosition][0] === -1) {
            //change writing state
            koreanWritingState = 0;

            //add to both list (display decimal string and symbol's number)
            koreanSymbolsToDisplay.splice(caretPosition, 0, jamoSymbols[button.textContent]);
            koreanCodeLists.push([middleDict[button.textContent]]);
            //if number of symbols in textarea is multiplicity of 20 - then go to the new line
            if (koreanSymbolsToDisplay.length % 20 === 0) {
                koreanSymbolsToDisplay.splice(caretPosition + 1, 0, '\r\n');
                koreanCodeLists.push([-1, -1, -1]);
                caretPosition = caretPosition + 1;
            }

            //display in the textarea
            let symbols = document.createElement('div');
            koreanSymbolsToDisplay.forEach(function (symbol) {
                symbols.innerHTML += symbol;
            });
            textFieldFront.value = symbols.innerHTML;

            //save number of signs in textarea
            textAreaFrontLength = textFieldFront.value.length;
            //set caret on a proper position;
            textFieldFront.selectionEnd = caretPosition + 1;
        }
        else {
            //change writing state
            koreanWritingState = 2;

            //designate a new symbol (combined one) - after add middle to the lead
            koreanCodeLists[caretPosition - 1].push(middleDict[button.textContent]);
            var number = 0 + (koreanCodeLists[caretPosition - 1][1] - 1) * 28 + (koreanCodeLists[caretPosition - 1][0] - 1) * 588 + 44032;
            newSymbol = "&#" + number.toString() + ";";

            koreanSymbolsToDisplay[caretPosition - 1] = newSymbol;

            //display in the textarea
            let symbols = document.createElement('div');
            koreanSymbolsToDisplay.forEach(function (symbol) {
                symbols.innerHTML += symbol;
            });
            textFieldFront.value = symbols.innerHTML;

            //save number of signs in textarea
            textAreaFrontLength = textFieldFront.value.length;
            //set caret on a proper position;
            textFieldFront.selectionEnd = caretPosition;
        }
    }
    else if ((button.textContent in tailDict) && koreanWritingState === 2) {
        if (koreanCodeLists[previousCaretPosition][0] === -1) {
            //change writing state
            koreanWritingState = 1;

            //add to both list (display decimal string and symbol's number)
            koreanSymbolsToDisplay.splice(caretPosition, 0, jamoSymbols[button.textContent]);
            koreanCodeLists.push([tailDict[button.textContent]]);
            //if number of symbols in textarea is multiplicity of 20 - then go to the new line
            if (koreanSymbolsToDisplay.length % 20 === 0) {
                koreanSymbolsToDisplay.splice(caretPosition + 1, 0, '\r\n');
                koreanCodeLists.push([-1, -1, -1]);
                caretPosition = caretPosition + 1;
            }

            //display in the textarea
            let symbols = document.createElement('div');
            koreanSymbolsToDisplay.forEach(function (symbol) {
                symbols.innerHTML += symbol;
            });
            textFieldFront.value = symbols.innerHTML;

            //save number of signs in textarea
            textAreaFrontLength = textFieldFront.value.length;
            //set caret on a proper position;
            textFieldFront.selectionEnd = caretPosition + 1;
        }
        else {
            //change writing state
            koreanWritingState = 3;

            //designate a new symbol (combined one) - after add middle to the lead
            koreanCodeLists[caretPosition - 1].push(tailDict[button.textContent]);
            var number = koreanCodeLists[caretPosition - 1][2] + (koreanCodeLists[caretPosition - 1][1] - 1) * 28 + (koreanCodeLists[caretPosition - 1][0] - 1) * 588 + 44032;
            newSymbol = "&#" + number.toString() + ";";

            koreanSymbolsToDisplay[caretPosition - 1] = newSymbol;

            //display in the textarea
            let symbols = document.createElement('div');
            koreanSymbolsToDisplay.forEach(function (symbol) {
                symbols.innerHTML += symbol;
            });
            textFieldFront.value = symbols.innerHTML;

            //save number of signs in textarea
            textAreaFrontLength = textFieldFront.value.length;
            //set caret on a proper position;
            textFieldFront.selectionEnd = caretPosition;
        }
    }
    else if (((Object.keys(tailDict).find(key => tailDict[key] == koreanCodeLists[previousCaretPosition][2]) + button.textContent) in tailDict) && koreanWritingState === 3) {
        if (koreanCodeLists[previousCaretPosition][0] === -1) {
            //change writing state
            koreanWritingState = 1;

            //add to both list (display decimal string and symbol's number)
            koreanSymbolsToDisplay.splice(caretPosition, 0, jamoSymbols[button.textContent]);
            koreanCodeLists.push([tailDict[button.textContent]]);
            //if number of symbols in textarea is multiplicity of 20 - then go to the new line
            if (koreanSymbolsToDisplay.length % 20 === 0) {
                koreanSymbolsToDisplay.splice(caretPosition + 1, 0, '\r\n');
                koreanCodeLists.push([-1, -1, -1]);
                caretPosition = caretPosition + 1;
            }

            //display in the textarea
            let symbols = document.createElement('div');
            koreanSymbolsToDisplay.forEach(function (symbol) {
                symbols.innerHTML += symbol;
            });
            textFieldFront.value = symbols.innerHTML;

            //save number of signs in textarea
            textAreaFrontLength = textFieldFront.value.length;
            //set caret on a proper position;
            textFieldFront.selectionEnd = caretPosition + 1;
        }
        else {
            //change writing state
            koreanWritingState = 4;

            var newNumber = tailDict[Object.keys(tailDict).find(key => tailDict[key] == koreanCodeLists[previousCaretPosition][2]) + button.textContent];
            koreanCodeLists[caretPosition - 1].pop();
            koreanCodeLists[caretPosition - 1].push(newNumber);

            var number = koreanCodeLists[caretPosition - 1][2] + (koreanCodeLists[caretPosition - 1][1] - 1) * 28 + (koreanCodeLists[caretPosition - 1][0] - 1) * 588 + 44032;
            newSymbol = "&#" + number.toString() + ";";

            koreanSymbolsToDisplay[caretPosition - 1] = newSymbol;

            //display in the textarea
            let symbols = document.createElement('div');
            koreanSymbolsToDisplay.forEach(function (symbol) {
                symbols.innerHTML += symbol;
            });
            textFieldFront.value = symbols.innerHTML;

            //save number of signs in textarea
            textAreaFrontLength = textFieldFront.value.length;
            //set caret on a proper position;
            textFieldFront.selectionEnd = caretPosition;
        }
    }
}

//HANDLE ALL CASES BACK
function HandleAllCasesBack(button) {
    //get cursor position
    var caretPosition = getCaretPosition(textFieldBack).end;
    var previousCaretPosition = caretPosition - 1;
    if (caretPosition == 0) previousCaretPosition = 0;

    //ALL POSSIBLE CASES
    if (((button.textContent in leadDict) && koreanWritingStateBack === 0)
        || ((button.textContent in leadDict) && koreanWritingStateBack === 1)
        || ((button.textContent in leadDict) && !(button.textContent in tailDict) && koreanWritingStateBack === 2)
        || ((button.textContent in leadDict) && !(button.textContent in tailDict) && koreanWritingStateBack === 3)
        || ((button.textContent in leadDict) && koreanWritingStateBack === 4)
        || ((button.textContent in tailDict) && !((Object.keys(tailDict).find(key => tailDict[key] == koreanCodeListsBack[previousCaretPosition][2]) + button.textContent) in tailDict) && koreanWritingStateBack === 3)) {

        //change writing state
        koreanWritingStateBack = 1;

        //add to both list (display decimal string and symbol's number)
        koreanSymbolsToDisplayBack.splice(caretPosition, 0, jamoSymbols[button.textContent]);
        koreanCodeListsBack.push([leadDict[button.textContent]]);
        //if number of symbols in textarea is multiplicity of 20 - then go to the new line
        if (koreanSymbolsToDisplayBack.length % 20 === 0) {
            koreanSymbolsToDisplayBack.splice(caretPosition + 1, 0, '\r\n');
            koreanCodeListsBack.push([-1, -1, -1]);
            caretPosition = caretPosition + 1;
        }

        //display in the textarea
        let symbols = document.createElement('div');
        koreanSymbolsToDisplayBack.forEach(function (symbol) {
            symbols.innerHTML += symbol;
        });
        textFieldBack.value = symbols.innerHTML;

        //save number of signs in textarea
        textAreaBackLength = textFieldBack.value.length;
        //set caret on a proper position;
        textFieldBack.selectionEnd = caretPosition + 1;
    }
    else if (((button.textContent in middleDict) && koreanWritingStateBack === 0)
        || ((button.textContent in middleDict) && koreanWritingStateBack === 2)
        || ((button.textContent in middleDict) && koreanWritingStateBack === 3)
        || ((button.textContent in middleDict) && koreanWritingStateBack === 4)) {
        //change writing state
        koreanWritingStateBack = 0;

        //add to both list (display decimal string and symbol's number)
        koreanSymbolsToDisplayBack.splice(caretPosition, 0, jamoSymbols[button.textContent]);
        koreanCodeListsBack.push([middleDict[button.textContent]]);
        //if number of symbols in textarea is multiplicity of 20 - then go to the new line
        if (koreanSymbolsToDisplayBack.length % 20 === 0) {
            koreanSymbolsToDisplayBack.splice(caretPosition + 1, 0, '\r\n');
            koreanCodeListsBack.push([-1, -1, -1]);
            caretPosition = caretPosition + 1;
        }

        //display in the textarea
        let symbols = document.createElement('div');
        koreanSymbolsToDisplayBack.forEach(function (symbol) {
            symbols.innerHTML += symbol;
        });
        textFieldBack.value = symbols.innerHTML;

        //save number of signs in textarea
        textAreaBackLength = textFieldBack.value.length;
        //set caret on a proper position;
        textFieldBack.selectionEnd = caretPosition + 1;
    }
    else if ((button.textContent in middleDict) && koreanWritingStateBack === 1) {
        if (koreanCodeListsBack[previousCaretPosition][0] === -1) {
            //change writing state
            koreanWritingStateBack = 0;

            //add to both list (display decimal string and symbol's number)
            koreanSymbolsToDisplayBack.splice(caretPosition, 0, jamoSymbols[button.textContent]);
            koreanCodeListsBack.push([middleDict[button.textContent]]);
            //if number of symbols in textarea is multiplicity of 20 - then go to the new line
            if (koreanSymbolsToDisplayBack.length % 20 === 0) {
                koreanSymbolsToDisplayBack.splice(caretPosition + 1, 0, '\r\n');
                koreanCodeListsBack.push([-1, -1, -1]);
                caretPosition = caretPosition + 1;
            }

            //display in the textarea
            let symbols = document.createElement('div');
            koreanSymbolsToDisplayBack.forEach(function (symbol) {
                symbols.innerHTML += symbol;
            });
            textFieldBack.value = symbols.innerHTML;

            //save number of signs in textarea
            textAreaBackLength = textFieldBack.value.length;
            //set caret on a proper position;
            textFieldBack.selectionEnd = caretPosition + 1;
        }
        else {
            //change writing state
            koreanWritingStateBack = 2;

            //designate a new symbol (combined one) - after add middle to the lead
            koreanCodeListsBack[caretPosition - 1].push(middleDict[button.textContent]);
            var number = 0 + (koreanCodeListsBack[caretPosition - 1][1] - 1) * 28 + (koreanCodeListsBack[caretPosition - 1][0] - 1) * 588 + 44032;
            newSymbol = "&#" + number.toString() + ";";

            koreanSymbolsToDisplayBack[caretPosition - 1] = newSymbol;

            //display in the textarea
            let symbols = document.createElement('div');
            koreanSymbolsToDisplayBack.forEach(function (symbol) {
                symbols.innerHTML += symbol;
            });
            textFieldBack.value = symbols.innerHTML;

            //save number of signs in textarea
            textAreaBackLength = textFieldBack.value.length;
            //set caret on a proper position;
            textFieldBack.selectionEnd = caretPosition;
        }
    }
    else if ((button.textContent in tailDict) && koreanWritingStateBack === 2) {
        if (koreanCodeListsBack[previousCaretPosition][0] === -1) {
            //change writing state
            koreanWritingStateBack = 1;

            //add to both list (display decimal string and symbol's number)
            koreanSymbolsToDisplayBack.splice(caretPosition, 0, jamoSymbols[button.textContent]);
            koreanCodeListsBack.push([tailDict[button.textContent]]);
            //if number of symbols in textarea is multiplicity of 20 - then go to the new line
            if (koreanSymbolsToDisplayBack.length % 20 === 0) {
                koreanSymbolsToDisplayBack.splice(caretPosition + 1, 0, '\r\n');
                koreanCodeListsBack.push([-1, -1, -1]);
                caretPosition = caretPosition + 1;
            }

            //display in the textarea
            let symbols = document.createElement('div');
            koreanSymbolsToDisplayBack.forEach(function (symbol) {
                symbols.innerHTML += symbol;
            });
            textFieldBack.value = symbols.innerHTML;

            //save number of signs in textarea
            textAreaBackLength = textFieldBack.value.length;
            //set caret on a proper position;
            textFieldBack.selectionEnd = caretPosition + 1;
        }
        else {
            //change writing state
            koreanWritingStateBack = 3;

            //designate a new symbol (combined one) - after add middle to the lead
            koreanCodeListsBack[caretPosition - 1].push(tailDict[button.textContent]);
            var number = koreanCodeListsBack[caretPosition - 1][2] + (koreanCodeListsBack[caretPosition - 1][1] - 1) * 28 + (koreanCodeListsBack[caretPosition - 1][0] - 1) * 588 + 44032;
            newSymbol = "&#" + number.toString() + ";";

            koreanSymbolsToDisplayBack[caretPosition - 1] = newSymbol;

            //display in the textarea
            let symbols = document.createElement('div');
            koreanSymbolsToDisplayBack.forEach(function (symbol) {
                symbols.innerHTML += symbol;
            });
            textFieldBack.value = symbols.innerHTML;

            //save number of signs in textarea
            textAreaBackLength = textFieldBack.value.length;
            //set caret on a proper position;
            textFieldBack.selectionEnd = caretPosition;
        }
    }
    else if (((Object.keys(tailDict).find(key => tailDict[key] == koreanCodeListsBack[previousCaretPosition][2]) + button.textContent) in tailDict) && koreanWritingStateBack === 3) {
        if (koreanCodeListsBack[previousCaretPosition][0] === -1) {
            //change writing state
            koreanWritingStateBack = 1;

            //add to both list (display decimal string and symbol's number)
            koreanSymbolsToDisplayBack.splice(caretPosition, 0, jamoSymbols[button.textContent]);
            koreanCodeListsBack.push([tailDict[button.textContent]]);
            //if number of symbols in textarea is multiplicity of 20 - then go to the new line
            if (koreanSymbolsToDisplayBack.length % 20 === 0) {
                koreanSymbolsToDisplayBack.splice(caretPosition + 1, 0, '\r\n');
                koreanCodeListsBack.push([-1, -1, -1]);
                caretPosition = caretPosition + 1;
            }

            //display in the textarea
            let symbols = document.createElement('div');
            koreanSymbolsToDisplayBack.forEach(function (symbol) {
                symbols.innerHTML += symbol;
            });
            textFieldBack.value = symbols.innerHTML;

            //save number of signs in textarea
            textAreaBackLength = textFieldBack.value.length;
            //set caret on a proper position;
            textFieldBack.selectionEnd = caretPosition + 1;
        }
        else {
            //change writing state
            koreanWritingStateBack = 4;

            var newNumber = tailDict[Object.keys(tailDict).find(key => tailDict[key] == koreanCodeListsBack[previousCaretPosition][2]) + button.textContent];
            koreanCodeListsBack[caretPosition - 1].pop();
            koreanCodeListsBack[caretPosition - 1].push(newNumber);

            var number = koreanCodeListsBack[caretPosition - 1][2] + (koreanCodeListsBack[caretPosition - 1][1] - 1) * 28 + (koreanCodeListsBack[caretPosition - 1][0] - 1) * 588 + 44032;
            newSymbol = "&#" + number.toString() + ";";

            koreanSymbolsToDisplayBack[caretPosition - 1] = newSymbol;

            //display in the textarea
            let symbols = document.createElement('div');
            koreanSymbolsToDisplayBack.forEach(function (symbol) {
                symbols.innerHTML += symbol;
            });
            textFieldBack.value = symbols.innerHTML;

            //save number of signs in textarea
            textAreaBackLength = textFieldBack.value.length;
            //set caret on a proper position;
            textFieldBack.selectionEnd = caretPosition;
        }
    }
}

function getCaretPosition(ctrl) {
    // IE < 9 Support 
    if (document.selection) {
        ctrl.focus();
        var range = document.selection.createRange();
        var rangelen = range.text.length;
        range.moveStart('character', -ctrl.value.length);
        var start = range.text.length - rangelen;
        return {
            'start': start,
            'end': start + rangelen
        };
    } // IE >=9 and other browsers
    else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
        return {
            'start': ctrl.selectionStart,
            'end': ctrl.selectionEnd
        };
    } else {
        return {
            'start': 0,
            'end': 0
        };
    }
}

function putCommonSymbolInKorean(sign) {
    //get cursor position
    var caretPosition = getCaretPosition(textFieldFront).end;
    //add to both list (display decimal string and symbol's number)
    koreanSymbolsToDisplay.splice(caretPosition, 0, sign);
    koreanCodeLists.push([-1, -1, -1]);
    //display in the textarea
    let symbols = document.createElement('div');
    koreanSymbolsToDisplay.forEach(function (symbol) {
        symbols.innerHTML += symbol;
    });
    textFieldFront.value = symbols.innerHTML;
    //save number of signs in textarea
    textAreaFrontLength = textFieldFront.value.length;
    //set caret on a proper position
    textFieldFront.selectionEnd = caretPosition + 1;
    //reset korean writing state
    koreanWritingState = 0;
}

function putCommonSymbolInKoreanBack(sign) {
    //get cursor position
    var caretPosition = getCaretPosition(textFieldBack).end;
    //add to both list (display decimal string and symbol's number)
    koreanSymbolsToDisplayBack.splice(caretPosition, 0, sign);
    koreanCodeListsBack.push([-1, -1, -1]);
    //display in the textarea
    let symbols = document.createElement('div');
    koreanSymbolsToDisplayBack.forEach(function (symbol) {
        symbols.innerHTML += symbol;
    });
    textFieldBack.value = symbols.innerHTML;
    //save number of signs in textarea
    textAreaBackLength = textFieldBack.value.length;
    //set caret on a proper position
    textFieldBack.selectionEnd = caretPosition + 1;
    //reset korean writing state
    koreanWritingStateBack = 0;
}

$(document).ready(function () {
    //////////////////////////////////////////////////////////////////////////////
    //FRONT TEXTAREA/////////////////////////////////////////////////////////////
    //serve keyboard events in korean mode
    $('#flashcard-text-front-kor').bind("keydown", function (e) {
        if (getSelectedText('selected-front-lang') === "한국어") {
            if (e.keyCode == 32) { //space
                putCommonSymbolInKorean(' ');
                e.preventDefault();
            }
            else if (e.keyCode == 13) { //Enter
                putCommonSymbolInKorean('\r\n');
                e.preventDefault();
            }
            else if (e.keyCode == 190) { //dot
                putCommonSymbolInKorean('.');
                e.preventDefault();
            }
            else if (e.keyCode == 188) { //comma
                putCommonSymbolInKorean(',');
                e.preventDefault();
            }
            else if (e.keyCode == 191) { //question mark
                putCommonSymbolInKorean('?');
                e.preventDefault();
            }
            else if (e.keyCode == 49) { //exclamation mark
                putCommonSymbolInKorean('!');
                e.preventDefault();
            }
            else if (e.keyCode == 8 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) { //arrows & backspace
            }
            else { //other keys
                e.preventDefault();
            }
        }
    });

    //serve removing symbols in korean mode
    $("#flashcard-text-front-kor").bind('change keyup paste click', function () {
        if (getSelectedText('selected-front-lang') === "한국어") {
            if (textAreaFrontLength > textFieldFront.value.length) {
                if (textFieldFront.value.length == 0) {
                    koreanCodeLists.length = 0;
                    koreanSymbolsToDisplay.length = 0;
                    koreanWritingState = 0;
                    textAreaFrontLength = 0;
                }
                else {
                    if (getCaretPosition(textFieldFront).end > 0) {
                        //get cursor position
                        var caretPosition = getCaretPosition(textFieldFront).end;
                        koreanCodeLists.splice(caretPosition, 1);
                        koreanSymbolsToDisplay.splice(caretPosition, 1);
                        textAreaFrontLength = textFieldFront.value.length;
                        //set caret on a proper position
                        textFieldFront.selectionEnd = caretPosition + 1;
                    }
                }
            }
        }
    });

    //////////////////////////////////////////////////////////////////////////////
    //BACK  TEXTAREA/////////////////////////////////////////////////////////////
    //serve keyboard events in korean mode
    $('#flashcard-text-back-kor').bind("keydown", function (e) {
        if (getSelectedText('selected-back-lang') === "한국어") {
            if (e.keyCode == 32) { //space
                putCommonSymbolInKoreanBack(' ');
                e.preventDefault();
            }
            else if (e.keyCode == 13) { //Enter
                putCommonSymbolInKoreanBack('\r\n');
                e.preventDefault();
            }
            else if (e.keyCode == 190) { //dot
                putCommonSymbolInKoreanBack('.');
                e.preventDefault();
            }
            else if (e.keyCode == 188) { //comma
                putCommonSymbolInKoreanBack(',');
                e.preventDefault();
            }
            else if (e.keyCode == 191) { //question mark
                putCommonSymbolInKoreanBack('?');
                e.preventDefault();
            }
            else if (e.keyCode == 49) { //exclamation mark
                putCommonSymbolInKoreanBack('!');
                e.preventDefault();
            }
            else if (e.keyCode == 8 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) { //arrows & backspace
            }
            else { //other keys
                e.preventDefault();
            }
        }
    });

    //serve removing symbols in korean mode
    $("#flashcard-text-back-kor").bind('change keyup paste click', function () {
        if (getSelectedText('selected-back-lang') === "한국어") {
            if (textAreaBackLength > textFieldBack.value.length) {
                if (textFieldBack.value.length == 0) {
                    koreanCodeListsBack.length = 0;
                    koreanSymbolsToDisplayBack.length = 0;
                    koreanWritingStateBack = 0;
                    textAreaBackLength = 0;
                }
                else {
                    if (getCaretPosition(textFieldBack).end > 0) {
                        //get cursor position
                        var caretPosition = getCaretPosition(textFieldBack).end;
                        koreanCodeListsBack.splice(caretPosition, 1);
                        koreanSymbolsToDisplayBack.splice(caretPosition, 1);
                        textAreaBackLength = textFieldBack.value.length;
                        //set caret on a proper position
                        textFieldBack.selectionEnd = caretPosition + 1;
                    }
                }
            }
        }
    });
});

///////////////////////////////////////////////////////////////////////////////////////
//////////////////---------CHARACTERS COUNTER--------------///////////////////////////
//Set character counter in a proper place
jQuery.fn.hasScrollBar = function () {
    var scrollHeight = this.get(0).scrollHeight;

    if (117 < scrollHeight)
        return true;
    else
        return false;
}

function setScrollBar(obj, wordCounter, moveClass) {
    if ($(obj).hasScrollBar()) {
        wordCounter.classList.add(moveClass);
    }
    else {
        wordCounter.classList.remove(moveClass);
    }
}

function setScrollBarRTL(obj, wordCounter, moveClass, moveClassRTL) {
    // if ($(obj).hasScrollBar()) {
    //     wordCounter.classList.remove(moveClassRTL);
    //     //wordCounter.classList.add(moveClass);
    // }
    // else {
    //wordCounter.classList.remove(moveClass);
    wordCounter.classList.add(moveClassRTL);
    //}
}

function maxCharactersNumber(whichTextarea) {
    if (whichTextarea == "front") {
        if (textLangFront === "عربى" || textLangFront === "עברית" || textLangFront === "יידיש" || textLangFront === "فارسی") {
            setScrollBarRTL('#flashcard-text-front-notkor', wordCounterFront, "move-wordCounter-rtl", "move-wordCounter-rtl-normal");
        }
        else {
            if (textLangFront === "한국어") {
                setScrollBar('#flashcard-text-front-kor', wordCounterFront, "move-wordCounter");
            }
        }

        if (textLangFront === "한국어") {
            if (textFieldFront.value.length >= MAX_CHARS) {
                textFieldFront.style.color = 'red';
                setTimeout(function () {
                    textFieldFront.style.color = '';
                }, 500);
                textFieldFront.value = textFieldFront.value.substring(0, MAX_CHARS);
            }
            $('#flashcard-text-wordCounter-front').text($.trim(textFieldFront.value.length) + "/" + MAX_CHARS);
        }
        else {
            if (charactersNumberFront >= MAX_CHARS) {
                textFieldFront.style.color = 'red';
                setTimeout(function () {
                    textFieldFront.style.color = '';
                }, 500);
            }
            $('#flashcard-text-wordCounter-front').text($.trim(charactersNumberFront) + "/" + MAX_CHARS);
        }
    }
    else if (whichTextarea == "back") {
        if (textLangBack === "عربى" || textLangBack === "עברית" || textLangBack === "יידיש" || textLangBack === "فارسی") {
            setScrollBarRTL('#flashcard-text-back-notkor', wordCounterBack, "move-wordCounter-rtl", "move-wordCounter-rtl-normal");
        }
        else {
            if (textLangBack === "한국어") {
                setScrollBar('#flashcard-text-back-kor', wordCounterBack, "move-wordCounter");
            }
        }

        if (textLangBack === "한국어") {
            if (textFieldBack.value.length >= MAX_CHARS) {
                textFieldBack.style.color = 'red';
                setTimeout(function () {
                    textFieldBack.style.color = '';
                }, 500);
                textFieldBack.value = textFieldBack.value.substring(0, MAX_CHARS);
            }
            $('#flashcard-text-wordCounter-back').text($.trim(textFieldBack.value.length) + "/" + MAX_CHARS);
        }
        else {
            if (charactersNumberBack >= MAX_CHARS) {
                textFieldBack.style.color = 'red';
                setTimeout(function () {
                    textFieldBack.style.color = '';
                }, 500);
            }
            $('#flashcard-text-wordCounter-back').text($.trim(charactersNumberBack) + "/" + MAX_CHARS);
        }
    }
}


$('#flashcard-text-front-notkor').on('keydown', function (e) {
    if (charactersNumberFront >= MAX_CHARS && e.keyCode != 8 &&
        e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 38
        && e.keyCode != 39 && e.keyCode != 40) {
        event.preventDefault();
    }
});

$('#flashcard-text-back-notkor').on('keydown', function (e) {
    if (charactersNumberBack >= MAX_CHARS && e.keyCode != 8 &&
        e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 38
        && e.keyCode != 39 && e.keyCode != 40) {
        event.preventDefault();
    }
});

//INPUT CHANGE AND CUT MECHANISM
$('.flashcard-text-front').bind('input onpropertychange cut', function (e) {
    if (textLangFront === "한국어") {
        maxCharactersNumber('front');
    }
    else {
        e.preventDefault();
        var textHtml = $(this).html();
        var divs = Array.from(document.querySelectorAll('#flashcard-text-front-notkor div'));
        var textHtml2 = textHtml.replace(/(<([^>]+)>)/ig, "")
        var textHtml3 = textHtml2.replace(/&nbsp;/g, ' ');

        var newlines = 0;
        if (divs.length > 0) {
            newlines = divs.length - 1
        }

        charactersNumberFront = textHtml3.length + newlines;
        maxCharactersNumber('front');
    }
})


$('.flashcard-text-back').bind('input onpropertychange cut', function (e) {
    if (textLangBack === "한국어") {
        maxCharactersNumber('back');
    }
    else {
        e.preventDefault();
        var textHtml = $(this).html();
        var divs = Array.from(document.querySelectorAll('#flashcard-text-back-notkor div'));
        var textHtml2 = textHtml.replace(/(<([^>]+)>)/ig, "")
        var textHtml3 = textHtml2.replace(/&nbsp;/g, ' ');

        var newlines = 0;
        if (divs.length > 0) {
            newlines = divs.length - 1
        }

        charactersNumberBack = textHtml3.length + newlines;
        maxCharactersNumber('back');
    }
})

//PASTE MECHANISM
//FRONT
var ce = document.querySelector('#flashcard-text-front-notkor')
ce.addEventListener('paste', function (e) {
    e.preventDefault()
    var newstr = "";
    var lines = 0;
    var str = e.clipboardData.getData('text/plain');
    for (var i = 0; i < str.length; i++)
        if (!(str[i] == '\n' || str[i] == '\r'))
            newstr += str[i];
        else {
            newstr += "\r\n";
            lines += 1;
        }

    var text = e.clipboardData.getData('text/plain')

    if (charactersNumberFront + newstr.length <= MAX_CHARS)
        document.execCommand('insertText', false, newstr)


    var text = $('#flashcard-text-front-notkor').html();

    var tabs = Array.from(document.querySelectorAll('#flashcard-text-front-notkor div'));
    var t2 = text.replace(/(<([^>]+)>)/ig, "")
    var t3 = t2.replace(/&nbsp;/g, ' ');
    var newlines = 0;
    if (tabs.length > 0) {
        newlines = tabs.length - 1
    }
    charactersNumberFront = t3.length + newlines;
})

//BACK
var ce = document.querySelector('#flashcard-text-back-notkor')
ce.addEventListener('paste', function (e) {
    e.preventDefault()
    var newstr = "";
    var lines = 0;
    var str = e.clipboardData.getData('text/plain');
    for (var i = 0; i < str.length; i++)
        if (!(str[i] == '\n' || str[i] == '\r'))
            newstr += str[i];
        else {
            newstr += "\r\n";
            lines += 1;
        }

    var text = e.clipboardData.getData('text/plain')

    if (charactersNumberBack + newstr.length <= MAX_CHARS)
        document.execCommand('insertText', false, newstr)


    var text = $('#flashcard-text-back-notkor').html();

    var tabs = Array.from(document.querySelectorAll('#flashcard-text-back-notkor div'));
    var t2 = text.replace(/(<([^>]+)>)/ig, "")
    var t3 = t2.replace(/&nbsp;/g, ' ');
    var newlines = 0;
    if (tabs.length > 0) {
        newlines = tabs.length - 1
    }
    charactersNumberBack = t3.length + newlines;
})

///////////////////////////////////////////////////////////////////////////////////////
////////////////////-----------CHANGE SELECTED LANGUAGES------------//////////////////
selectedLangFront.addEventListener('change', function () {
    //save selected language in a locale storage
    textLangFront = selectedLangFront.options[selectedLangFront.selectedIndex].text;
    localStorage.setItem('frontSelectedLang', textLangFront);

    //Remove all buttons at the beginning
    while (keyboardFrontContainer.lastElementChild) {
        keyboardFrontContainer.removeChild(keyboardFrontContainer.lastElementChild);
    }
    //Get a proper set of selected language symbols
    var signs;

    if (textLangFront === "한국어") {
        $("#flashcard-text-front-notkor").css("display", "none");
        $("#flashcard-text-front-kor").css("display", "block");
        textFieldFront = document.querySelector("#flashcard-text-front-kor");

        document.getElementById("flashcard-btn-bold-front").disabled = true;
        document.getElementById("flashcard-btn-underline-front").disabled = true;
        document.getElementById("flashcard-btn-uppercase-front").disabled = true;
        document.getElementById("flashcard-btn-colorText-front").disabled = true;

        document.getElementById("flashcard-btn-bold-front").classList.add('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-underline-front").classList.add('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-uppercase-front").classList.add('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-colorText-front").classList.add('flashcard-btn-inactive');
    }
    else {
        $("#flashcard-text-front-notkor").css("display", "block");
        $("#flashcard-text-front-kor").css("display", "none");
        textFieldFront = document.querySelector("#flashcard-text-front-notkor");

        document.getElementById("flashcard-btn-bold-front").disabled = false;
        document.getElementById("flashcard-btn-underline-front").disabled = false;
        document.getElementById("flashcard-btn-uppercase-front").disabled = false;
        document.getElementById("flashcard-btn-colorText-front").disabled = false;

        document.getElementById("flashcard-btn-bold-front").classList.remove('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-underline-front").classList.remove('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-uppercase-front").classList.remove('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-colorText-front").classList.remove('flashcard-btn-inactive');
    }

    //set proper text direction
    if (textLangFront === "عربى") {
        textFieldFront.classList.add("rtl");
        wordCounterFront.classList.add("move-wordCounter-rtl-normal");
        signs = signsDictionary['Arabic'];
    }
    else if (textLangFront === "עברית") {
        textFieldFront.classList.add("rtl");
        wordCounterFront.classList.add("move-wordCounter-rtl-normal");
        signs = signsDictionary['Hebrew'];
    }
    else if (textLangFront === "יידיש") {
        textFieldFront.classList.add("rtl");
        wordCounterFront.classList.add("move-wordCounter-rtl-normal");
        signs = signsDictionary['Yiddish'];
    }
    else if (textLangFront === "فارسی") {
        textFieldFront.classList.add("rtl");
        wordCounterFront.classList.add("move-wordCounter-rtl-normal");
        signs = signsDictionary['Persian'];
    }
    else {
        textFieldFront.classList.remove("rtl");
        wordCounterFront.classList.remove("move-wordCounter-rtl-normal");
        signs = signsDictionary[textLangFront];
    }

    signs.forEach(function (element) {
        var btn = document.createElement('button');
        btn.classList.add("keyboard-sign-btn-front");
        btn.textContent = element;
        keyboardFrontContainer.appendChild(btn);
    });

    signButtonsFront = document.querySelectorAll('.keyboard-sign-btn-front');
    addEventsToBtns(signButtonsFront);
});

selectedLangBack.addEventListener('change', function () {
    //save selected language in a locale storage
    textLangBack = selectedLangBack.options[selectedLangBack.selectedIndex].text;
    localStorage.setItem('backSelectedLang', textLangBack);

    //Remove all buttons at the beginning
    while (keyboardBackContainer.lastElementChild) {
        keyboardBackContainer.removeChild(keyboardBackContainer.lastElementChild);
    }
    //Example sentences/////////////////////////////
    //Example sentences
    while (keyboardSentenceOneContainer.lastElementChild) {
        keyboardSentenceOneContainer.removeChild(keyboardSentenceOneContainer.lastElementChild);
    }
    //Example sentences
    while (keyboardSentenceTwoContainer.lastElementChild) {
        keyboardSentenceTwoContainer.removeChild(keyboardSentenceTwoContainer.lastElementChild);
    }
    //Example sentences
    while (keyboardSentenceThreeContainer.lastElementChild) {
        keyboardSentenceThreeContainer.removeChild(keyboardSentenceThreeContainer.lastElementChild);
    }

    //Get a proper set of selected language symbols
    var signs;
    var signsSentenceOne;
    var signsSentenceTwo;
    var signsSentenceThree;

    if (textLangBack === "한국어") {
        $("#flashcard-text-back-notkor").css("display", "none");
        $("#flashcard-text-back-kor").css("display", "block");
        textFieldBack = document.querySelector("#flashcard-text-back-kor");

        document.getElementById("flashcard-btn-bold-back").disabled = true;
        document.getElementById("flashcard-btn-underline-back").disabled = true;
        document.getElementById("flashcard-btn-uppercase-back").disabled = true;
        document.getElementById("flashcard-btn-colorText-back").disabled = true;

        document.getElementById("flashcard-btn-bold-back").classList.add('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-underline-back").classList.add('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-uppercase-back").classList.add('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-colorText-back").classList.add('flashcard-btn-inactive');
    }
    else {
        $("#flashcard-text-back-notkor").css("display", "block");
        $("#flashcard-text-back-kor").css("display", "none");
        textFieldBack = document.querySelector("#flashcard-text-back-notkor");

        document.getElementById("flashcard-btn-bold-back").disabled = false;
        document.getElementById("flashcard-btn-underline-back").disabled = false;
        document.getElementById("flashcard-btn-uppercase-back").disabled = false;
        document.getElementById("flashcard-btn-colorText-back").disabled = false;

        document.getElementById("flashcard-btn-bold-back").classList.remove('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-underline-back").classList.remove('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-uppercase-back").classList.remove('flashcard-btn-inactive');
        document.getElementById("flashcard-btn-colorText-back").classList.remove('flashcard-btn-inactive');
    }

    //set proper text direction
    if (textLangBack === "عربى") {
        textFieldBack.classList.add("rtl");
        wordCounterBack.classList.add("move-wordCounter-rtl-normal");
        signs = signsDictionary['Arabic'];
        signsSentenceOne = signsDictionary['Arabic'];
        signsSentenceTwo = signsDictionary['Arabic'];
        signsSentenceThree = signsDictionary['Arabic'];
        textFieldOne.classList.add("rtl");
        textFieldTwo.classList.add("rtl");
        textFieldThree.classList.add("rtl");
    }
    else if (textLangBack === "עברית") {
        textFieldBack.classList.add("rtl");
        wordCounterBack.classList.add("move-wordCounter-rtl-normal");
        signs = signsDictionary['Hebrew'];
        signsSentenceOne = signsDictionary['Hebrew'];
        signsSentenceTwo = signsDictionary['Hebrew'];
        signsSentenceThree = signsDictionary['Hebrew'];
        textFieldOne.classList.add("rtl");
        textFieldTwo.classList.add("rtl");
        textFieldThree.classList.add("rtl");
    }
    else if (textLangBack === "יידיש") {
        textFieldBack.classList.add("rtl");
        wordCounterBack.classList.add("move-wordCounter-rtl-normal");
        signs = signsDictionary['Yiddish'];
        signsSentenceOne = signsDictionary['Yiddish'];
        signsSentenceTwo = signsDictionary['Yiddish'];
        signsSentenceThree = signsDictionary['Yiddish'];
        textFieldOne.classList.add("rtl");
        textFieldTwo.classList.add("rtl");
        textFieldThree.classList.add("rtl");
    }
    else if (textLangBack === "فارسی") {
        textFieldBack.classList.add("rtl");
        wordCounterBack.classList.add("move-wordCounter-rtl-normal");
        signs = signsDictionary['Persian'];
        signsSentenceOne = signsDictionary['Persian'];
        signsSentenceTwo = signsDictionary['Persian'];
        signsSentenceThree = signsDictionary['Persian'];
        textFieldOne.classList.add("rtl");
        textFieldTwo.classList.add("rtl");
        textFieldThree.classList.add("rtl");
    }
    else {
        textFieldBack.classList.remove("rtl");
        wordCounterBack.classList.remove("move-wordCounter-rtl-normal");
        signs = signsDictionary[textLangBack];
        signsSentenceOne = signsDictionary[textLangBack];
        signsSentenceTwo = signsDictionary[textLangBack];
        signsSentenceThree = signsDictionary[textLangBack];
        textFieldOne.classList.remove("rtl");
        textFieldTwo.classList.remove("rtl");
        textFieldThree.classList.remove("rtl");
    }

    signs.forEach(function (element) {
        var btn = document.createElement('button');
        btn.classList.add("keyboard-sign-btn-back");
        btn.textContent = element;
        keyboardBackContainer.appendChild(btn);
    });

    signButtonsBack = document.querySelectorAll('.keyboard-sign-btn-back');
    addEventsToBtns(signButtonsBack);

    //Sentences
    signsSentenceOne.forEach(function (element) {
        var btn = document.createElement('button');
        btn.classList.add("keyboard-sign-btn-sen-one");
        btn.textContent = element;
        keyboardSentenceOneContainer.appendChild(btn);
    });

    signButtonsSentenceOne = document.querySelectorAll('.keyboard-sign-btn-sen-one');
    addEventsToSentenceBtns(signButtonsSentenceOne, textFieldOne);

    signsSentenceTwo.forEach(function (element) {
        var btn = document.createElement('button');
        btn.classList.add("keyboard-sign-btn-sen-two");
        btn.textContent = element;
        keyboardSentenceTwoContainer.appendChild(btn);
    });

    signButtonsSentenceTwo = document.querySelectorAll('.keyboard-sign-btn-sen-two');
    addEventsToSentenceBtns(signButtonsSentenceTwo, textFieldTwo);

    signsSentenceThree.forEach(function (element) {
        var btn = document.createElement('button');
        btn.classList.add("keyboard-sign-btn-sen-three");
        btn.textContent = element;
        keyboardSentenceThreeContainer.appendChild(btn);
    });

    signButtonsSentenceThree = document.querySelectorAll('.keyboard-sign-btn-sen-three');
    addEventsToSentenceBtns(signButtonsSentenceThree, textFieldThree);
});

//////////////////////////////////////////////////////////////////////////////////////
///////////////////////-----------EXAMPLE SENTENCES------------///////////////////////
const pathIconAddCardBtns = "../static/mainContent/images/";
function IconHoverAddCard(obj, whichIcon) {
    if (whichIcon === 1)
        obj.src = pathIconAddCardBtns.concat("icons/plusOrangeTransparent.png");
    else if (whichIcon === 2)
        obj.src = pathIconAddCardBtns.concat("recordIconOrange.png");
    else if (whichIcon === 3)
        obj.src = pathIconAddCardBtns.concat("basketIconOrange.png");
}

function IconUnhoverAddCard(obj, whichIcon) {
    if (whichIcon === 1)
        obj.src = pathIconAddCardBtns.concat("icons/plusTransparent.png");
    else if (whichIcon === 2)
        obj.src = pathIconAddCardBtns.concat("recordIcon.png");
    else if (whichIcon === 3)
        obj.src = pathIconAddCardBtns.concat("basketIcon.png");
}

function nextSentence(obj) {
    var nextSentenceArea = document.getElementById(obj);
    nextSentenceArea.classList.remove('hidden');
}

removeExampleImgBtn.addEventListener("click", () => {
    if (flashcardImage != null) {
        //image file drop zone handle
        var dropZoneElement = document.querySelector(".drop-zone");
        if (dropZoneElement.querySelector(".drop-zone__thumb")) {
            dropZoneElement.querySelector(".drop-zone__thumb").remove();
            var prompt = document.createElement("div");
            prompt.classList.add("drop-zone__prompt");
            prompt.innerHTML = promptText;
            dropZoneElement.appendChild(prompt);
        }
        flashcardImage = null;
    }
});

//////////////////////////////////////////////////////////////////////////////////////
///////////////////////-----------TRANSLATION------------/////////////////////////////
//Distionary: language --> codes
var dictionaryLangCodes = {
    'Afrikaans': 'af',
    'Shqiptar': 'sq',
    'English': 'en',
    'عربى': 'ar',
    'Azeri': 'az',
    'Euskal': 'eu',
    'বাংলা': 'bn',
    'Беларуская': 'be',
    'Bosanski': 'bs',
    'български': 'bg',
    '繁體中文': 'zh-TW',
    '简体中文': 'zh-CN',
    'Hrvatski': 'hr',
    'Český': 'cs',
    'Dansk': 'da',
    'Esperanto': 'eo',
    'Eestlane': 'et',
    'Pilipino': '',
    'Suomalainen': 'fi',
    'Français': 'fr',
    'Frysk': 'fy',
    'Galego': 'gl',
    'Ελληνική': 'el',
    'ქართული': 'ka',
    'ગુડારતી': 'gu',
    'Hausa': 'ha',
    'Ōlelo Hawaiʻi': 'haw',
    'עברית': 'he',
    'हिन्दी': 'hi',
    'Español': 'es',
    'bahasa Indonesia': 'id',
    'Gaeilge': 'ga',
    'Íslensku': 'is',
    '日本語': 'ja',
    'Basa jawa': 'jw',
    'יידיש': 'yi',
    'Yoruba': 'yo',
    'ಕನ್ನಡ': 'kn',
    'Català': 'ca',
    'Қазақ': 'kk',
    'ខ្មែរ': 'km',
    'Кыргызча': 'ky',
    '한국어': 'ko',
    'Corsu': 'co',
    'Kreyòl': '',
    'Kurdî': 'ku',
    'ລາວ': 'lo',
    'Lietuvių': 'lt',
    'Lëtzebuergesch': 'lb',
    'Latine': 'la',
    'Latvietis': 'lv',
    'Македонски': 'mk',
    'മലയാളം': 'ml',
    'Bahasa Melayu': 'ms',
    'Malagasy': 'mg',
    'Malti': 'mt',
    'Maori': 'mi',
    'मराठी': 'mr',
    'Монгол': 'mn',
    'नेपाली': 'ne',
    'Nederlands': 'nl',
    'Deutsch': 'de',
    'Norsk': 'no',
    'հայերեն': 'hy',
    'فارسی': 'fa',
    'Português': 'pt',
    'Polski': 'pl',
    'Русский': 'ru',
    'Română': 'ro',
    'Sāmoa': 'sm',
    'Српски': 'sr',
    'Shona': 'sn',
    'Slovenský': 'sk',
    'Slovenščina': 'sl',
    'Soomaali': 'so',
    'Kiswahili': 'sw',
    'Urang Sunda': 'su',
    'Svenska': 'sv',
    'Точик': 'tg',
    'ไทย': 'th',
    'தமிழ்': 'ta',
    'Татар': '',
    'తెలుగు': 'te',
    'Türkçe': 'tr',
    'Türkmenler': '',
    'Українська': 'uk',
    'اردو': 'ur',
    "O'zbek": 'uz',
    'Cymraeg': 'cy',
    'Magyar': 'hu',
    'Tiếng Việt': 'vi',
    'Italiano': 'it',
    'Zulu': 'zu',
}

function translateText(number) {
    var selectedSource;
    var selectedTarget;
    if (number === 1) {
        selectedSource = getSelectedText("selected-front-lang");
        selectedTarget = getSelectedText("selected-back-lang");

        var selectedSourceCode = dictionaryLangCodes[selectedSource];
        var selectedTargetCode = dictionaryLangCodes[selectedTarget];

        if (selectedSourceCode != '' && selectedSourceCode != null
            && selectedTargetCode != '' && selectedTargetCode != null) {
            if (textLangFront === "한국어") {
                getTranslation(selectedSourceCode, selectedTargetCode, textFieldFront.value, textFieldBack);
            }
            else {
                var textToTranslate = $('#flashcard-text-front-notkor').text();
                getTranslation(selectedSourceCode, selectedTargetCode, textToTranslate, textFieldBack);
            }

        }
        else {
            if (textLangBack === "한국어") {
                textFieldBack.value = "Translation is not available."
            }
            else {
                textFieldBack.innerHTML = "Translation is not available."
            }
        }

    }
    else if (number === 2) {
        selectedSource = getSelectedText("selected-back-lang");
        selectedTarget = getSelectedText("selected-front-lang");

        var selectedSourceCode = dictionaryLangCodes[selectedSource];
        var selectedTargetCode = dictionaryLangCodes[selectedTarget];

        if (selectedSourceCode != '' && selectedSourceCode != null
            && selectedTargetCode != '' && selectedTargetCode != null) {
            if (textLangBack === "한국어") {
                getTranslation(selectedSourceCode, selectedTargetCode, textFieldBack.value, textFieldFront);
            }
            else {
                var textToTranslate = $('#flashcard-text-back-notkor').text();
                getTranslation(selectedSourceCode, selectedTargetCode, textToTranslate, textFieldFront);
            }
        }
        else {
            if (textLangFront === "한국어") {
                textFieldFront.value = "Translation is not available."
            }
            else {
                textFieldFront.innerHTML = "Translation is not available."
            }
        }
    }
}

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://google-translate1.p.rapidapi.com/language/translate/v2",
    "method": "POST",
    "headers": {
        "x-rapidapi-host": "google-translate1.p.rapidapi.com",
        "x-rapidapi-key": "d43eaa1a72msh9ede2c00043c7efp1f7a70jsnc7a06151cbd0",
        "accept-encoding": "application/gzip",
        "content-type": "application/x-www-form-urlencoded"
    },
    "data": {
        "source": "",
        "q": "",
        "target": ""
    }
}

function getTranslation(sourceLang, targetLang, data, targetField) {
    settings.data.q = data;
    settings.data.source = sourceLang;
    settings.data.target = targetLang;

    $.ajax(settings).done(function (response) {
        var translatedText = response.data.translations[0].translatedText;
        if (targetLang === 'ko') {
            targetField.value = translatedText;
        }
        else {
            targetField.innerHTML = translatedText;
        }
    });
}

