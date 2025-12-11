<script>
  import './+page.css';

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

  import { goto } from '$app/navigation';
  import { cvData } from '$lib/stores/cvStore';
  import { throttle, updatePreview } from '$lib/utils/cvHelpers';

  import { onMount } from 'svelte';

  let previewFrame;

  // Update preview throttled when CV data changes
  const throttledPreview = throttle(() => updatePreview(previewFrame), 350);
  $: $cvData, previewFrame && throttledPreview();

  /* ---------------------------------------------------
        DARK MODE → SYNC INTO PREVIEW IFRAME
  --------------------------------------------------- */

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

  // When iframe loads, sync theme
  function onPreviewLoad() {
    syncPreviewTheme();
  }

  // Run browser-only code after mount (avoids SSR crash)
  onMount(() => {
    // Observe changes to <html class="dark">
    const observer = new MutationObserver(syncPreviewTheme);
    observer.observe(document.documentElement, { attributes: true });
  });
</script>

<Header />

<div class="page">
  <div class="left">
    <main>
      <form class="cv-form" on:submit|preventDefault>
        <div class="top-row"></div>
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
