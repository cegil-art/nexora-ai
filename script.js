"use strict";

const navButton = document.querySelector(".menu-button");
const primaryNav = document.querySelector(".primary-nav");

navButton?.addEventListener("click", () => {
  const isOpen = navButton.getAttribute("aria-expanded") === "true";
  navButton.setAttribute("aria-expanded", String(!isOpen));
  primaryNav.classList.toggle("open", !isOpen);
});

primaryNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navButton?.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("open");
  });
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    document.querySelectorAll(".solution-panel").forEach((panel) => {
      panel.classList.remove("active");
      panel.hidden = true;
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    const panel = document.getElementById(`panel-${tab.dataset.tab}`);
    panel.hidden = false;
    panel.classList.add("active");
  });
});

const workflows = {
  lead: {
    steps: [["01", "Receive lead"], ["02", "Score intent"], ["03", "Create CRM task"]],
    result: "Simulation complete: 1 lead enriched and routed to the priority queue."
  },
  support: {
    steps: [["01", "Classify request"], ["02", "Find knowledge"], ["03", "Draft response"]],
    result: "Simulation complete: 1 request categorized and a safe draft response prepared."
  },
  invoice: {
    steps: [["01", "Read document"], ["02", "Extract fields"], ["03", "Flag exceptions"]],
    result: "Simulation complete: 4 fields mapped and 1 exception ready for review."
  }
};

function renderWorkflowPreset(key) {
  const preset = workflows[key];
  const container = document.getElementById("presetSteps");
  container.replaceChildren();
  preset.steps.forEach(([number, label]) => {
    const step = document.createElement("div");
    step.className = "preset-step";
    const badge = document.createElement("span");
    badge.textContent = number;
    const text = document.createTextNode(label);
    step.append(badge, text);
    container.append(step);
  });
  document.getElementById("workflowResult").textContent = "Ready to simulate locally.";
}

document.getElementById("workflowPreset").addEventListener("change", (event) => {
  renderWorkflowPreset(event.target.value);
});

document.getElementById("runWorkflow").addEventListener("click", () => {
  const button = document.getElementById("runWorkflow");
  const result = document.getElementById("workflowResult");
  button.disabled = true;
  result.textContent = "Running local simulation…";
  window.setTimeout(() => {
    result.textContent = workflows[document.getElementById("workflowPreset").value].result;
    button.disabled = false;
  }, 650);
});
renderWorkflowPreset("lead");

const faq = {
  lead: "A lead workflow can collect the source, score fit, summarize intent, and create a prioritized CRM task.",
  support: "Support automation can classify a request, search approved knowledge, draft a grounded reply, and flag cases for review.",
  invoice: "Document automation can extract vendor details, totals, dates, and exceptions, while keeping uncertain values for human review.",
  default: "Nexora workflows combine triggers, model steps, tools, and approval points. This demo uses local, rule-based replies and does not send your text anywhere."
};

function chatbotReply(message) {
  const text = message.toLowerCase();
  if (text.includes("lead") || text.includes("sales")) return faq.lead;
  if (text.includes("support") || text.includes("customer")) return faq.support;
  if (text.includes("invoice") || text.includes("document")) return faq.invoice;
  return faq.default;
}

function addChatMessage(text, type) {
  const messages = document.getElementById("chatMessages");
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  messages.append(message);
  messages.scrollTop = messages.scrollHeight;
}

document.getElementById("chatForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;
  addChatMessage(text, "user");
  input.value = "";
  window.setTimeout(() => addChatMessage(chatbotReply(text), "bot"), 350);
});

document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById("chatInput").value = button.dataset.prompt;
    document.getElementById("chatInput").focus();
  });
});

function updateCalculator() {
  const tasks = Number(document.getElementById("tasksPerMonth").value);
  const minutes = Number(document.getElementById("minutesPerTask").value);
  const automationRate = 0.75;
  const hourlyCost = 50;
  const hoursSaved = tasks * minutes * automationRate / 60;
  const costSaved = hoursSaved * hourlyCost;
  document.getElementById("tasksOutput").textContent = tasks.toLocaleString();
  document.getElementById("minutesOutput").textContent = String(minutes);
  document.getElementById("hoursSaved").textContent = `${Math.round(hoursSaved).toLocaleString()} hrs`;
  document.getElementById("costSaved").textContent = `$${Math.round(costSaved).toLocaleString()}`;
}

document.getElementById("tasksPerMonth").addEventListener("input", updateCalculator);
document.getElementById("minutesPerTask").addEventListener("input", updateCalculator);
updateCalculator();

const agentScenarios = {
  product: {
    intent: "Product inquiry",
    workflow: "Product guidance",
    message: "Which studio light is better for a small product photography setup?",
    reply: "For a compact fictional Nexora studio, the Halo Mini is a good starting point: it has a smaller footprint and soft diffusion. The Halo Pro adds brighter output and color controls. This is a simulated recommendation, not a live inventory check."
  },
  order: {
    intent: "Order status",
    workflow: "Sample order lookup",
    message: "Can you check sample order NX-1042 for me?",
    reply: "Sample order NX-1042 is fictional and currently shown as out for delivery, with an estimated arrival window of tomorrow between 9:00 AM and 12:00 PM. This status is demo data only—no real carrier or order system was queried."
  },
  booking: {
    intent: "Booking request",
    workflow: "Availability preview",
    message: "I'd like to request a 30-minute workflow review.",
    reply: "A 30-minute workflow review could be requested for Tuesday at 10:00 AM. This is only a local preview: no calendar slot was reserved and no real booking request was sent."
  }
};

