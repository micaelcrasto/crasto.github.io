import { useState } from "react";

const modules = [
  { id: "diagnostico", n: "01", label: "Diagnóstico de Marca", icon: "◎", status: "complete", desc: "Posicionamento atual, gaps de percepção e análise de mercado." },
  { id: "planejamento", n: "02", label: "Planejamento Estratégico", icon: "◈", status: "complete", desc: "Funil, linhas editoriais, identidade e tático dos 120 dias." },
  { id: "roteiros", n: "03", label: "Roteiros e Modelos", icon: "▤", status: "active", desc: "Biblioteca editorial. 8 roteiros base + formatos produzidos." },
  { id: "mentorias", n: "04", label: "Histórico de Mentorias", icon: "◐", status: "active", desc: "Registro de cada sessão — decisões e raciocínio documentados." },
  { id: "metricas", n: "05", label: "Métricas e Análises", icon: "↗", status: "active", desc: "Dados de desempenho ao longo dos 120 dias." },
  { id: "protocolo", n: "06", label: "Protocolo de Decisão", icon: "⊞", status: "pending", desc: "O que fazer quando os resultados variarem." },
  { id: "assessment", n: "07", label: "Assessment do Time", icon: "◷", status: "complete", desc: "Diagnóstico de maturidade e trilha percorrida." },
  { id: "criterios", n: "08", label: "Critérios Editoriais", icon: "≡", status: "active", desc: "Tom, formato e frequência por linha de conteúdo." },
  { id: "conselheiros", n: "09", label: "Notas dos Conselheiros", icon: "◉", status: "pending", desc: "Insights das sessões com Rony, Renata e Erich." },
];

const recentItems = [
  { module: "Roteiros e Modelos", action: "Roteiro adicionado", item: "Linha Pessoal — Modelo B: Crença contrária", time: "há 2 horas", tag: "roteiro" },
  { module: "Histórico de Mentorias", action: "Sessão registrada", item: "Mentoria com o time — Semana 6", time: "há 1 dia", tag: "mentoria" },
  { module: "Métricas e Análises", action: "Relatório atualizado", item: "Desempenho quinzenal — Mês 2", time: "há 2 dias", tag: "metrica" },
  { module: "Diagnóstico de Marca", action: "Documento finalizado", item: "Análise de posicionamento — versão final", time: "há 5 dias", tag: "doc" },
];

const nextSteps = [
  { text: "Mentoria com o empresário — Semana 7", date: "Quinta, 20 Mar", type: "mentoria" },
  { text: "Revisão quinzenal de métricas", date: "Sex, 21 Mar", type: "tarefa" },
  { text: "Novo roteiro — Linha Educacional Mod. A", date: "Até 25 Mar", type: "roteiro" },
];

const statusColor = { complete: "#4A4A3F", active: "#F2EFE9", pending: "#2A2A27" };
const statusDot = { complete: "#5A5A4A", active: "#F2EFE9", pending: "#2A2A27" };

const tagColor = {
  roteiro: { bg: "rgba(242,239,233,0.06)", text: "#8A8A80" },
  mentoria: { bg: "rgba(242,239,233,0.04)", text: "#6A6A60" },
  metrica:  { bg: "rgba(242,239,233,0.04)", text: "#6A6A60" },
  doc:      { bg: "rgba(242,239,233,0.04)", text: "#6A6A60" },
};

const programWeek = 7;
const programMonth = 2;
const totalWeeks = 16;
const progress = Math.round((programWeek / totalWeeks) * 100);

