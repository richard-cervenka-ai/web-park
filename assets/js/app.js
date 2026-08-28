
// Web Components demo: reusable native custom element
if(!customElements.get('park-tech-label')){customElements.define('park-tech-label',class extends HTMLElement{connectedCallback(){this.innerHTML=`<span class="tech-badge">${this.getAttribute('name')||'PARK COMPONENT'}</span>`}})}
