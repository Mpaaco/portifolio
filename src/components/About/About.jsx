import { useState } from 'react'
import './About.css'

function About() {
  const [activeTab, setActiveTab] = useState('capacidades')
  const [isAnimating, setIsAnimating] = useState(false)

  const handleTabChange = (tabId) => {
    if (tabId === activeTab || isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setActiveTab(tabId)
      setIsAnimating(false)
    }, 200) // tempo da animação de fade
  }

  const capabilities = [
    'Engenharia de Software', 'Automação de Processos', 'Dados & SQL', 
    'Ferramentas Internas', 'Soluções com IA', 'Análise de Requisitos'
  ];

  const engineering = [
    'JavaScript', 'Node.js', 'SQL', 'React', 'PostgreSQL', 'MongoDB', 
    'Redis', 'AdonisJS', 'Express', 'Fastify', 'Prisma', 'BullMQ', 
    'Zod', 'Vitest', 'Docker', 'Git'
  ];

  const dataAutomation = [
    'Análise com SQL', 'Transformação de Dados', 'Google Sheets', 
    'Google Apps Script', 'Dashboards', 'Monitoramento de Processos', 
    'Integração de Dados', 'KPIs Operacionais', 'Detecção Baseada em Regras', 
    'Automação de Workflows'
  ];

  return (
    <div className="about-page">
      <div className="about-content">
        
        {/* Topo fixo: Bio */}
        <div className="about-top">
          <div className="about-bio">
            <h2 className="bio-title">Bio</h2>
            <p className="bio-text">
              Engenheiro de Software com foco em desenvolvimento Full Stack, automação e dados. Atualmente trabalho na Shopee criando soluções internas, dashboards, ferramentas e automações com apoio de Agentes IA, sempre buscando reduzir esforço manual, melhorar processos e gerar impacto mensurável para a operação.
            </p>
          </div>
        </div>

        {/* Área Interativa */}
        <div className="about-interactive">
          {/* Menu de Abas */}
          <nav className="about-tabs-nav" aria-label="Navegação de habilidades">
            <button 
              className={`tab-btn ${activeTab === 'capacidades' ? 'tab-btn--active' : ''}`}
              onClick={() => handleTabChange('capacidades')}
            >
              Capacidades
            </button>
            <button 
              className={`tab-btn ${activeTab === 'engenharia' ? 'tab-btn--active' : ''}`}
              onClick={() => handleTabChange('engenharia')}
            >
              Engenharia
            </button>
            <button 
              className={`tab-btn ${activeTab === 'dados' ? 'tab-btn--active' : ''}`}
              onClick={() => handleTabChange('dados')}
            >
              Dados & Automação
            </button>
            <button 
              className={`tab-btn ${activeTab === 'ia' ? 'tab-btn--active' : ''}`}
              onClick={() => handleTabChange('ia')}
            >
              Inteligência Artificial
            </button>
          </nav>

          {/* Conteúdo da Aba */}
          <div className="about-tab-content-wrapper">
            <div className={`about-tab-content ${isAnimating ? 'tab-fade-out' : 'tab-fade-in'}`}>
              
              {activeTab === 'capacidades' && (
                <div className="pills-container">
                  {capabilities.map(skill => (
                    <span key={skill} className="pill">{skill}</span>
                  ))}
                </div>
              )}

              {activeTab === 'engenharia' && (
                <div className="pills-container">
                  {engineering.map(skill => (
                    <span key={skill} className="pill pill--engineering">{skill}</span>
                  ))}
                </div>
              )}

              {activeTab === 'dados' && (
                <div className="pills-container">
                  {dataAutomation.map(skill => (
                    <span key={skill} className="pill pill--data">{skill}</span>
                  ))}
                </div>
              )}

              {activeTab === 'ia' && (
                <p className="tab-text">
                  Atuo com IA aplicada à engenharia de software e automação, criando fluxos e arquiteturas com agentes e multiagentes em plataformas como n8n. Também trabalho com integrações via APIs e MCP, conectando modelos, ferramentas e fontes de dados para automatizar processos, executar validações, apoiar análises e estruturar soluções mais inteligentes e escaláveis.
                </p>
              )}
              
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default About
