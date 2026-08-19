/* =========================================
   Publicações — dados padrão (seed)
   =========================================

   Persistência (ordem de leitura):
   1. localStorage do navegador (edições via dashboard)
   2. public/data/posts.json (dados publicados no deploy)
   3. Este arquivo (seed/fallback)

   Para publicar alterações para todos os visitantes:
   exporte JSON no dashboard e substitua public/data/posts.json antes do deploy.
*/

/** Perfil exibido no cabeçalho de cada post e no modal. */
export const author = {
  name: 'Marco Aurélio Oliveira',
  headline: 'Desenvolvedor Fullstack | React · Node.js · JavaScript | Automação de Processos',
  avatar: '/assets/publicacoes/avatar-marco.png',
  profileUrl: 'https://www.linkedin.com/in/marco-aurelio-lima-de-oliveira/',
}

/** Publicações do LinkedIn — dados de exemplo, substitua pelos reais. */
export const posts = [
  {
    id: 'copilot-training',
    title:
      'Na última sexta-feira participei de um treinamento sobre GitHub Copilot com a AzureBrasil.',
    description:
      'Na última sexta-feira tive a oportunidade de participar de um treinamento sobre GitHub Copilot, ministrado pela AzureBrasil, e foi uma experiência muito enriquecedora.\nFoi muito bom ver na prática como a IA já está sendo utilizada no dia a dia de times de engenharia, acelerando revisões, testes e documentação sem tirar o protagonismo de quem escreve o código.',
    images: [
      '/assets/publicacoes/post-copilot-1.png',
      '/assets/publicacoes/post-copilot-2.png',
      '/assets/publicacoes/post-copilot-3.png',
    ],
    linkedinUrl: 'https://www.linkedin.com/in/marco-aurelio-lima-de-oliveira/recent-activity/all/',
    featured: false,
  },
  {
    id: 'vemaplastic',
    title: 'Não é quinta-feira, mas deu aquela vontade de relembrar um projeto incrível...',
    description:
      'Não é quinta-feira, mas deu aquela vontade de relembrar um projeto incrível: a landing page da VemaPlastic.\nUm site institucional pensado para destacar a produção de embalagens plásticas para diversas áreas, com foco em clareza, performance e uma navegação simples para quem busca contato rápido.',
    images: ['/assets/VemaPlastic.png'],
    coverImage: '/assets/VemaPlastic.png',
    linkedinUrl: 'https://www.linkedin.com/in/marco-aurelio-lima-de-oliveira/recent-activity/all/',
    featured: true,
  },
  {
    id: 'gentil-voa',
    title: 'Projetei e desenvolvi um dashboard para a empresa Gentil Voa, focado em gestão...',
    description:
      'Projetei e desenvolvi um dashboard para a empresa Gentil Voa, focado em gestão de operações e controle administrativo.\nO objetivo era transformar planilhas espalhadas em um painel único, com indicadores que a equipe consegue ler em segundos.',
    images: ['/assets/GentilVOa.png'],
    coverImage: '/assets/GentilVOa.png',
    linkedinUrl: 'https://www.linkedin.com/in/marco-aurelio-lima-de-oliveira/recent-activity/all/',
    featured: true,
  },
  {
    id: 'coeso',
    title: 'Desenvolver esse projeto foi um grande marco na minha trajetória como...',
    description:
      'Desenvolver esse projeto foi um grande marco na minha trajetória como desenvolvedor.\nA CO&SO precisava de um site institucional que comunicasse negócio e tecnologia na mesma página, e o resultado ficou exatamente com a identidade que a empresa buscava.',
    images: ['/assets/coeso.png'],
    coverImage: '/assets/coeso.png',
    linkedinUrl: 'https://www.linkedin.com/in/marco-aurelio-lima-de-oliveira/recent-activity/all/',
    featured: true,
  },
  {
    id: 'motaro',
    title: 'Lançamos a MOTARO, uma ferramenta de gestão para mecânicos.',
    description:
      'Lançamos a MOTARO, uma ferramenta de gestão para mecânicos, focada em gerir e fidelizar cada vez mais os clientes de cada oficina.\nO produto nasceu de conversas com donos de oficina e hoje já organiza ordens de serviço, histórico de veículos e retorno de clientes em um só lugar.',
    images: ['/assets/publicacoes/post-copilot-2.png'],
    linkedinUrl: 'https://www.linkedin.com/in/marco-aurelio-lima-de-oliveira/recent-activity/all/',
    featured: false,
  },
]

export const defaultFeaturedPosts = posts.filter((post) => post.featured)
