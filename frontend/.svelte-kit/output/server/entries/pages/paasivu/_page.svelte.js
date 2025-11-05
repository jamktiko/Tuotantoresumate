import { y as ensure_array_like, z as attr_class, F as maybe_selected, v as pop, t as push } from "../../../chunks/index2.js";
import { a as attr, e as escape_html } from "../../../chunks/attributes.js";
function _page($$payload, $$props) {
  push();
  let title = "";
  let firstName = "";
  let lastName = "";
  let email = "";
  let phone = "";
  let postalCode = "";
  let city = "";
  let extraWork = "";
  let extraEducation = "";
  let template = "modern";
  let experiences = [
    {
      title: "",
      company: "",
      city: "",
      start: "",
      end: "",
      description: ""
    }
  ];
  let educations = [
    {
      degree: "",
      city: "",
      school: "",
      startDate: "",
      endDate: "",
      description: ""
    }
  ];
  let languages = [];
  let skills = [];
  const skillLevels = ["Aloittelija", "Keskitaso", "Edistynyt", "Ammattilainen"];
  const availableLanguages = [
    "Suomi",
    "Englanti",
    "Ruotsi",
    "Saksa",
    "Ranska",
    "Espanja",
    "Venäjä",
    "Kiina",
    "Japani"
  ];
  const levelLabels = [
    "Aloittelija",
    "Perustaso",
    "Keskitaso",
    "Hyvä",
    "Erinomainen",
    "Natiivi"
  ];
  const each_array = ensure_array_like(experiences);
  const each_array_1 = ensure_array_like(educations);
  const each_array_2 = ensure_array_like(languages);
  const each_array_5 = ensure_array_like(skills);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <header class="main-header"><h1>Resumate</h1> <div class="template-switcher"><button${attr_class("", void 0, { "selected": template === "default" })}>Default</button> <button${attr_class("", void 0, { "selected": template === "modern" })}>Modern</button> <button${attr_class("", void 0, { "selected": template === "minimalist" })}>Minimalist</button></div> <button class="fill-btn">Täyttö</button></header> <div class="page"><div class="left"><main><form class="cv-form"><div class="row top-row"><input${attr("value", title)} placeholder="Työnimike"/> <div class="photo-card"><div class="photo-preview">`);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <label class="upload-overlay" title="Vaihda profiilikuva"><input type="file" accept="image/*" aria-label="Lataa profiilikuva"/> <svg class="camera-small" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path><path d="M20 5h-3.2l-1.2-1.6a1 1 0 0 0-.8-.4H9.2c-.3 0-.6.1-.8.4L7.2 5H4a2 2 0 0 0-2 2v12h20V7a2 2 0 0 0-2-2z"></path></svg></label></div></div></div> <div class="row"><input${attr("value", firstName)} placeholder="Etunimi"/> <input${attr("value", lastName)} placeholder="Sukunimi"/></div> <div class="row"><input${attr("value", email)} type="email" placeholder="Sähköposti"/> <input${attr("value", phone)} type="tel" placeholder="Puhelinnumero"/></div> <div class="row"><input${attr("value", postalCode)} placeholder="Postinumero"/> <input${attr("value", city)} placeholder="Kaupunki"/></div> <div class="extra-toggle" role="button" tabindex="0">`);
  {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`▶ Näytä lisätiedot`);
  }
  $$payload.out.push(`<!--]--></div> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <div class="extra-toggle" role="button" tabindex="0">`);
  {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`▶
            Ammattiyhteenveto`);
  }
  $$payload.out.push(`<!--]--></div> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <hr class="section-divider"/> <div class="section"><h2>Työkokemus</h2> <!--[-->`);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let exp = each_array[i];
    $$payload.out.push(`<div class="experience-card"><div class="experience-grid"><input type="text" placeholder="Työnimike"${attr("value", exp.title)}/> <input type="text" placeholder="Kaupunki"${attr("value", exp.city)}/> <input type="text" placeholder="Yrityksen nimi"${attr("value", exp.company)} class="company"/> <input type="date" placeholder="Aloituspäivämäärä"${attr("value", exp.startDate)} class="date"/> <input type="date" placeholder="Loppupäivämäärä"${attr("value", exp.endDate)} class="date"/> <textarea class="input full" placeholder="Kuvaus">`);
    const $$body_1 = escape_html(exp.description);
    if ($$body_1) {
      $$payload.out.push(`${$$body_1}`);
    }
    $$payload.out.push(`</textarea> <button type="button" class="remove full-width">Poista</button></div></div>`);
  }
  $$payload.out.push(`<!--]--> <button type="button" class="add">+ Lisää työkokemus</button></div> <hr class="section-divider"/> <div class="section"><h2>Koulutus</h2> <!--[-->`);
  for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
    let edu = each_array_1[i];
    $$payload.out.push(`<div class="education-card"><div class="education-grid"><input type="text" placeholder="Tutkinto"${attr("value", edu.degree)}/> <input type="text" placeholder="Kaupunki"${attr("value", edu.city)}/> <input type="text" placeholder="Oppilaitos"${attr("value", edu.school)} class="company"/> <input type="date" placeholder="Aloituspäivämäärä"${attr("value", edu.startDate)} class="date"/> <input type="date" placeholder="Valmistumispäivämäärä"${attr("value", edu.endDate)} class="date"/> <textarea class="input full" placeholder="Kuvaus">`);
    const $$body_2 = escape_html(edu.description);
    if ($$body_2) {
      $$payload.out.push(`${$$body_2}`);
    }
    $$payload.out.push(`</textarea> <button type="button" class="remove">Poista koulutus</button></div></div>`);
  }
  $$payload.out.push(`<!--]--> <button type="button" class="add">Lisää koulutus</button></div> <hr class="section-divider"/> <div id="languages-section"><h3>Kielitaidot</h3> <!--[-->`);
  for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
    let lang = each_array_2[i];
    const each_array_3 = ensure_array_like(availableLanguages);
    const each_array_4 = ensure_array_like([0, 1, 2, 3, 4, 5]);
    $$payload.out.push(`<div class="language-entry"><div class="custom-select-wrapper"><select class="custom-select">`);
    $$payload.select_value = lang.language;
    $$payload.out.push(`<option value=""${maybe_selected($$payload, "")}>Valitse kieli...</option><!--[-->`);
    for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
      let langOption = each_array_3[$$index_2];
      $$payload.out.push(`<option${attr("value", langOption)}${maybe_selected($$payload, langOption)}>${escape_html(langOption)}</option>`);
    }
    $$payload.out.push(`<!--]-->`);
    $$payload.select_value = void 0;
    $$payload.out.push(`</select></div> <div class="custom-select-wrapper"><select class="custom-select">`);
    $$payload.select_value = lang.level;
    $$payload.out.push(`<!--[-->`);
    for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
      let n = each_array_4[$$index_3];
      $$payload.out.push(`<option${attr("value", n)}${maybe_selected($$payload, n)}>${escape_html(levelLabels[n])}</option>`);
    }
    $$payload.out.push(`<!--]-->`);
    $$payload.select_value = void 0;
    $$payload.out.push(`</select></div> <button type="button" class="remove">✕</button></div>`);
  }
  $$payload.out.push(`<!--]--> <button type="button" class="add">Lisää kieli</button></div> <hr class="section-divider"/> <div class="section" id="skills-section"><h2>Taidot</h2> <!--[-->`);
  for (let i = 0, $$length = each_array_5.length; i < $$length; i++) {
    let skill = each_array_5[i];
    const each_array_6 = ensure_array_like(skillLevels);
    $$payload.out.push(`<div class="skill-entry"><div class="custom-select-wrapper"><input type="text" placeholder="Taidon nimi"${attr("value", skill.nimi)} class="skill-input"/></div> <div class="custom-select-wrapper"><input type="text" placeholder="Missä opittu"${attr("value", skill.opittu)} class="skill-input"/></div> <div class="custom-select-wrapper"><select class="custom-select">`);
    $$payload.select_value = skill.taso;
    $$payload.out.push(`<!--[-->`);
    for (let $$index_5 = 0, $$length2 = each_array_6.length; $$index_5 < $$length2; $$index_5++) {
      let level = each_array_6[$$index_5];
      $$payload.out.push(`<option${attr("value", level)}${maybe_selected($$payload, level)}>${escape_html(level)}</option>`);
    }
    $$payload.out.push(`<!--]-->`);
    $$payload.select_value = void 0;
    $$payload.out.push(`</select></div> <button type="button" class="remove">✕</button></div>`);
  }
  $$payload.out.push(`<!--]--> <button type="button" class="add">Lisää taito</button></div> <hr class="section-divider"/> <h2>Kerro lisää</h2> <section class="extra-section"><div class="extra-two"><div><label for="extraWork">Työhön liittyviä lisätietoja</label> <textarea id="extraWork" rows="4">`);
  const $$body_3 = escape_html(extraWork);
  if ($$body_3) {
    $$payload.out.push(`${$$body_3}`);
  }
  $$payload.out.push(`</textarea></div> <div><label for="extraEducation">Työn kannalta oleellisia opintoihin tai osaamiseen liittyviä
                lisätietoja</label> <textarea id="extraEducation" rows="4">`);
  const $$body_4 = escape_html(extraEducation);
  if ($$body_4) {
    $$payload.out.push(`${$$body_4}`);
  }
  $$payload.out.push(`</textarea></div></div></section> <button class="cv-button-fixed"${attr("title", "Luo CV")}>`);
  {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`<svg class="cv-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 20 20" fill="white"><path fill="white" d="M15 7h-3V1H8v6H5l5 5l5-5zm4.338 6.532c-.21-.224-1.611-1.723-2.011-2.114A1.503 1.503 0 0 0 16.285 11h-1.757l3.064 2.994h-3.544a.274.274 0 0 0-.24.133L12.992 16H7.008l-.816-1.873a.276.276 0 0 0-.24-.133H2.408L5.471 11H3.715c-.397 0-.776.159-1.042.418c-.4.392-1.801 1.891-2.011 2.114c-.489.521-.758.936-.63 1.449l.561 3.074c.128.514.691.936 1.252.936h16.312c.561 0 1.124-.422 1.252-.936l.561-3.074c.126-.513-.142-.928-.632-1.449z"></path></svg>`);
  }
  $$payload.out.push(`<!--]--></button></form></main></div> <div class="right">`);
  {
    $$payload.out.push("<!--[!-->");
    {
      $$payload.out.push("<!--[!-->");
      $$payload.out.push(`<p style="text-align:center; margin-top: 2rem; color: gray;">Valitse teema nähdäksesi esikatselun</p>`);
    }
    $$payload.out.push(`<!--]-->`);
  }
  $$payload.out.push(`<!--]--></div></div>`);
  pop();
}
export {
  _page as default
};
