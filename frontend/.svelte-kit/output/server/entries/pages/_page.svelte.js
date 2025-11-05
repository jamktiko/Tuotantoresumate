import { a as attr } from "../../chunks/attributes.js";
import { v as pop, t as push } from "../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "../../chunks/state.svelte.js";
function _page($$payload, $$props) {
  push();
  let sahkoposti = "";
  let salasana = "";
  $$payload.out.push(`<div class="container"><div class="left-side"><h1>Kirjaudu sisään</h1> <form class="space-y-4"><input type="email" placeholder="Sähköpostiosoite"${attr("value", sahkoposti)} class="w-full border rounded-full px-4 py-2"/> <input type="password" placeholder="Salasana"${attr("value", salasana)} class="w-full border rounded-full px-4 py-2"/> <div class="pwdreset"><div class="flex justify-end"><a href="./reset" class="text-sm text-blue-600 underline">Unohtuiko salasana?</a></div></div> <button type="button" class="w-full bg-teal-500 text-white py-2 rounded-full">Kirjaudu</button> <p class="login-text">Ei vielä tiliä? <a href="./rekisteroidy" class="text-blue-600">Luo tili</a></p></form></div> <div class="right-side"><img src="../src/lib/assets/kirjautumiskuva.jpg" alt="Signup illustration"/></div></div> <div class="background-shapes"><div class="circle"></div> <div class="triangle"></div></div>`);
  pop();
}
export {
  _page as default
};