let agentTimers = [];

function setTimelineState(state) {
  document.querySelectorAll(".timeline-step").forEach((step) => {
    step.classList.remove("active", "completed");
    const order = ["analyzing", "workflow", "response", "completed"];
    const currentIndex = order.indexOf(state);
    const stepIndex = order.indexOf(step.dataset.step);
    if (stepIndex < currentIndex) step.classList.add("completed");
    if (stepIndex === currentIndex) step.classList.add("active");
  });
}

function addAgentMessage(text, type) {
  const messages = document.getElementById("agentMessages");
  const message = document.createElement("div");
  message.className = `agent-message ${type}`;
  message.textContent = text;
  messages.append(message);
  messages.scrollTop = messages.scrollHeight;
}

function detectAgentScenario(message) {
  const text = message.toLowerCase();
  if (/human|agent|escalat|person|refund|cancel order|charged/i.test(text)) {
    return {
      intent: "Human escalation",
      workflow: "Human handoff",
      reply: "I can prepare a simulated handoff summary for a support specialist. Because this is a demo, no ticket, message, or real escalation was created."
    };
  }
  if (/order|delivery|track|shipment|nx-/i.test(text)) return {
    intent: "Order status",
    workflow: "Sample order lookup",
    reply: "For the fictional order NX-1042, the demo status is out for delivery. No real order system was accessed."
  };
  if (/book|schedule|meeting|review|appointment/i.test(text)) return {
    intent: "Booking request",
    workflow: "Availability preview",
    reply: "A sample workflow review could be requested for Tuesday at 10:00 AM. This demonstration did not reserve a calendar slot or contact anyone."
  };
  if (/product|light|camera|compare|recommend|equipment/i.test(text)) return {
    intent: "Product inquiry",
    workflow: "Product guidance",
    reply: "For a small fictional studio setup, Halo Mini is the compact choice and Halo Pro offers more brightness and controls. This is simulated guidance, not a live inventory lookup."
  };
  return {
    intent: "General support",
    workflow: "General response",
    reply: "I can help with a product question, a fictional order status, a booking request, or a simulated escalation. Try one of the examples above."
  };
}

function runAgentTurn(message, scenarioKey) {
  agentTimers.forEach((timer) => window.clearTimeout(timer));
  agentTimers = [];
  const scenario = scenarioKey ? agentScenarios[scenarioKey] : detectAgentScenario(message);

  addAgentMessage(message, "user");
  document.getElementById("agentInput").value = "";
  document.getElementById("agentIntent").textContent = "Analyzing…";
  document.getElementById("agentWorkflow").textContent = "Determining";
  document.getElementById("agentAction").innerHTML = "<span></span>Analyzing request";
  setTimelineState("analyzing");

  agentTimers.push(window.setTimeout(() => {
    document.getElementById("agentIntent").textContent = scenario.intent;
    document.getElementById("agentAction").innerHTML = "<span></span>Selecting workflow";
    setTimelineState("workflow");
  }, 500));

  agentTimers.push(window.setTimeout(() => {
    document.getElementById("agentWorkflow").textContent = scenario.workflow;
    document.getElementById("agentAction").innerHTML = "<span></span>Preparing response";
    setTimelineState("response");
  }, 1000));

  agentTimers.push(window.setTimeout(() => {
    addAgentMessage(scenario.reply, "bot");
    document.getElementById("agentAction").innerHTML = "<span></span>Response completed locally";
    setTimelineState("completed");
  }, 1550));
}

document.querySelectorAll("[data-agent-scenario]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-agent-scenario]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    runAgentTurn(agentScenarios[button.dataset.agentScenario].message, button.dataset.agentScenario);
  });
});

document.getElementById("agentForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.getElementById("agentInput");
  const message = input.value.trim();
  if (!message) return;
  runAgentTurn(message);
});

document.getElementById("resetAgent").addEventListener("click", () => {
  agentTimers.forEach((timer) => window.clearTimeout(timer));
  agentTimers = [];
  document.querySelectorAll("[data-agent-scenario]").forEach((item) => item.classList.remove("active"));
  document.querySelectorAll(".timeline-step").forEach((step) => step.classList.remove("active", "completed"));
  document.getElementById("agentMessages").replaceChildren();
  addAgentMessage("Demo reset. Choose an example or type a customer question to begin again.", "bot");
  document.getElementById("agentIntent").textContent = "Waiting";
  document.getElementById("agentWorkflow").textContent = "Standby";
  document.getElementById("agentAction").innerHTML = "<span></span>Awaiting input";
  document.getElementById("agentInput").value = "";
});

document.getElementById("year").textContent = String(new Date().getFullYear());
