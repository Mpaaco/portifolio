import { useState, useRef } from 'react'
import './About.css'

/* =========================================
   Dados — Resumo Visual
   ========================================= */

const SUMMARY_BLOCKS = [
  {
    title: 'Full Stack',
    description: 'Aplicações, interfaces, APIs, bancos de dados e integrações construídas de ponta a ponta.',
  },
  {
    title: 'Automação',
    description: 'Ferramentas e workflows que reduzem tarefas manuais e melhoram a confiabilidade dos processos.',
  },
  {
    title: 'IA Aplicada',
    description: 'Agentes, integrações e validações desenvolvidos para apoiar análises e automatizar decisões.',
  },
]

/* =========================================
   Dados — Abas
   ========================================= */

const TABS = [
  { id: 'atuacao', label: 'Atuação' },
  { id: 'engenharia', label: 'Engenharia' },
  { id: 'dados', label: 'Dados & Automação' },
  { id: 'ia', label: 'IA Aplicada' },
]

const ATUACAO_SKILLS = [
  'Desenvolvimento Full Stack',
  'Engenharia de Software',
  'Ferramentas internas',
  'Integração de sistemas',
  'Automação de processos',
  'Soluções orientadas a dados',
  'Análise de requisitos',
  'IA aplicada a produtos e operações',
]

const ENGENHARIA_DESCRIPTION =
  'Desenvolvo aplicações Full Stack com separação clara de responsabilidades entre interface, API, regras de negócio e persistência de dados. Trabalho com integrações, validação de entradas, processamento assíncrono, testes e organização de código pensando em manutenção e evolução do sistema.'

const ENGENHARIA_GROUPS = [
  {
    category: 'Frontend',
    items: ['React', 'JavaScript'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Fastify', 'AdonisJS'],
  },
  {
    category: 'Dados',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'],
  },
  {
    category: 'Qualidade e infraestrutura',
    items: ['Zod', 'Vitest', 'BullMQ', 'Docker', 'Git'],
  },
]

const DADOS_DESCRIPTION =
  'Transformo necessidades operacionais em consultas, dashboards, integrações e automações. Utilizo dados para identificar gargalos, acompanhar indicadores e desenvolver ferramentas que diminuem atividades repetitivas e aumentam a consistência das análises.'

const DADOS_SKILLS = [
  'Análise e transformação de dados com SQL',
  'Construção de dashboards e indicadores',
  'Automação de workflows',
  'Integração entre fontes de dados',
  'Monitoramento de processos',
  'Desenvolvimento de ferramentas operacionais',
  'Detecção e validação baseadas em critérios estruturados',
  'Google Apps Script',
  'Google Sheets',
]

const IA_DESCRIPTION =
  'Aplico IA à engenharia de software e à automação de processos. Desenvolvo fluxos com agentes, integrações via APIs e MCP e mecanismos de validação para conectar modelos, ferramentas e fontes de dados. Meu foco está em utilizar IA de forma controlada, mensurável e integrada a sistemas reais.'

const IA_SKILLS = [
  'Agentes e sistemas multiagentes',
  'Orquestração de workflows com n8n',
  'Integração de modelos via APIs e MCP',
  'Avaliação e comparação de respostas',
  'Validação de resultados',
  'IA aplicada à automação',
  'Assistência ao desenvolvimento de software',
]

/* =========================================
   Componente
   ========================================= */

function About() {
  const [activeTab, setActiveTab] = useState('atuacao')
  const [isAnimating, setIsAnimating] = useState(false)
  const tabRefs = useRef({})

  const handleTabChange = (tabId) => {
    if (tabId === activeTab || isAnimating) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setActiveTab(tabId)
      return
    }

    setIsAnimating(true)
    setTimeout(() => {
      setActiveTab(tabId)
      setIsAnimating(false)
    }, 200)
  }

  const handleKeyDown = (e, currentIndex) => {
    const count = TABS.length
    let nextIndex = currentIndex

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      nextIndex = (currentIndex + 1) % count
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      nextIndex = (currentIndex - 1 + count) % count
    } else if (e.key === 'Home') {
      e.preventDefault()
      nextIndex = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      nextIndex = count - 1
    } else {
      return
    }

    const nextTab = TABS[nextIndex]
    handleTabChange(nextTab.id)
    tabRefs.current[nextTab.id]?.focus()
  }

  return (
    <div className="about-page">
      <div className="about-content">

        {/* Bio */}
        <div className="about-top">
          <div className="about-bio">
            <h2 className="bio-title">Bio</h2>
            <p className="bio-text">
              Engenheiro de Software com foco em desenvolvimento Full Stack, automação e dados.
              Atualmente na Shopee, desenvolvo soluções internas, dashboards, ferramentas e
              automações com apoio de IA, buscando reduzir esforço manual, melhorar processos
              e gerar impacto mensurável na operação.
            </p>
          </div>
        </div>

        {/* Resumo visual — sempre visível */}
        <div className="about-summary" aria-label="Áreas de atuação">
          {SUMMARY_BLOCKS.map((block) => (
            <div key={block.title} className="summary-block">
              <span className="summary-block__title">{block.title}</span>
              <p className="summary-block__description">{block.description}</p>
            </div>
          ))}
        </div>

        {/* Área interativa — Abas */}
        <div className="about-interactive">
          <div
            className="about-tabs-nav"
            role="tablist"
            aria-label="Seções de competências"
          >
            {TABS.map((tab, index) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                ref={(el) => { tabRefs.current[tab.id] = el }}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                className={`tab-btn${activeTab === tab.id ? ' tab-btn--active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Painéis */}
          <div className="about-tab-content-wrapper">
            <div
              className={`about-tab-content${isAnimating ? ' tab-fade-out' : ' tab-fade-in'}`}
            >

              {/* Aba: Atuação */}
              <div
                id="panel-atuacao"
                role="tabpanel"
                aria-labelledby="tab-atuacao"
                hidden={activeTab !== 'atuacao'}
              >
                <div className="pills-container">
                  {ATUACAO_SKILLS.map((skill) => (
                    <span key={skill} className="pill">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Aba: Engenharia */}
              <div
                id="panel-engenharia"
                role="tabpanel"
                aria-labelledby="tab-engenharia"
                hidden={activeTab !== 'engenharia'}
              >
                <p className="tab-description">{ENGENHARIA_DESCRIPTION}</p>
                <div className="tech-groups">
                  {ENGENHARIA_GROUPS.map((group) => (
                    <div key={group.category} className="tech-group">
                      <span className="tech-group__label">{group.category}</span>
                      <div className="pills-container pills-container--compact">
                        {group.items.map((item) => (
                          <span key={item} className="pill">{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aba: Dados & Automação */}
              <div
                id="panel-dados"
                role="tabpanel"
                aria-labelledby="tab-dados"
                hidden={activeTab !== 'dados'}
              >
                <p className="tab-description">{DADOS_DESCRIPTION}</p>
                <div className="pills-container">
                  {DADOS_SKILLS.map((skill) => (
                    <span key={skill} className="pill">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Aba: IA Aplicada */}
              <div
                id="panel-ia"
                role="tabpanel"
                aria-labelledby="tab-ia"
                hidden={activeTab !== 'ia'}
              >
                <p className="tab-description">{IA_DESCRIPTION}</p>
                <div className="pills-container">
                  {IA_SKILLS.map((skill) => (
                    <span key={skill} className="pill">{skill}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default About
