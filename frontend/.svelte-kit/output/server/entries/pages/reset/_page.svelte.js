import { a as attr } from "../../../chunks/attributes.js";
function _page($$payload) {
  let sahkoposti = "";
  $$payload.out.push(`<div class="container"><div class="left-side"><h1>Unohtuiko salasana?</h1> <form class="space-y-4"><input type="email" placeholder="Sähköpostiosoite"${attr("value", sahkoposti)} class="w-full border rounded-full px-4 py-2"/> `);
  {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--> <button type="submit" class="w-full bg-teal-500 text-white py-2 rounded-full">Lähetä palautuslinkki</button></form> <p class="login-text">Muistitko salasanan? <a href="../" class="text-blue-600">Kirjaudu sisään</a></p></div> <div class="right-side"><img src="../src/lib/assets/forgot.svg" alt="Forgot password icon"/></div></div> <div class="background-shapes"><div class="circle"></div> <div class="triangle"></div></div>`);
}
export {
  _page as default
};
