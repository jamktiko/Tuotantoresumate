import { a as attr } from "../../../chunks/attributes.js";
function _page($$payload) {
  let name = "";
  let email = "";
  let password = "";
  let agreed = false;
  $$payload.out.push(`<div class="container"><div class="left-side"><h1>Aloita nyt</h1> <form><input type="text" placeholder="Nimi"${attr("value", name)}/> <input type="email" placeholder="Sähköposti"${attr("value", email)}/> <input type="password" placeholder="Salasana"${attr("value", password)}/> <label class="checkbox-label"><input type="checkbox"${attr("checked", agreed, true)}/> <span>Hyväksyn <a href="/terms">käyttöehdot</a></span></label> <button type="submit">Rekisteröidy</button></form> <p class="login-text">Onko sinulla jo tili? <a href="../">Kirjaudu sisään</a></p></div> <div class="right-side"><img src="/kirjautumiskuva.jpg" alt="Signup illustration"/></div></div> <div class="background-shapes"><div class="circle"></div> <div class="triangle"></div></div>`);
}
export {
  _page as default
};
