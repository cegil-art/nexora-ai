# Nexora AI

A responsive, zero-dependency static website concept for an AI workflow platform.

## Local preview

From the project directory, run either:

- `python -m http.server 8000`
- `npx serve .`

Then open `http://localhost:8000`.

## Included demos

- **Chat assistant:** deterministic local replies based on keywords. Messages are not sent to a server.
- **AI Agent Experience:** a premium customer-service simulator for product guidance, fictional order status, booking previews, and simulated human escalation.
- **Agent activity panel:** displays detected intent, selected workflow, current action, and a four-stage execution timeline.
- **Agent examples and reset:** three scenario buttons start local demonstrations; Reset demo clears the visible simulation state.
- **Workflow presets:** selectable lead, support, and invoice simulations with a short local progress state.
- **Impact calculator:** adjusts estimated monthly hours and cost saved.
- **Navigation and tabs:** mobile navigation and solution tabs are keyboard-accessible controls.
- **FAQ:** native HTML disclosure elements.

## Limitations

This is a frontend concept, not a production AI service. It does not authenticate users, call a model provider, persist data, submit leads, or perform real document processing or workflow automation. Any result shown is illustrative and should not be interpreted as a business guarantee.

The AI Agent Experience is a rule-based browser simulation. Sample orders such as `NX-1042`, booking availability, inventory suggestions, and escalation summaries are fictional demo data. The simulator does not create tickets, reserve calendars, contact people, query carriers, or send messages. User input remains in browser memory and is cleared by reloading or resetting the demo.

Connecting the experience to a real AI agent would require an approved model provider, secure server-side integrations, authenticated access to order and scheduling systems, privacy controls, conversation retention policies, guardrails, and human escalation routing. Those production services are intentionally absent from this static GitHub Pages experience.

## GitHub Pages deployment

1. Push this project to a GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose your default branch and the root (`/`) folder.
5. Save and wait for the Pages deployment.

Because the site uses relative asset paths and has no build step, it can also be deployed from a Pages `docs/` folder by moving the files into that directory.
