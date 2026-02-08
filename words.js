const wordDatabase = {
    animais: [
        "AGUIA", "ARARA", "BURRO", "CABRA", "CARPA", "CERVO", "CISNE", "COBRA",
        "CORVO", "CUPIM", "GATOS", "GAMBA", "GRILO", "HIENA", "KOALA", "LARVA",
        "LEBRE", "LHAMA", "LINCE", "MOSCA", "OVELH", "PANDA", "PAVAO", "PEIXE",
        "POLVO", "POMBO", "PONEI", "PULGA", "RATOS", "SABIA", "SAPOS", "TIGRE",
        "TOURO", "TRUTA", "URUBU", "VACAS", "VESPA", "ZEBRA", "LONTRA"
    ],
    comida: [
        "AIPIM", "AMORA", "ARROZ", "AVEIA", "BACON", "BROAS", "CACAU", "CARNE",
        "CREME", "FEIJO", "FRUTA", "GEMAS", "KEBAB", "LIMAO", "MAMAO", "MANGA",
        "MASSA", "MELAO", "MILHO", "MOLHO", "NACHO", "NOZES", "PASTA", "PIZZA",
        "PRATO", "PUDIM", "SALSA", "SOPAS", "SUCOS", "SUSHI", "TACOS", "TORTA",
        "TRIGO", "VINHO", "VODKA", "LEITE", "COCOS", "BOLOS", "DOCES"
    ],
    objetos: [
        "ANEIS", "AVIAO", "BACIA", "BALAO", "BALDE", "BANCO", "BARCO", "BLUSA",
        "BOLAS", "BOLSA", "BOMBA", "BOTAO", "CAIXA", "CAMAS", "CANOA", "CAPAS",
        "CARRO", "CARTA", "CHAVE", "CINTO", "COFRE", "COLAS", "COPOS", "CORDA",
        "DADOS", "DISCO", "DRONE", "FACAS", "FITAS", "FORNO", "FOTOS", "GARFO",
        "GLOBO", "HARPA", "JARRA", "LAPIS", "LATAS", "LIVRO", "LUVAS", "MALAS",
        "MAPAS", "MESAS", "MOTOS", "MOUSE", "NAVIO", "PAPEL", "PEDRA", "PIANO",
        "PILHA", "PNEUS", "PRATO", "RADIO", "REDES", "REMOS", "ROBOS", "RODAS",
        "SABAO", "SACOS", "SAIAS", "SINOS", "SOFAS", "TACAS", "TELAS", "TENIS",
        "TRENS", "TUBOS", "VASOS", "VELAS", "VIDRO", "VIOLA"
    ],
    corpo: [
        "BARBA", "BOCAS", "BRACO", "CILIO", "CORPO", "COXAS", "DEDOS", "DENTE",
        "FEMUR", "LABIO", "MENTE", "NARIZ", "NEURO", "OLHOS", "OMBRO", "OSSOS",
        "PEITO", "PELES", "PERNA", "PULSO", "ROSTO", "TESTA", "TORAX", "UNHAS",
        "VEIAS"
    ],
    natureza: [
        "AGUAS", "AREIA", "ASTRO", "BARRO", "CHUVA", "CLIMA", "COSTA", "CRAVO",
        "FAUNA", "FERRO", "FLORA", "FOGOS", "FOLHA", "FRIOS", "GELOS", "GRAMA",
        "GRUTA", "ILHAS", "LAGOS", "LAGOA", "MARES", "MATOS", "METAL", "MINAS",
        "MONTE", "MORRO", "NEVES", "NOITE", "NORTE", "NUVEM", "OASIS", "ONDAS",
        "OUROS", "PEDRA", "PRAIA", "RAIOS", "RAMOS", "ROCHA", "ROSAS", "SELVA",
        "SERRA", "SOLAR", "SOLOS", "TERRA", "TREVO", "TROVA", "VALES", "VENTO"
    ],
    profissoes: [
        "ATRIZ", "AUTOR", "BARAO", "BISPO", "CHEFE", "CLERO", "CONDE", "DUQUE",
        "GENIO", "GUIAS", "JUIZA", "LADRA", "LIDER", "MAJOR", "MONGE", "NINJA",
        "PADRE", "PAGEM", "POETA", "SABIO", "VIGIA"
    ],
    paises: [
        "BENIN", "CATAR", "CHILE", "CHINA", "CONGO", "EGITO", "GABAO", "GALES",
        "HAITI", "IEMEN", "INDIA", "JAPAO", "LIBIA", "MALTA", "NAURU", "NEPAL",
        "NIGER", "QATAR", "SAMOA", "SUDAO", "SUICA", "SIRIA", "TONGA", "TUNIS"
    ],
    adjetivos: [
        "ACIDO", "AMADO", "AMPLO", "ARDUO", "ATROZ", "AUDAZ", "AZEDO", "BAIXO",
        "BELOS", "BENTO", "BRAVO", "BREVE", "BRUTO", "CALMO", "CAPAZ", "CAROS",
        "CASTO", "CEGOS", "CERTO", "CHEIO", "CLARO", "COXOS", "CRUEL", "CURTO",
        "DOIDO", "DOCES", "DUROS", "EBRIO", "EPICO", "EXATO", "FACIL", "FALSO",
        "FATAL", "FELIZ", "FEROZ", "FIRME", "FOFOS", "FORTE", "FRACO", "FRIOS",
        "GERAL", "GORDO", "GRATO", "GRAVE", "HABIL", "JOVEM", "JUSTO", "LEAIS",
        "LENTO", "LEVES", "LINDO", "LIVRE", "LONGO", "LOUCO", "MAGRO", "MAIOR",
        "MANSO", "MEDIO", "MENOR", "MISTO", "MOCOS", "MORNO", "MUDOS", "NOBRE",
        "NOVOS", "OTIMO", "POBRE", "PODRE", "PRETO", "PUROS", "RAROS", "RASOS",
        "REAIS", "RETOS", "RICOS", "ROXOS", "RUDES", "SABIO", "SACRO", "SADIO",
        "SAGAZ", "SANTO", "SECOS", "SERIO", "SOLTO", "SUAVE", "SUJOS", "SURDO",
        "TENUE", "TORTO", "TOTAL", "UTEIS", "VAGOS", "VAZIO", "VELHO", "VELOZ",
        "VERDE", "VIVOS", "VORAZ"
    ],
    verbos: [
        "ABRIR", "ACHAR", "ANDAR", "ARDER", "ASSAR", "BATER", "BEBER", "CAIDO",
        "CALAR", "CASAR", "CEDER", "CHEGA", "COMER", "CORRE", "COZER", "CRIAR",
        "CURAR", "DIZER", "DORMI", "ESTAR", "FALAR", "FAZER", "FEDER", "FERIR",
        "FICAR", "FUGIR", "FUMAR", "GELAR", "GERAR", "GIRAR", "GOZAR", "HAVER",
        "JOGAR", "JURAR", "LAVAR", "LEVAR", "LIGAR", "LUTAR", "MATAR", "MEDIR",
        "METER", "MOVER", "MUDAR", "NADAR", "NASCE", "NEGAR", "NOTAR", "ODIAR",
        "OLHAR", "OUVIR", "PAGAR", "PARAR", "PEDIR", "PEGAR", "PESAR", "PODER",
        "PULAR", "PUXAR", "RALAR", "REGER", "REZAR", "ROLAR", "SABER", "SAIDA",
        "SARAR", "SEREM", "SOMAR", "SUBIR", "SUMIR", "TERIA", "TOCAR", "TOMAR",
        "UNIDO", "VALER", "VARRE", "VIVER", "VOTAR"
    ]
};