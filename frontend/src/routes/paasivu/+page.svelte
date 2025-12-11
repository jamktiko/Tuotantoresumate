<script>
  import './+page.css';

  // Tuodaan sivun komponentit
  import Header from '$lib/components/Header.svelte';
  import PersonalInfo from '$lib/components/PersonalInfo.svelte';
  import ExtraInfo from '$lib/components/ExtraInfo.svelte';
  import SummarySection from '$lib/components/SummarySection.svelte';
  import ExperienceSection from '$lib/components/ExperienceSection.svelte';
  import EducationSection from '$lib/components/EducationSection.svelte';
  import LanguageSection from '$lib/components/LanguageSection.svelte';
  import SkillsSection from '$lib/components/SkillsSection.svelte';
  import ExtraSection from '$lib/components/ExtraSection.svelte';
  import ReferencesSection from '$lib/components/ReferencesSection.svelte';

  // Navigointifunktio
  import { goto } from '$app/navigation';

  // CV-tiedot globaalista storesta
  import { cvData } from '$lib/stores/cvStore';

  // Throttle ja esikatselun päivitys -utilsit
  import { throttle, updatePreview } from '$lib/utils/cvHelpers';

  // Ajetaan koodi vasta komponentin mountin jälkeen
  import { onMount } from 'svelte';

  let previewFrame; // Iframe-referenssi

  // Throttlattu esikatselun päivitysfunktio
  const throttledPreview = throttle(() => updatePreview(previewFrame), 350);

  // Päivitä esikatselu aina kun cvData muuttuu
  $: $cvData, previewFrame && throttledPreview();

  /* ---------------------------------------------------
        DARK MODE → TEEMAN SYNKRONOINTI IFRAMEEN
  --------------------------------------------------- */

  // Synkronoi dark/light -tila pääsivusta iframeen
  function syncPreviewTheme() {
    if (!previewFrame?.contentDocument) return;

    const appHtml = document.documentElement;
    const iframeHtml = previewFrame.contentDocument.documentElement;

    if (appHtml.classList.contains('dark')) {
      iframeHtml.classList.add('dark');
    } else {
      iframeHtml.classList.remove('dark');
    }
  }

  // Ajetaan kun iframe lataa sisältönsä
  function onPreviewLoad() {
    syncPreviewTheme();
  }

  // Ajetaan vain selaimessa — ei SSR:ssä
  onMount(() => {
    // Tarkkailee <html> attribuuttien muutoksia (dark-mode)
    const observer = new MutationObserver(syncPreviewTheme);
    observer.observe(document.documentElement, { attributes: true });
  });
</script>

<!-- Header-komponentti -->
<Header />

<div class="page">
  <div class="left">
    <main>
      <!-- CV:n syöttölomake -->
      <form class="cv-form" on:submit|preventDefault>
        <div class="top-row"></div>

        <!-- CV:n eri informaatio-osat -->
        <PersonalInfo />
        <ExtraInfo />
        <SummarySection />
        <hr class="section-divider" />
        <ExperienceSection />
        <hr class="section-divider" />
        <EducationSection />
        <hr class="section-divider" />
        <LanguageSection />
        <hr class="section-divider" />
        <SkillsSection />
        <hr class="section-divider" />
        <ReferencesSection />
        <hr class="section-divider" />
        <ExtraSection />
      </form>
    </main>
  </div>

  <div class="right">
    <iframe
      bind:this={previewFrame}
      on:load={onPreviewLoad}
      class="preview-frame"
      title="CV Preview"
    ></iframe>
  </div>
</div>