export default function App() {
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState(null);

  const activeModule = modules.find(m => m.id === active);

  return (
    <div style={{
      display: "flex", height: "100vh", background: "#0D0D0B",
      fontFamily: "'Calibri', 'Segoe UI', sans-serif",
      color: "#F2EFE9", overflow: "hidden",
    }}>

      {/* ── SIDEBAR ──────────────────────────────────────────────── */}
      <aside style={{
        width: 240, flexShrink: 0,
        background: "#0D0D0B",
        borderRight: "1px solid #1E1E1A",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* Brand */}
        <div style={{
          padding: "20px 20px 16px",
          borderBottom: "1px solid #1A1A17",
        }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: "#3A3A37", fontWeight: 600, marginBottom: 6, textTransform: "uppercase" }}>
            Programa Influentes
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#D8D6D0", letterSpacing: 0.2 }}>
            Base Operacional
          </div>
        </div>

        {/* Company info */}
        <div style={{
          padding: "14px 20px",
          borderBottom: "1px solid #1A1A17",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 4,
            background: "#1E1E1A", border: "1px solid #2A2A27",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: "#8A8A80", flexShrink: 0,
            fontFamily: "Georgia, serif",
          }}>
            G4
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#C0BEB8", lineHeight: 1.2 }}>G4 Educação</div>
            <div style={{ fontSize: 9, color: "#3A3A37", marginTop: 2, letterSpacing: 0.3 }}>Tallis Gomes</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ padding: "14px 20px", borderBottom: "1px solid #1A1A17" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 9, color: "#3A3A37", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Progresso</span>
            <span style={{ fontSize: 9, color: "#5A5A55" }}>Sem {programWeek} · Mês {programMonth}</span>
          </div>
          <div style={{ height: 2, background: "#1A1A17", borderRadius: 1, overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "#F2EFE9", borderRadius: 1, transition: "width 0.5s ease" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
            <span style={{ fontSize: 8, color: "#2A2A27" }}>Início</span>
            <span style={{ fontSize: 8, color: "#4A4A46" }}>{progress}%</span>
            <span style={{ fontSize: 8, color: "#2A2A27" }}>Encerramento</span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
          {/* Home */}
          <button onClick={() => setActive("home")} style={{
            width: "100%", padding: "9px 20px",
            background: active === "home" ? "#161613" : "transparent",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 10,
            textAlign: "left", transition: "background 0.15s",
            borderLeft: active === "home" ? "2px solid #F2EFE9" : "2px solid transparent",
          }}>
            <span style={{ fontSize: 12, color: active === "home" ? "#F2EFE9" : "#3A3A37" }}>⌂</span>
            <span style={{ fontSize: 11, color: active === "home" ? "#D8D6D0" : "#4A4A46", fontWeight: active === "home" ? 600 : 400 }}>Visão Geral</span>
          </button>

          {/* Divider */}
          <div style={{ padding: "10px 20px 6px" }}>
            <span style={{ fontSize: 8, letterSpacing: 2.5, color: "#2A2A27", textTransform: "uppercase", fontWeight: 600 }}>Módulos</span>
          </div>

          {modules.map(m => (
            <button key={m.id} onClick={() => setActive(m.id)}
              onMouseEnter={() => setHovered(m.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                width: "100%", padding: "8px 20px",
                background: active === m.id ? "#161613" : hovered === m.id ? "#111110" : "transparent",
                border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 10,
                textAlign: "left", transition: "background 0.1s",
                borderLeft: active === m.id ? "2px solid #F2EFE9" : "2px solid transparent",
              }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                background: active === m.id || m.status === "active" ? "#F2EFE9" :
                  m.status === "complete" ? "#4A4A3F" : "#252522",
                border: m.status === "pending" ? "1px solid #252522" : "none",
                transition: "background 0.15s",
              }} />
              <span style={{ fontSize: 10.5, color: active === m.id ? "#D8D6D0" : m.status === "pending" ? "#2A2A27" : "#5A5A55", fontWeight: active === m.id ? 600 : 400, lineHeight: 1.3 }}>
                {m.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: "12px 20px", borderTop: "1px solid #1A1A17" }}>
          <div style={{ fontSize: 9, color: "#252522", letterSpacing: 0.3 }}>blank.com.br · Turma I · 2025</div>
        </div>
      </aside>

      {/* ── MAIN ─────────────────────────────────────────────────── */}
      <main style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>

        {/* Topbar */}
        <div style={{
          height: 48, flexShrink: 0,
          borderBottom: "1px solid #1A1A17",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 32px",
          background: "#0D0D0B",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 9, color: "#2A2A27", letterSpacing: 1 }}>BASE OPERACIONAL</span>
            <span style={{ fontSize: 9, color: "#1E1E1A" }}>·</span>
            <span style={{ fontSize: 9, color: "#3A3A37" }}>
              {active === "home" ? "Visão Geral" : activeModule?.label}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4A6A4A" }} />
              <span style={{ fontSize: 9, color: "#3A3A37" }}>Semana 7 · Mês 2 em andamento</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "36px 40px", overflow: "auto" }}>

          {active === "home" ? (
            <HomeView />
          ) : (
            <ModuleView module={activeModule} />
          )}

        </div>
      </main>
    </div>
  );
}

function HomeView() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 9, letterSpacing: 3, color: "#3A3A37", textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>
          G4 Educação · Tallis Gomes
        </div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 32, fontWeight: 400, color: "#F2EFE9", lineHeight: 1.05, marginBottom: 10, letterSpacing: -0.5 }}>
          Base Operacional
        </div>
        <p style={{ fontSize: 12, color: "#4A4A46", lineHeight: 1.7, maxWidth: 520 }}>
          Tudo que foi construído nos 120 dias do programa — registrado, organizado e acessível para o time operar com autonomia.
        </p>
      </div>

      {/* Month progress */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, marginBottom: 40 }}>
        {[
          { m: "01", name: "Diagnóstico", status: "done" },
          { m: "02", name: "Execução Assistida", status: "current" },
          { m: "03", name: "Ajuste Tático", status: "upcoming" },
          { m: "04", name: "Handover", status: "upcoming" },
        ].map((item, i) => (
          <div key={i} style={{
            padding: "16px 18px",
            background: item.status === "current" ? "#161613" : "#0F0F0D",
            border: `1px solid ${item.status === "current" ? "#2A2A27" : "#1A1A17"}`,
            borderTop: `2px solid ${item.status === "done" ? "#3A3A35" : item.status === "current" ? "#F2EFE9" : "#1A1A17"}`,
          }}>
            <div style={{ fontSize: 8, letterSpacing: 2.5, color: "#2A2A27", marginBottom: 6, textTransform: "uppercase", fontWeight: 600 }}>
              Mês {item.m}
            </div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 13, italic: true, color: item.status === "current" ? "#F2EFE9" : item.status === "done" ? "#5A5A55" : "#2A2A27", fontStyle: "italic" }}>
              {item.name}
            </div>
            <div style={{ marginTop: 8, fontSize: 9, color: item.status === "done" ? "#3A3A37" : item.status === "current" ? "#6A6A60" : "#1E1E1A" }}>
              {item.status === "done" ? "Concluído" : item.status === "current" ? "Em andamento" : "Aguardando"}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
        {/* Modules grid */}
        <div>
          <div style={{ fontSize: 9, letterSpacing: 3, color: "#3A3A37", textTransform: "uppercase", fontWeight: 600, marginBottom: 14 }}>
            Módulos do Programa
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
            {modules.map(m => (
              <div key={m.id} style={{
                padding: "18px 18px 16px",
                background: "#0F0F0D",
                border: "1px solid #1A1A17",
                borderTop: `2px solid ${m.status === "complete" ? "#3A3A35" : m.status === "active" ? "#F2EFE9" : "#1A1A17"}`,
                cursor: "pointer",
                transition: "background 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#141412"}
                onMouseLeave={e => e.currentTarget.style.background = "#0F0F0D"}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <span style={{ fontFamily: "Georgia, serif", fontSize: 11, color: "#2A2A27", fontStyle: "italic" }}>{m.n}</span>
                  <span style={{
                    fontSize: 8, padding: "2px 7px", letterSpacing: 1,
                    background: m.status === "active" ? "rgba(242,239,233,0.07)" : "transparent",
                    color: m.status === "complete" ? "#3A3A37" : m.status === "active" ? "#8A8A80" : "#252522",
                    border: `1px solid ${m.status === "active" ? "#252522" : "#1A1A17"}`,
                  }}>
                    {m.status === "complete" ? "✓" : m.status === "active" ? "ativo" : "—"}
                  </span>
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: m.status === "pending" ? "#2A2A27" : "#B0AEA8", lineHeight: 1.3, marginBottom: 8 }}>
                  {m.label}
                </div>
                <div style={{ fontSize: 9.5, color: "#3A3A37", lineHeight: 1.5 }}>
                  {m.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Próximas ações */}
          <div>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#3A3A37", textTransform: "uppercase", fontWeight: 600, marginBottom: 14 }}>
              Próximas ações
            </div>
            <div style={{ background: "#0F0F0D", border: "1px solid #1A1A17" }}>
              {nextSteps.map((step, i) => (
                <div key={i} style={{
                  padding: "14px 16px",
                  borderBottom: i < nextSteps.length - 1 ? "1px solid #141412" : "none",
                }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: "50%", flexShrink: 0, marginTop: 4,
                      background: step.type === "mentoria" ? "#F2EFE9" : step.type === "roteiro" ? "#5A5A55" : "#3A3A35",
                    }} />
                    <div>
                      <div style={{ fontSize: 11, color: "#9A9A94", lineHeight: 1.4, marginBottom: 4 }}>{step.text}</div>
                      <div style={{ fontSize: 9, color: "#2A2A27" }}>{step.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Atividade recente */}
          <div>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#3A3A37", textTransform: "uppercase", fontWeight: 600, marginBottom: 14 }}>
              Atividade recente
            </div>
            <div style={{ background: "#0F0F0D", border: "1px solid #1A1A17" }}>
              {recentItems.map((item, i) => (
                <div key={i} style={{
                  padding: "12px 16px",
                  borderBottom: i < recentItems.length - 1 ? "1px solid #141412" : "none",
                }}>
                  <div style={{ fontSize: 8, color: "#2A2A27", letterSpacing: 0.5, marginBottom: 4 }}>{item.module}</div>
                  <div style={{ fontSize: 10.5, color: "#8A8A80", lineHeight: 1.4, marginBottom: 4 }}>{item.item}</div>
                  <div style={{ fontSize: 8.5, color: "#252522" }}>{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModuleView({ module }) {
  if (!module) return null;

  const contentMap = {
    diagnostico: {
      sections: [
        { title: "Posicionamento atual", body: "Fundador posicionado como referência em crescimento de startups de educação no Brasil. Autoridade construída via cases de G4, com narrativa centrada em ROI mensurável de treinamentos executivos.", tag: "análise" },
        { title: "Gaps de percepção identificados", body: "Mercado ainda não associa Tallis Gomes à categoria de liderança executiva além do G4. Oportunidade de ampliar autoridade para empresários de outros setores — potencial de MQL fora do nicho atual.", tag: "gap" },
        { title: "Análise de mercado", body: "Crescimento de 340% em buscas por 'educação executiva' no último ano. Concorrência direta com posicionamento difuso. Janela aberta para ocupar a posição de referência em resultado mensurável.", tag: "mercado" },
      ]
    },
    roteiros: {
      sections: [
        { title: "Linha Pessoal — Modelo A", body: "A decisão de fechar o G4 para o público geral e focar em C-level foi a mais difícil. 40% da receita em risco. O que aprendi sobre o preço de proteger o posicionamento.", tag: "roteiro" },
        { title: "Linha Pessoal — Modelo B", body: "O mercado acredita que educação executiva precisa de certificação internacional. Eu discordo completamente. O que realmente muda resultado de gestão em 90 dias.", tag: "roteiro" },
        { title: "Linha Educacional — Modelo A", body: "95% das empresas medem treinamento por satisfação do funcionário. Esse é o erro. Como medir aprendizado por resultado comercial — e por que isso muda o que você contrata.", tag: "roteiro" },
        { title: "Linha Educacional — Modelo B", body: "O G4 usa um framework de 3 fases para desenvolvimento de liderança que a maioria das empresas desconhece: Diagnóstico de Gap → Intervenção Focada → Medição de Transferência.", tag: "roteiro" },
      ]
    },
    metricas: {
      sections: [
        { title: "Semana 7 — Desempenho geral", body: "Alcance orgânico: 4,2M impressões (+18% vs quinzena anterior). Engajamento qualificado: 12.400 interações. Leads MQL atribuídos: 34 no período.", tag: "relatório" },
        { title: "Melhor formato do ciclo", body: "Carrossel educacional 'Como medir treinamento por resultado' — 280K alcance, 4.100 salvamentos. Maior taxa de salvamento da história do perfil. Recomendação: replicar estrutura narrativa.", tag: "insight" },
        { title: "Linha com menor performance", body: "Conteúdo institucional caiu 22% vs média. Hipótese: foco excessivo em conquistas da empresa sem angulação no fundador. Ajuste editorial na Semana 8: recentrar na perspectiva pessoal.", tag: "ajuste" },
      ]
    },
    mentorias: {
      sections: [
        { title: "Sessão #6 — Time · 12 Mar", body: "Revisão dos 8 roteiros base. Decisão: linha educacional virou prioridade vs. pessoal. Razão: taxa de salvamento 3× maior. Próximas 2 semanas: 3 educacionais para cada 1 pessoal.", tag: "decisão" },
        { title: "Sessão #5 — Empresário · 5 Mar", body: "Alinhamento sobre tom. Tallis prefere abordagem mais direta e menos emocional. Ajustado: eliminar storytelling de superação, substituir por dados e mecanismos. Tom: analítico-executivo.", tag: "alinhamento" },
        { title: "Sessão #4 — Time · 26 Fev", body: "Análise do primeiro ciclo publicado. 3 de 8 formatos com performance acima do esperado. Roteiro 'Framework de 3 fases' destacou-se: 180K alcance orgânico na primeira semana.", tag: "análise" },
      ]
    },
  };

  const content = contentMap[module.id];

  return (
    <div>
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <span style={{ fontFamily: "Georgia, serif", fontSize: 13, color: "#3A3A37", fontStyle: "italic" }}>{module.n}</span>
          <div style={{ height: 1, width: 24, background: "#1E1E1A" }} />
          <span style={{ fontSize: 9, letterSpacing: 2.5, color: "#3A3A37", textTransform: "uppercase", fontWeight: 600 }}>
            {module.status === "active" ? "ativo" : module.status === "complete" ? "concluído" : "aguardando"}
          </span>
        </div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 28, color: "#F2EFE9", lineHeight: 1.1, marginBottom: 10, letterSpacing: -0.3 }}>
          {module.label}
        </div>
        <p style={{ fontSize: 12, color: "#4A4A46", lineHeight: 1.7, maxWidth: 480 }}>{module.desc}</p>
      </div>

      {content ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {content.sections.map((sec, i) => (
            <div key={i} style={{
              padding: "24px 28px",
              background: "#0F0F0D",
              border: "1px solid #1A1A17",
              borderLeft: "2px solid #2A2A27",
              cursor: "pointer",
              transition: "border-left-color 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderLeftColor = "#F2EFE9"}
              onMouseLeave={e => e.currentTarget.style.borderLeftColor = "#2A2A27"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#C0BEB8" }}>{sec.title}</div>
                <span style={{ fontSize: 8, letterSpacing: 1, color: "#3A3A37", padding: "2px 8px", border: "1px solid #1A1A17", marginLeft: 16, whiteSpace: "nowrap" }}>
                  {sec.tag}
                </span>
              </div>
              <div style={{ fontSize: 11.5, color: "#5A5A55", lineHeight: 1.7 }}>{sec.body}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          padding: "48px 32px",
          background: "#0F0F0D",
          border: "1px solid #1A1A17",
          textAlign: "center",
        }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 14, color: "#2A2A27", fontStyle: "italic", marginBottom: 8 }}>
            {module.status === "pending" ? "Este módulo ainda não foi iniciado." : "Conteúdo em construção."}
          </div>
          <div style={{ fontSize: 10, color: "#1E1E1A" }}>Será atualizado ao longo do programa.</div>
        </div>
      )}
    </div>
  );
}
