import { useState, useCallback } from 'react'
import './Freelance.css'

function Freelance() {
  const [activeProject, setActiveProject] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const projects = [
    {
      id: 0,
      name: 'Atafísco',
      category: 'Web — Landing Page',
      stack: 'HTML5, CSS3, JS, Figma',
      technicalPaper: 'Front-end — design da interface + desenvolvimento',
      architecture: 'Multi-página estática — HTML/CSS/JS puro, sem framework, com separação de páginas por seção.',
      problem: 'O cliente (empresa de contabilidade) tinha um site desatualizado visualmente e precisava de algo mais moderno, minimalista e alinhado com a identidade de uma consultoria séria — sem perder a facilidade de navegação pra quem busca contato rápido.',
      technicalDecision: 'Prototipagem completa no Figma antes de qualquer linha de código, garantindo que decisões visuais (hierarquia, espaçamento, paleta) fossem validadas com o cliente antes da implementação — evita retrabalho de CSS depois. Escolha por HTML/CSS/JS puro (sem framework) por ser uma landing institucional simples, onde a sobrecarga de um framework não se justificava.',
      image: '/assets/atafisco-39ea17.png',
      type: 'LandingPage',
      role: 'Front-end',
      roleType: 'frontend',
      url: 'https://atafisco.com.br',
    },
    {
      id: 1,
      name: 'VemaPlastic',
      category: 'Web — Landing Page',
      stack: 'HTML5, CSS3, JS, Figma',
      technicalPaper: 'Front-end — Desenvolvimento',
      architecture: 'Landing page responsiva com foco em conversão e apresentação de produtos.',
      problem: 'Empresa de embalagens plásticos precisava de uma presença digital moderna para showcase de produtos industriais.',
      technicalDecision: 'Design minimalista com foco em imagens de alta qualidade e navegação intuitiva.',
      image: '/assets/VemaPlastic.png',
      type: 'LandingPage',
      role: 'Front-end',
      roleType: 'frontend',
      url: 'https://vemaplastic.com.br',
    },
    {
      id: 2,
      name: 'GentilVoa',
      category: 'Web — Dashboard',
      stack: 'React, Node.js, MongoDB',
      technicalPaper: 'Full-stack — desenvolvimento completo',
      architecture: 'Aplicação web com dashboard administrativo e autenticação.',
      problem: 'Cliente necessitava de sistema para gestão de contratos e controle administrativo.',
      technicalDecision: 'Stack moderna com React para interface e Node.js para backend escalável.',
      image: '/assets/GentilVOa.png',
      type: 'DashBoard',
      role: 'Full-stack',
      roleType: 'fullstack',
      url: 'https://www.linkedin.com/feed/update/urn:li:activity:7441698720448012289/',
    },
    {
      id: 3,
      name: 'CO&SO',
      category: 'Web — Landing Page',
      stack: 'HTML5, CSS3, JS, Figma',
      technicalPaper: 'Front-end — design da interface + desenvolvimento',
      architecture: 'Landing page institucional com seções de serviços e contato.',
      problem: 'Empresa de consultoria precisava de site profissional para apresentação de serviços.',
      technicalDecision: 'Design corporativo clean com foco em conversão e credibilidade.',
      image: '/assets/coeso.png',
      type: 'LandingPage',
      role: 'Front-end',
      roleType: 'frontend',
      url: 'https://coeso.adm.br/',
    },
  ]

  const navigateTo = useCallback((index) => {
    if (isTransitioning || index === activeProject) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveProject(index)
      setIsTransitioning(false)
    }, 220)
  }, [isTransitioning, activeProject])

  const currentProject = projects[activeProject]
  const otherProjects = projects.filter((_, index) => index !== activeProject).slice(0, 3)

  return (
    <div className="freelance-page">

      {/* Header Section */}
      <div className="freelance-header">
        <div className="header-left">
          <a
            className="project-button"
            href={currentProject.url}
            target="_blank"
            rel="noreferrer"
            title="Visitar site"
          >
            <span>{currentProject.name}.com.br</span>
            <svg width="8.49" height="8.49" viewBox="0 0 8.49 8.49" fill="none">
              <path d="M1.06066 7.42929L7.42929 1.06066M7.42929 1.06066H1.06066M7.42929 1.06066V7.42929" stroke="black" strokeWidth="1.5"/>
            </svg>
          </a>
        </div>

        <div className="header-right">
          <h1 className={`project-title ${isTransitioning ? 'project-title--out' : 'project-title--in'}`}>
            {currentProject.name}
          </h1>
        </div>
      </div>

      <div className="divider"></div>

      {/* Main Content */}
      <div className="freelance-content">
        {/* Left — Info */}
        <div className={`content-left ${isTransitioning ? 'content--out' : 'content--in'}`}>

          <div className="info-row">
            <span className="info-label">Categoria</span>
            <span className="info-value">{currentProject.category}</span>
          </div>

          <div className="info-row">
            <span className="info-label">Stack</span>
            <span className="info-value">{currentProject.stack}</span>
          </div>

          <div className="info-row">
            <span className="info-label">Papel Técnico</span>
            <span className="info-value">{currentProject.technicalPaper}</span>
          </div>

          <div className="info-row">
            <span className="info-label">Função</span>
            <span className={`role-badge role-badge--${currentProject.roleType}`}>
              {currentProject.role}
            </span>
          </div>

          <div className="info-row info-row--block">
            <span className="info-label">Arquitetura</span>
            <span className="info-value">{currentProject.architecture}</span>
          </div>

          <div className="info-row info-row--block">
            <span className="info-label">Problema</span>
            <span className="info-value">{currentProject.problem}</span>
          </div>

          <div className="info-row info-row--block">
            <span className="info-label">Decisão técnica</span>
            <span className="info-value">{currentProject.technicalDecision}</span>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="divider-vertical"></div>

        {/* Right — Image */}
        <div className={`content-right ${isTransitioning ? 'content--out' : 'content--in'}`}>
          <div className="main-image-container">
            <img src={currentProject.image} alt={currentProject.name} className="main-image" />
            <div className="image-overlay">
              <a
                href={currentProject.url}
                target="_blank"
                rel="noreferrer"
                className="overlay-link"
              >
                Ver Projeto ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* Other Projects Section */}
      <div className="other-projects">
        <h2 className="section-title">Outros Projetos</h2>
        <div className="title-underline"></div>

        <div className="projects-grid">
          {otherProjects.map((project) => (
            <div
              key={project.id}
              className={`project-card ${project.id === activeProject ? 'project-card--active' : ''}`}
              onClick={() => navigateTo(project.id)}
            >
              <div className="card-image">
                <img src={project.image} alt={project.name} />
              </div>
              <div className="card-info">
                <span className="card-name">{project.name}</span>
                <span className="card-type">{project.type}</span>
                <span className={`card-role-badge card-role-badge--${project.roleType}`}>
                  {project.role}
                </span>
              </div>
              <div className="card-active-bar"></div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Freelance
